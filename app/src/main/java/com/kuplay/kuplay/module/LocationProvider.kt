package com.kuplay.kuplay.module

import android.Manifest
import android.location.Criteria
import android.location.Location
import com.github.dfqin.grantor.PermissionListener
import com.github.dfqin.grantor.PermissionsUtil
import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.util.LocationUtils
import com.kuplay.kuplay.util.Logger

/**
 * [LocationProvider] is a class,it defined  method [LocationProvider.getCurrentLocation],
 * this method will be called when the TS need to know the device's location.
 */
class LocationProvider : BaseJSModule() {
    private var mListener: LocationChangeListener? = null

    /**
     * Get the location where the devices is now.
     *
     * @param callbackId This callbackId will be used to callback TS code.
     */
    fun getCurrentLocation(callbackId: Int) {
        super.callbackId = callbackId
        PermissionsUtil.requestPermission(ctx, object : PermissionListener {
            override fun permissionGranted(permission: Array<String>) {
                val c = Criteria()//Criteria类是设置定位的标准信息（系统会根据你的要求，匹配最适合你的定位供应商），一个定位的辅助信息的类
                c.isAltitudeRequired = true//设置需要海拔
                c.bearingAccuracy = Criteria.ACCURACY_COARSE//设置COARSE精度标准
                c.accuracy = Criteria.ACCURACY_LOW//设置低精度
                mListener = LocationChangeListener()
                LocationUtils.getLocation(ctx, mListener)
            }

            override fun permissionDenied(permission: Array<String>) {
                JSCallback.callJS(getActivity(), callbackId, JSCallback.FAIL, "用户拒绝了定位权限")
            }
        }, Manifest.permission.ACCESS_COARSE_LOCATION)

    }

    private inner class LocationChangeListener : LocationUtils.MyLocationListener {
        /**
         * 定位失败
         * @param failReason 定位失败的原因
         */
        override fun locationFailed(failReason: String) {
            JSCallback.callJS(getActivity(), callbackId, JSCallback.FAIL, failReason)
        }

        /**
         * 定位成功
         */
        override fun locationSuccess(location: Location) {
            val latitude = location.latitude//纬度
            val longitude = location.longitude//经度
            Logger.error(TAG, "getCurrentLocation:纬度 $latitude")
            Logger.error(TAG, "getCurrentLocation:经度 $longitude")
            JSCallback.callJS(getActivity(), callbackId, JSCallback.SUCCESS, String.format("(%s,%s)", latitude, longitude))
            mListener = null
        }
    }

    companion object {
        private const val TAG = "LocationProvider"
    }

}
