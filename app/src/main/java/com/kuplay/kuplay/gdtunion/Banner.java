package com.kuplay.kuplay.gdtunion;

import android.animation.ValueAnimator;
import android.app.Activity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.kuplay.kuplay.common.js.JSEnv;
import com.qq.e.ads.banner.ADSize;
import com.qq.e.ads.banner.BannerADListener;
import com.qq.e.ads.banner.BannerView;
import com.qq.e.comm.util.AdError;

public class Banner implements BannerADListener {
    private BannerView bannerView;
    private boolean bannerShowed = false;
    private int bannerHeight = 0;
    private Activity mActivity;

    public Banner() {
        mActivity = (Activity) JSEnv.getEnv(JSEnv.ACTIVITY);
        bannerView = new BannerView(mActivity, ADSize.BANNER, Constants.APPID, Constants.BannerPosID);

//        banner广告自动轮播刷新频率，为0或30~120之间的数字，单位为s，
//        为0时不自动轮播，默认30s
        bannerView.setRefresh(30);

//        设置广告回调
        bannerView.setADListener(this);

        bannerView.loadAD();

//        显示广告关闭按钮，此处设置显示，默认不显示
        bannerView.setShowClose(true);
    }

//    广告加载失败
    @Override
    public void onNoAD(AdError adError) {

    }

//    广告加载成功，广告资源已加载完毕
    @Override
    public void onADReceiv() {
        final ViewGroup.MarginLayoutParams params = new ViewGroup.MarginLayoutParams(
                ViewGroup.MarginLayoutParams.MATCH_PARENT,
                ViewGroup.MarginLayoutParams.WRAP_CONTENT
        );
//        显示广告
        mActivity.addContentView(bannerView, params);
    }

//    广告曝光(显示)回调
    @Override
    public void onADExposure() {
        int bh = bannerView.getHeight();
        bannerHeight = bh;
        ((ViewGroup.MarginLayoutParams) bannerView.getLayoutParams()).topMargin = -bh;

        final View webview = (View) JSEnv.getEnv(JSEnv.WEBVIEW);

        final int webHeight = webview.getHeight();

//        如果广告未显示(即新建广告，而不是广告自己刷新)，webview下移并减小高度，
//        过度用属性动画完成
        if (!bannerShowed) {
            bannerShowed = true;
//            params.height = webHeight - bannerHeight;
//            params.width = webWidth;
//            params.topMargin = bannerHeight;

            ValueAnimator va = ValueAnimator.ofInt(0, bannerHeight);
            va.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animation) {
                    int top = (int) animation.getAnimatedValue();

                    ((ViewGroup.MarginLayoutParams) webview.getLayoutParams()).topMargin = top;
                    webview.getLayoutParams().height = webHeight - top;
                    webview.requestLayout();

                    ((ViewGroup.MarginLayoutParams) bannerView.getLayoutParams()).topMargin = top - bannerHeight;
                    bannerView.requestLayout();
                }
            });
            va.setDuration(500);
            va.start();
        }
    }

//    点击广告关闭按钮回调
    @Override
    public void onADClosed() {
        final View webview = (View) JSEnv.getEnv(JSEnv.WEBVIEW);
        bannerShowed = false;

//        属性动画
        ValueAnimator va = ValueAnimator.ofInt(0, bannerHeight);
        va.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                int cur = (int) animation.getAnimatedValue();

                ((ViewGroup.MarginLayoutParams) webview.getLayoutParams()).topMargin = bannerHeight - cur;
                webview.getLayoutParams().height += cur;
                webview.requestLayout();

                ((ViewGroup.MarginLayoutParams) bannerView.getLayoutParams()).topMargin = -cur;
                bannerView.requestLayout();
                if (cur == bannerHeight) {
                    bannerView.destroy();
                }
            }
        });
        va.setDuration(500);
        va.start();
    }

//    点击广告
    @Override
    public void onADClicked() {

    }

//    由于点击广告离开app
    @Override
    public void onADLeftApplication() {

    }

//    当广告打开浮层时调用，如打开内置浏览器、内容展示浮层，一般发生在点击之后
    @Override
    public void onADOpenOverlay() {

    }

//    浮层关闭
    @Override
    public void onADCloseOverlay() {

    }
}
