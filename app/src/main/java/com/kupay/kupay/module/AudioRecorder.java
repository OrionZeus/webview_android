package com.kupay.kupay.module;

import android.Manifest;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.github.dfqin.grantor.PermissionListener;
import com.github.dfqin.grantor.PermissionsUtil;
import com.kupay.kupay.base.BaseJSModule;
import com.kupay.kupay.common.js.JSCallback;
import com.lqr.audio.AudioPlayManager;
import com.lqr.audio.AudioRecordManager;
import com.lqr.audio.IAudioPlayListener;

import java.io.File;

/**
 * Created by iqosjay@gmail.com on 2018/11/12
 * {@link AudioRecorder} is a manager of the audio,
 * there are 7 methods int this classes,they are:
 * {@link #setAudioRecordParams(int, String, int)}      Set the basic param of the audio recorder.
 * {@link #startRecord(int)}                            Start record.
 * {@link #prepareToCancelRecord(int)}                  Prepare cancel record that you are recording.
 * {@link #continueRecord(int)}                         Continue record.
 * {@link #stopRecord(int)}                             Stop the record.
 * {@link #destroyRecord(int)}                          Destroy of the record.
 * {@link #playRecord(int, String)}                     Play the record.
 * {@link #stopPlay(int)}                               Stop play the record.
 */
public class AudioRecorder extends BaseJSModule {

    /**
     * Set the basic parameters of the AudioRecord
     *
     * @param callbackId  TS's callback Id.
     * @param path        The path you want save the audio to,when this param is null or empty,
     *                    the {@link AudioRecorder}will use default path.
     * @param maxDuration The max duration of the audio,and its default value is 60 seconds.
     */
    public void setAudioRecordParams(int callbackId, String path, int maxDuration) {
        AudioRecordManager.getInstance(ctx).setAudioSavePath(path);
        AudioRecordManager.getInstance(ctx).setMaxVoiceDuration(maxDuration);
        JSCallback.callJS(callbackId, JSCallback.SUCCESS, "Set Params Success!");
    }

    /**
     * Start record.
     *
     * @param callbackId TS's callback Id.
     */
    public void startRecord(final int callbackId) {
        PermissionsUtil.requestPermission(ctx,
                new PermissionListener() {
                    @Override
                    public void permissionGranted(@NonNull String[] permission) {
                        AudioRecordManager.getInstance(ctx).startRecord();
                        JSCallback.callJS(callbackId, JSCallback.SUCCESS, "Start Record Success.");
                    }

                    @Override
                    public void permissionDenied(@NonNull String[] permission) {
                        JSCallback.callJS(callbackId, JSCallback.FAIL, "Permission Denied.");
                    }
                },
                Manifest.permission.RECORD_AUDIO, Manifest.permission.WRITE_EXTERNAL_STORAGE);
    }

    /**
     * When you call this method,it means the audio of this time is prepare to cancel,
     * it just like your finger slide up when the audio record is working in WeChat.
     *
     * @param callbackId TS's callback Id.
     */
    public void prepareToCancelRecord(int callbackId) {
        AudioRecordManager.getInstance(ctx).willCancelRecord();
    }

    /**
     * When you call this method,you should confirm you have been called the method{@link #prepareToCancelRecord(int)},
     * and this method would restart the audio recorder.In other way,it just like your finger have been slided
     * up(you want to cancel the audio of this time),but at next time, your finger slide down in WeChat.
     *
     * @param callbackId TS's callback Id.
     */
    public void continueRecord(int callbackId) {
        AudioRecordManager.getInstance(ctx).continueRecord();
    }

    /**
     * Stop the recording.
     *
     * @param callbackId TS's callback Id.
     */
    public void stopRecord(int callbackId) {
        AudioRecordManager.getInstance(ctx).stopRecord();
    }

    /**
     * Destroy the record.
     *
     * @param callbackId TS's callback Id.
     */
    public void destroyRecord(int callbackId) {
        AudioRecordManager.getInstance(ctx).destroyRecord();
    }

    /**
     * Play the audio that you have been recorded.
     *
     * @param callbackId TS's callback Id.
     * @param path       The audio's path that you want you play.
     *                   If this param is null or empty,it will use default path.
     */
    public void playRecord(final int callbackId, final String path) {
        PermissionsUtil.requestPermission(ctx, new PermissionListener() {
            @Override
            public void permissionGranted(@NonNull String[] permission) {
                File file;
                if (TextUtils.isEmpty(path)) {
                    file = new File(ctx.getCacheDir().getAbsolutePath());
                } else {
                    file = new File(path);
                }
                if (!file.exists()) {
                    JSCallback.callJS(callbackId, JSCallback.FAIL, "The audio res file is not exists,please record first.");
                    return;
                }
                Uri uri = Uri.fromFile(file);
                AudioPlayManager.getInstance().startPlay(ctx, uri, new IAudioPlayListener() {
                    @Override
                    public void onStart(Uri var1) {
                        JSCallback.callJS(callbackId, JSCallback.SUCCESS, "Start Play Audio Record.");
                    }

                    @Override
                    public void onStop(Uri var1) {
                        JSCallback.callJS(callbackId, JSCallback.SUCCESS, "Stop Play Audio Record.");
                    }

                    @Override
                    public void onComplete(Uri var1) {
                        JSCallback.callJS(callbackId, JSCallback.SUCCESS, "Play Audio Record Complete.");
                    }
                });
            }

            @Override
            public void permissionDenied(@NonNull String[] permission) {
                JSCallback.callJS(callbackId, JSCallback.FAIL, "Permission Denied.");
            }
        }, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WAKE_LOCK);

    }

    /**
     * Stop play the audio.
     *
     * @param callbackId TS's callback Id.
     */
    public void stopPlay(int callbackId) {
        AudioPlayManager.getInstance().stopPlay();
    }
}
