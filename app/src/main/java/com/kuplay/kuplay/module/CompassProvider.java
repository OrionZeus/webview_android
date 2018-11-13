package com.kuplay.kuplay.module;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.util.Logger;

import static android.content.Context.SENSOR_SERVICE;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/29
 */
public class CompassProvider extends BaseJSModule implements SensorEventListener {
    private static final String TAG = "CompassProvider";
    private SensorManager mSensorManager;
private boolean flag;
    public void startCompass(int callbackId) {
        flag = false;
        super.callbackId = callbackId;
        // 传感器管理器
        mSensorManager = (SensorManager) ctx.getSystemService(SENSOR_SERVICE);
        // 注册传感器(Sensor.TYPE_ORIENTATION(方向传感器);SENSOR_DELAY_FASTEST(0毫秒延迟);
        // SENSOR_DELAY_GAME(20,000毫秒延迟)、SENSOR_DELAY_UI(60,000毫秒延迟))
        if (null == mSensorManager) {
            JSCallback.callJS(getActivity(), callbackId, JSCallback.FAIL, "");
            return;
        }
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION), SensorManager.SENSOR_DELAY_FASTEST);
        JSCallback.callJS(getActivity(), callbackId, JSCallback.SUCCESS, "");
    }

    public void stopCompass(int callbackId) {
        if (null != mSensorManager) {
            mSensorManager.unregisterListener(this);
            JSCallback.callJS(getActivity(), callbackId, JSCallback.SUCCESS, "");
        } else {
            JSCallback.callJS(getActivity(), callbackId, JSCallback.FAIL, "根本停不下来！");
        }
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_ORIENTATION) {
            float degree = event.values[0];
            Logger.error(TAG, String.valueOf(degree));
            // TODO: 向js层调用一个window的全局函数，抛事件给高层
            if (!flag) {
                // JSCallback.callJS(callbackId, JSCallback.CALLBACK, "");
                flag = true;
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }
}
