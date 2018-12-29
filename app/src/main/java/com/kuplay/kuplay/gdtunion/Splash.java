package com.kuplay.kuplay.gdtunion;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.kuplay.kuplay.common.js.JSEnv;
import com.qq.e.ads.splash.SplashAD;
import com.qq.e.ads.splash.SplashADListener;
import com.qq.e.comm.util.AdError;

public class Splash implements SplashADListener {
    private SplashAD splash;
    private Activity mActivity;
    private Class nextActivity;

    /**
     * 添加闪屏广告
     * @param activity     将闪屏添加到该activity
     * @param nextActivity 闪屏结束的下一个activity
     */
    public void addSplashAD(Activity activity, Class nextActivity) {
        mActivity = activity;
        this.nextActivity = nextActivity;

        ViewGroup view = (ViewGroup) activity.getWindow().getDecorView();

        splash = new SplashAD(activity, view, Constants.APPID, Constants.SplashPosID, this);
    }

//    闪屏结束
    @Override
    public void onADDismissed() {
        Log.e("GDTUnion", "splash dismissed");
        this.splashFinish();
    }

//    广告加载失败
    @Override
    public void onNoAD(AdError adError) {
        Log.e("GDTUnion", "splash no ad");
        this.splashFinish();
    }

//    广告显示
    @Override
    public void onADPresent() {
        Log.e("GDTUnion", "splash showed");
    }

    @Override
    public void onADClicked() {
        Log.e("GDTUnion", "splash clicked");
    }

//    广告剩余显示时间，单位ms
    @Override
    public void onADTick(long l) {
//        Log.e("GDTUnion", "splash ticking:" + l);
    }

//    广告曝光
    @Override
    public void onADExposure() {
        Log.e("GDTUnion", "splash exposured");
    }

//    闪屏结束，进入新的activity
    private void splashFinish() {
        if (mActivity.getClass() == nextActivity) {
            ViewGroup container = (ViewGroup) mActivity.getWindow().getDecorView().getRootView();
            View webview = (View) JSEnv.getEnv(JSEnv.WEBVIEW);

            container.removeAllViews();
            int idx = container.indexOfChild(webview);
            container.removeViewAt(idx);

            container.addView(webview);
            return;
        }
        mActivity.startActivity(new Intent(mActivity, nextActivity));
        mActivity.finish();
    }
}
