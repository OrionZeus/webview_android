package com.kuplay.kuplay.gdtunion;

import android.app.Activity;
import android.util.Log;

import com.kuplay.kuplay.common.js.JSEnv;
import com.qq.e.ads.interstitial.InterstitialAD;
import com.qq.e.ads.interstitial.InterstitialADListener;
import com.qq.e.comm.util.AdError;

//插屏广告
public class Interstitial implements InterstitialADListener{
    private InterstitialAD interstitialAD;

//    创建的插屏广告是否有遮罩层
    private boolean withMask = true;

    public Interstitial(boolean withMask) {
        this.withMask = withMask;
        Activity activity = (Activity) JSEnv.getEnv(JSEnv.ACTIVITY);

        interstitialAD = new InterstitialAD(activity, Constants.APPID, Constants.InterteristalPosID);

        interstitialAD.setADListener(this);
        interstitialAD.loadAD();
    }

//    广告加载完成
    @Override
    public void onADReceive() {
        Log.e("GDTUnion", "interstitialAD received");
        if (withMask) {
//            广告有遮罩层
            interstitialAD.show();
        } else {
//            广告无遮罩层
            interstitialAD.showAsPopupWindow();
        }
    }

//    加载广告失败
    @Override
    public void onNoAD(AdError adError) {

    }

    @Override
    public void onADOpened() {

    }

//    广告曝光
    @Override
    public void onADExposure() {

    }

//    广告点击
    @Override
    public void onADClicked() {

    }

//    因为点击广告而离开app
    @Override
    public void onADLeftApplication() {

    }

//    广告关闭
    @Override
    public void onADClosed() {

    }
}
