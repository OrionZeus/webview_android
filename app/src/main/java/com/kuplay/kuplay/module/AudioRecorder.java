package com.kuplay.kuplay.module;

import android.Manifest;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.support.annotation.NonNull;
import android.util.Base64;
import android.util.Log;

import com.github.dfqin.grantor.PermissionListener;
import com.github.dfqin.grantor.PermissionsUtil;
import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Timer;
import java.util.TimerTask;

public class AudioRecorder extends BaseJSModule {

    static {
        System.loadLibrary("native-lib");
    }

    // 音频源：音频输入-麦克风
    private final static int AUDIO_INPUT = MediaRecorder.AudioSource.MIC;
    // 采样频率: 8000, 22.05KHz、44.1KHz、48KHz
    private final static int AUDIO_SAMPLE_RATE = 8000;
    // 音频通道 单声道
    private final static int AUDIO_CHANNEL = AudioFormat.CHANNEL_IN_MONO;
    // 音频格式：PCM编码
    private final static int AUDIO_ENCODING = AudioFormat.ENCODING_PCM_16BIT;

    private int bufferSizeInBytes = 0;

    // 录音对象
    private boolean isRecording = false;
    private AudioRecord audioRecord;
    private ByteArrayOutputStream stream;

    // 定时器
    Timer timer;

    /**
     * 注意：录音不能太久，因为录音数据没有写文件
     * @param callbackId
     */
    public void start(final int callbackId) {
        if (stream != null) {
            JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.FAIL, "AudioRecord isnt stop!");
            return;
        }

        PermissionsUtil.requestPermission(ctx, new PermissionListener() {
            @Override
            public void permissionGranted(@NonNull String[] permission) {
                startImpl(callbackId);
            }

            @Override
            public void permissionDenied(@NonNull String[] permission) {
                JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "user denied permission");
            }
        }, new String[]{Manifest.permission.RECORD_AUDIO}, true, mTipInfo);
    }

    private void startImpl(final int callbackId) {
        try {
            bufferSizeInBytes = AudioRecord.getMinBufferSize(AUDIO_SAMPLE_RATE, AUDIO_CHANNEL, AUDIO_ENCODING);
            audioRecord = new AudioRecord(AUDIO_INPUT, AUDIO_SAMPLE_RATE, AUDIO_CHANNEL, AUDIO_ENCODING, bufferSizeInBytes);

            stream = new ByteArrayOutputStream();

            // 以防万一，设置3分钟的定时器，定时器到了如果高层还没有调用stop或drop，主动关闭录音器
            timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    drop(0);
                }
            }, 3 * 60 * 1000);

            audioRecord.startRecording();
            isRecording = true;

            // 开线程写数据
            new Thread(new Runnable() {
                @Override
                public void run() {
                    handleRecordData();
                }
            }).start();

            JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.SUCCESS);
        } catch (Exception e) {

            e.printStackTrace();

            if (stream != null) {
                stream = null;
            }

            if (timer != null) {
                timer.cancel();
                timer = null;
            }
            if (audioRecord != null) audioRecord = null;
            JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.FAIL, "start Audio Record failed");
        }
    }

    public void stop(int callbackId) {
        if (stream == null) {
            JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.FAIL, "AudioRecord isnt start!");
            return;
        }
        isRecording = false;

        timer.cancel();
        timer = null;

        synchronized (audioRecord) {
            audioRecord.stop();
            audioRecord.release();
            audioRecord = null;
        }

        byte[] data;
        synchronized (stream) {
            data = stream.toByteArray();
            stream = null;
        }

        // NOTE: 这里有个隐含的假设，录音的read读的short用的是小端。
        short[] pcm = new short[data.length / 2];
        ByteBuffer.wrap(data).order(ByteOrder.LITTLE_ENDIAN).asShortBuffer().get(pcm);
        pcmToMp3(pcm, callbackId);
    }

    public void drop(int callbackId) {
        if (stream == null) {
            JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.FAIL, "AudioRecord isnt start!");
            return;
        }

        isRecording = false;

        timer.cancel();
        timer = null;

        synchronized (audioRecord) {
            audioRecord.stop();
            audioRecord.release();
            audioRecord = null;
        }

        synchronized (stream) {
            stream = null;
        }

        JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.SUCCESS);
    }

    private void pcmToMp3(short[] pcm, int callbackId) {
        byte[] result = new byte[7200 + (int)(2 * pcm.length * 1.25)];

        initMp3();
        int size = lameMp3Encode(pcm, null, pcm.length, result);
        if (size <= 0) {
            JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.FAIL, "Mp3 encode failed");
            lameMp3Close();
            return;
        }

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        stream.write(result, 0, size);

        size = lameMp3Flush(result);
        if (size > 0) {
            stream.write(result, 0, size);
        }
        lameMp3Close();

        result = stream.toByteArray();
        String base64 = Base64.encodeToString(result, 0, result.length, Base64.NO_WRAP);
        JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.SUCCESS, base64);
    }

    private void handleRecordData() {
        byte[] data = new byte[bufferSizeInBytes];
        try {
            while (isRecording) {
                int read = 0;
                synchronized (audioRecord) {
                    if (audioRecord != null) {
                        read = audioRecord.read(data, 0, data.length);
                    }
                }

                if (read > 0) {
                    synchronized (stream) {
                        if (stream != null) {
                            stream.write(data, 0, read);
                        }
                    }
                }
            }
        } catch (Exception e) {
            Log.d("AudioRecorder", "handleRecordData failed");
            e.printStackTrace();
        }
    }

    private void initMp3() {
        int bitRate = 16;
        int channel = AUDIO_CHANNEL == AudioFormat.CHANNEL_IN_MONO ? 1 : 2;
        switch (AUDIO_ENCODING) {
            case AudioFormat.ENCODING_PCM_8BIT:
                bitRate = 8;
                break;
            case AudioFormat.ENCODING_PCM_16BIT:
                bitRate = 16;
                break;
            case AudioFormat.ENCODING_PCM_FLOAT:
                bitRate = 32;
                break;
        }

        // quality: 2高，5中，7低
        lameMp3Init(AUDIO_SAMPLE_RATE, channel, 0, bitRate, 7);
    }

    private native static void lameMp3Init(int inSampleRate, int outChannel, int outSampleRate, int outBitrate, int quality);

    private native static void lameMp3Close();

    private native static int lameMp3Encode(short[] buffer_l, short[] buffer_r, int samples, byte[] mp3buf);

    private native static int lameMp3Flush(byte[] mp3buf);
}
