package com.kupay.kupay.util

import android.annotation.SuppressLint
import android.content.Context
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Bundle

object LocationUtils {
    var listener: MyLocationListener? = null
    @SuppressLint("MissingPermission")
    fun getLocation(context: Context, listener: MyLocationListener?) {
        this.listener = listener
        //1.获取位置管理器
        var locationManager: Any? = context.getSystemService(Context.LOCATION_SERVICE) ?: return
        locationManager = locationManager as LocationManager
        //2.获取位置提供器，GPS或是NetWork
        val providers = locationManager.getProviders(true)
        val locationProvider: String
        when {
            //如果是网络定位
            providers.contains(LocationManager.NETWORK_PROVIDER) ->
                locationProvider = LocationManager.NETWORK_PROVIDER
            //如果是GPS定位
            providers.contains(LocationManager.GPS_PROVIDER) ->
                locationProvider = LocationManager.GPS_PROVIDER
            //没有可用的位置提供器
            else -> {
                listener?.locationFailed("没有可用的位置提供器")
                return
            }
        }
        //3.获取上次的位置，一般第一次运行，此值为null
        val location = locationManager.getLastKnownLocation(locationProvider)
        if (location != null) {
            listener?.locationSuccess(location)
        } else {
            // 监视地理位置变化，第二个和第三个参数分别为更新的最短时间minTime和最短距离minDistace
            locationManager.requestLocationUpdates(locationProvider, 0, 0f, mListener)
        }
    }

    private val mListener = object : LocationListener {
        override fun onLocationChanged(location: Location?) {
            if (null != location) {
                listener?.locationSuccess(location)
            }
        }

        override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {
        }

        override fun onProviderEnabled(provider: String?) {
        }

        override fun onProviderDisabled(provider: String?) {
            listener?.locationFailed("没有可用的位置提供器")
        }

    }

    interface MyLocationListener {
        /**
         * 定位失败
         * @param failReason 定位失败的原因
         */
        fun locationFailed(failReason: String)

        /**
         * 定位成功
         */
        fun locationSuccess(location: Location)
    }


}
