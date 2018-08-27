package com.kupay.kupay.util;

import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.util.DisplayMetrics;

/**
 * Created by "iqos_jay@outlook.com" on 2018/7/6.
 */
public class ViewUtil {
    /**
     * 获取设备屏幕的宽度
     *
     * @param ctx 上下文
     * @return 屏幕的宽度
     */
    public static float getScreenWidth(Activity ctx) {
        Resources resources = ctx.getResources();
        DisplayMetrics dm = resources.getDisplayMetrics();
        return dm.widthPixels;
    }

    /**
     * 获取设备屏幕的高度
     *
     * @param ctx 上下文
     * @return 屏幕的高度
     */
    public static float getScreenHeight(Activity ctx) {
        Resources resources = ctx.getResources();
        DisplayMetrics dm = resources.getDisplayMetrics();
        return dm.heightPixels;
    }

    /**
     * 获取状态栏的高度
     *
     * @param ctx 上下文
     * @return 状态栏的高度
     */
    public static float getStatusBarHeight(Context ctx) {
        int statusBarHeight = -1;
        //获取status_bar_height资源的ID
        int resourceId = ctx.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            //根据资源ID获取响应的尺寸值
            statusBarHeight = ctx.getResources().getDimensionPixelSize(resourceId);
        }
        return statusBarHeight;
    }

    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     */
    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }
}
