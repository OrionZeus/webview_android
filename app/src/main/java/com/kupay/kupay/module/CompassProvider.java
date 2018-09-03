package com.kupay.kupay.module;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import com.kupay.kupay.base.BaseJSModule;
import com.kupay.kupay.util.Logger;

import static android.content.Context.SENSOR_SERVICE;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/29
 */
public class CompassProvider extends BaseJSModule implements SensorEventListener {
    private static final String TAG = "CompassProvider";
    private SensorManager mSensorManager;

    public void startCompass(int callbackId) {
        super.callbackId = callbackId;
        // 传感器管理器
        mSensorManager = (SensorManager) ctx.getSystemService(SENSOR_SERVICE);
        // 注册传感器(Sensor.TYPE_ORIENTATION(方向传感器);SENSOR_DELAY_FASTEST(0毫秒延迟);
        // SENSOR_DELAY_GAME(20,000毫秒延迟)、SENSOR_DELAY_UI(60,000毫秒延迟))
        if (null == mSensorManager) return;
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION), SensorManager.SENSOR_DELAY_FASTEST);
    }

    public void stopCompass() {
        mSensorManager.unregisterListener(this);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_ORIENTATION) {
            float degree = event.values[0];
            Logger.error(TAG, String.valueOf(degree));
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }
}
