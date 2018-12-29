package com.kuplay.kuplay.gdtunion;

import android.content.Context;
import android.os.SystemClock;
import android.util.Log;

import com.kuplay.kuplay.common.js.JSEnv;
import com.qq.e.ads.rewardvideo.RewardVideoAD;
import com.qq.e.ads.rewardvideo.RewardVideoADListener;
import com.qq.e.comm.util.AdError;

public class RewardVideo implements RewardVideoADListener {
    private RewardVideoAD rewardVideoAD;
    private Context context;

//    广告过期时间,过期后不能使用
    private long expireTimestamp = 0;

    public RewardVideo() {
        context = (Context) JSEnv.getEnv(JSEnv.CONTEXT);
        fetchAD(context);
    }

//    拉取广告
    public void fetchAD(Context ctx) {
        rewardVideoAD = new RewardVideoAD(ctx, Constants.APPID, Constants.RewardVideoADPosIDSupportH, this);
        rewardVideoAD.loadAD();
    }

//    广告加载成功
    @Override
    public void onADLoad() {
        expireTimestamp = rewardVideoAD.getExpireTimestamp();
        Log.e("GDT", "reward video deadline:" + expireTimestamp);
    }

//    视频素材缓存成功，可在此处对广告进行展示
    @Override
    public void onVideoCached() {
        long delta = 1000;   // 加个保险，防止广告过期

//        激励视频广告只能显示一次，如果广告已显示，或已过期，则重新拉取广告显示
        if (!rewardVideoAD.hasShown() && (SystemClock.elapsedRealtime() < (expireTimestamp - delta))) {
            rewardVideoAD.showAD();
        } else {
            fetchAD(context);
        }
    }

//    广告显示回调
    @Override
    public void onADShow() {
        Log.e("GDT", "reward video have shown");
    }

//    广告曝光
    @Override
    public void onADExpose() {
        Log.e("GDT", "reward video expose");
    }

//    在此发放奖励
    @Override
    public void onReward() {
        Log.e("GDT", "reward video should reward.");
    }

    @Override
    public void onADClick() {

    }

    @Override
    public void onVideoComplete() {
        Log.e("GDT", "reward video complete");
    }

    @Override
    public void onADClose() {
        Log.e("GDT", "reward video close");
    }

    @Override
    public void onError(AdError adError) {
        Log.e("GDT", "reward video error");
    }
}
