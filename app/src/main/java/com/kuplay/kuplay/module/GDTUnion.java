package com.kuplay.kuplay.module;

import android.app.Activity;
import android.content.Intent;

import com.kuplay.kuplay.app.SplashActivity;
import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSEnv;
import com.kuplay.kuplay.gdtunion.Banner;
import com.kuplay.kuplay.gdtunion.Interstitial;
import com.kuplay.kuplay.gdtunion.NativeExpress;
import com.kuplay.kuplay.gdtunion.RewardVideo;

public class GDTUnion extends BaseJSModule {
    private static boolean interstitialWithMask = false;

    public static void showBannerAD(int cbId) {
        Banner banner = new Banner();
    }

    public static void showInterstitialAD(int cbId) {
        Interstitial interstitial = new Interstitial(interstitialWithMask);
        interstitialWithMask = !interstitialWithMask;
    }

    public static void showSplashAD(int cbId) {
        Activity activity = (Activity) JSEnv.getEnv(JSEnv.ACTIVITY);

        activity.startActivity(new Intent(activity, SplashActivity.class));
        activity.finish();
    }

    public static void showNativeExpressAD(int cbId) {
        NativeExpress nativeExpress = new NativeExpress();
    }

    public static void showRewardVideoAD(int cbId) {
        RewardVideo rewardVideo = new RewardVideo();
    }
}
