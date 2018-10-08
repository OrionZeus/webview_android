package com.kuplay.kuplay.util;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Environment;
import android.os.StatFs;
import android.text.format.Formatter;

import com.kuplay.kuplay.bean.MobileSystemInfo;

import java.io.File;
import java.util.Locale;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class SystemUtil {
    @SuppressLint("HardwareIds")
    public static MobileSystemInfo getSystemInfo(Activity ctx) {
        MobileSystemInfo mobileSystemInfo = new MobileSystemInfo();
        PackageInfo packageInfo = getPackageInfo(ctx);
        mobileSystemInfo.setDeviceId(getIMEI(ctx))
                .setBrand(getDeviceBrand())
                .setModel(getSystemModel())
                .setCurrentSize(getSDAvailableSize(ctx))
                .setLimitSize(getSDTotalSize(ctx))
                .setPixelRatio(((int) ctx.getResources().getDisplayMetrics().density))
                .setVersion(null == packageInfo ? null : packageInfo.versionName)
                .setScreenWidth((int) ViewUtil.getScreenWidth(ctx))
                .setScreenHeight((int) ViewUtil.getScreenHeight(ctx))
                .setStatusBarHeight((int) ViewUtil.getStatusBarHeight(ctx))
                .setLanguage(getSystemLanguage())
                .setSystem(getSystemVersion());
        return mobileSystemInfo;
    }

    private static PackageInfo getPackageInfo(Context context) {
        try {
            PackageManager pm = context.getPackageManager();
            return pm.getPackageInfo(context.getPackageName(), PackageManager.GET_CONFIGURATIONS);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 获取当前手机系统语言。
     *
     * @return 返回当前系统语言。例如：当前设置的是“中文-中国”，则返回“zh-CN”
     */
    public static String getSystemLanguage() {
        return Locale.getDefault().getLanguage();
    }

    /**
     * 获取当前系统上的语言列表(Locale列表)
     *
     * @return 语言列表
     */
    public static Locale[] getSystemLanguageList() {
        return Locale.getAvailableLocales();
    }

    /**
     * 获取当前手机系统版本号
     *
     * @return 系统版本号
     */
    public static String getSystemVersion() {
        return android.os.Build.VERSION.RELEASE;
    }

    /**
     * 获取手机型号
     *
     * @return 手机型号
     */
    public static String getSystemModel() {
        return android.os.Build.MODEL;
    }

    /**
     * 获取手机厂商
     *
     * @return 手机厂商
     */
    public static String getDeviceBrand() {
        return android.os.Build.BRAND;
    }


    public static String getIMEI(Context ctx) {
        return GetDeviceId.getDeviceId(ctx);
    }

    /**
     * 获得SD卡总大小
     *
     * @return
     */
    private static String getSDTotalSize(Context ctx) {
        File path = Environment.getExternalStorageDirectory();
        StatFs stat = new StatFs(path.getPath());
        long blockSize = stat.getBlockSizeLong();
        long totalBlocks = stat.getBlockCountLong();
        return Formatter.formatFileSize(ctx, blockSize * totalBlocks);
    }

    /**
     * 获得sd卡剩余容量，即可用大小
     *
     * @return
     */
    private static String getSDAvailableSize(Context ctx) {
        File path = Environment.getExternalStorageDirectory();
        StatFs stat = new StatFs(path.getPath());
        long blockSize = stat.getBlockSizeLong();
        long availableBlocks = stat.getBlockCountLong();
        return Formatter.formatFileSize(ctx, blockSize * availableBlocks);
    }

}
