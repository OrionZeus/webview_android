package com.kuplay.kuplay.module

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager

import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.util.Logger

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/30
 */
class AccelerometerProvider : BaseJSModule() {
    private var mSensorManager: SensorManager? = null
    private var mSensorListener: SensorListener? = null

    fun startAccelerometer(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        this.callBack = callBack
        //super.callBack = callBack
        // 初始化传感器
        mSensorListener = SensorListener()
        mSensorManager = ctx!!.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        if (mSensorManager != null) {
            val defaultSensor = mSensorManager!!.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
            mSensorManager!!.registerListener(mSensorListener, defaultSensor, SensorManager.SENSOR_DELAY_UI)
            callBack(JSCallback.SUCCESS, arrayOf(""))
        } else {
            callBack(JSCallback.FAIL, arrayOf(""))
        }
    }

    fun stopAccelerometer(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        if (null != mSensorManager) {
            mSensorManager!!.unregisterListener(mSensorListener)
            callBack(JSCallback.SUCCESS, arrayOf(""))
        } else {
            callBack(JSCallback.FAIL, arrayOf("停止失败"))
        }
    }

    internal inner class SensorListener : SensorEventListener {

        override fun onSensorChanged(event: SensorEvent) {
            // 读取加速度传感器数值，values数组0,1,2分别对应x,y,z轴的加速度
            Logger.error(TAG, "onSensorChanged: " + event.values[0] + ", " + event.values[1] + ", " + event.values[2])
        }

        override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
            Logger.error(TAG, "onAccuracyChanged")
        }

    }

    companion object {
        private val TAG = "AccelerometerProvider"
    }
}
