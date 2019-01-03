package com.kuplay.kuplay.module

import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager

import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.util.Logger

import android.content.Context.SENSOR_SERVICE

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/29
 */
class CompassProvider : BaseJSModule(), SensorEventListener {
    private var mSensorManager: SensorManager? = null
    private var flag: Boolean = false


    fun startCompass(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        flag = false
        this.callBack = callBack
        //super.setCallbackId(callbackId)
        // 传感器管理器
        mSensorManager = ctx!!.getSystemService(SENSOR_SERVICE) as SensorManager
        // 注册传感器(Sensor.TYPE_ORIENTATION(方向传感器);SENSOR_DELAY_FASTEST(0毫秒延迟);
        // SENSOR_DELAY_GAME(20,000毫秒延迟)、SENSOR_DELAY_UI(60,000毫秒延迟))
        if (null == mSensorManager) {
            callBack(JSCallback.FAIL, arrayOf(""))
            //JSCallback.callJS(null, null, callbackId, JSCallback.getFAIL(), "")
            return
        }
        mSensorManager!!.registerListener(this, mSensorManager!!.getDefaultSensor(Sensor.TYPE_ORIENTATION), SensorManager.SENSOR_DELAY_FASTEST)
        callBack(JSCallback.SUCCESS, arrayOf(""))
        //JSCallback.callJS(null, null, callbackId, JSCallback.getSUCCESS(), "")
    }

    fun stopCompass(ccallBack:(callType: Int, prames: Array<Any>)->Unit) {
        if (null != mSensorManager) {
            mSensorManager!!.unregisterListener(this)
            callBack(JSCallback.SUCCESS, arrayOf(""))
            //JSCallback.callJS(null, null, callbackId, JSCallback.getSUCCESS(), "")
        } else {
            callBack(JSCallback.FAIL, arrayOf("根本停不下来！"))
            //JSCallback.callJS(null, null, callbackId, JSCallback.getFAIL(), "根本停不下来！")
        }
    }

    override fun onSensorChanged(event: SensorEvent) {
        if (event.sensor.type == Sensor.TYPE_ORIENTATION) {
            val degree = event.values[0]
            Logger.error(TAG, degree.toString())
            // TODO: 向js层调用一个window的全局函数，抛事件给高层
            if (!flag) {
                // JSCallback.callJS(callbackId, JSCallback.CALLBACK, "");
                flag = true
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {

    }

    companion object {
        private val TAG = "CompassProvider"
    }
}
