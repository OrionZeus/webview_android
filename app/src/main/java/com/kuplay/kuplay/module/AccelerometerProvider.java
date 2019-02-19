package com.kuplay.kuplay.module;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.util.Logger;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/30
 */
public class AccelerometerProvider extends BaseJSModule {
    private static final String TAG = "AccelerometerProvider";
    private SensorManager mSensorManager;
    private SensorListener mSensorListener;

    public void startAccelerometer(int callbackId) {
        super.callbackId = callbackId;
        // 初始化传感器
        mSensorListener = new SensorListener();
        mSensorManager = (SensorManager) ctx.getSystemService(Context.SENSOR_SERVICE);
        if (mSensorManager != null) {
            Sensor defaultSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
            mSensorManager.registerListener(mSensorListener, defaultSensor, SensorManager.SENSOR_DELAY_UI);
            JSCallback.callJS(null, null, callbackId, JSCallback.SUCCESS, "");
        } else {
            JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "");
        }
    }

    public void stopAccelerometer(int callbackId) {
        if (null != mSensorManager) {
            mSensorManager.unregisterListener(mSensorListener);
            JSCallback.callJS(null, null, callbackId, JSCallback.SUCCESS, "");
        } else {
            JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "停止失败");
        }
    }

    class SensorListener implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {
            // 读取加速度传感器数值，values数组0,1,2分别对应x,y,z轴的加速度
            Logger.error(TAG, "onSensorChanged: " + event.values[0] + ", " + event.values[1] + ", " + event.values[2]);
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {
            Logger.error(TAG, "onAccuracyChanged");
        }

    }
}
