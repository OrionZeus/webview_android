package com.kupay.kupay.module;

import android.Manifest;
import android.location.Criteria;
import android.location.Location;
import android.support.annotation.NonNull;

import com.github.dfqin.grantor.PermissionListener;
import com.github.dfqin.grantor.PermissionsUtil;
import com.kupay.kupay.base.BaseJSModule;
import com.kupay.kupay.util.LocationUtils;
import com.kupay.kupay.util.Logger;

public class LocationProvider extends BaseJSModule {
    private static final String TAG = "LocationProvider";

    public void getCurrentLocation(int callbackId) {
        PermissionsUtil.requestPermission(ctx, new PermissionListener() {
            @Override
            public void permissionGranted(@NonNull String[] permission) {
                Criteria c = new Criteria();//Criteria类是设置定位的标准信息（系统会根据你的要求，匹配最适合你的定位供应商），一个定位的辅助信息的类
                c.setAltitudeRequired(true);//设置需要海拔
                c.setBearingAccuracy(Criteria.ACCURACY_COARSE);//设置COARSE精度标准
                c.setAccuracy(Criteria.ACCURACY_LOW);//设置低精度
                Location bestLocation = LocationUtils.getBestLocation(ctx, c);
                if (null == bestLocation) {
                    Logger.error(TAG, "定位失败");
                    return;
                }
                double latitude = bestLocation.getLatitude();//纬度
                double longitude = bestLocation.getLongitude();//经度
                Logger.error(TAG, "getCurrentLocation:经度 " + latitude);
                Logger.error(TAG, "getCurrentLocation:经度 " + longitude);
            }

            @Override
            public void permissionDenied(@NonNull String[] permission) {

            }
        }, Manifest.permission.ACCESS_COARSE_LOCATION);

    }
}
