package com.kuplay.kuplay.gdtunion;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.view.ViewGroup;

import com.kuplay.kuplay.R;
import com.kuplay.kuplay.common.js.JSEnv;
import com.qq.e.ads.cfg.BrowserType;
import com.qq.e.ads.cfg.DownAPPConfirmPolicy;
import com.qq.e.ads.nativ.ADSize;
import com.qq.e.ads.nativ.NativeExpressAD;
import com.qq.e.ads.nativ.NativeExpressADView;
import com.qq.e.comm.util.AdError;

import java.util.List;

public class NativeExpress implements NativeExpressAD.NativeExpressADListener {
    private NativeExpressAD ad;
    private NativeExpressADView currentAd;
    private ViewGroup container;

    public NativeExpress() {
        Context ctx = (Context) JSEnv.getEnv(JSEnv.CONTEXT);
        Activity activity = (Activity) JSEnv.getEnv(JSEnv.ACTIVITY);

        container = activity.findViewById(R.id.app_main_rl_root_view);

        this.ad = new NativeExpressAD(ctx, new ADSize(ADSize.FULL_WIDTH, ADSize.AUTO_HEIGHT),
                Constants.APPID, Constants.NativeExpressPosID, this);

//        一次只加载一个广告
        this.ad.loadAD(1);
    }

    /**
     * 显示广告链接的浏览器类型
     * @param bt Inner(App内置浏览器), Sys(系统浏览器), Default(sdk按照默认逻辑选择)
     */
    public void setBrowserType(BrowserType bt) {
        this.ad.setBrowserType(bt);
    }

    /**
     * 指定点击app广告后是否展示二次确认
     * @param policy Default,(WiFi不展示，非WiFi展示), NoConfirm(所有情况均不展示)
     */
    public void setDownAppConfirmPolicy(DownAPPConfirmPolicy policy) {
        this.ad.setDownAPPConfirmPolicy(policy);
    }

//    广告加载成功，返回广告列表
    @Override
    public void onADLoaded(List<NativeExpressADView> list) {
        if (currentAd != null) {
            currentAd.destroy();
        }
        currentAd = list.get(0);
        currentAd.render();
        container.addView(currentAd);
    }

//    广告渲染失败
    @Override
    public void onRenderFail(NativeExpressADView nativeExpressADView) {
        Log.e("GDTUnion", "native express ad render fail");
    }

//    广告渲染成功
    @Override
    public void onRenderSuccess(NativeExpressADView nativeExpressADView) {
        Log.e("GDTUnion", "native express ad render success");
    }

//    广告曝光
    @Override
    public void onADExposure(NativeExpressADView nativeExpressADView) {
        Log.e("GDTUnion", "native express ad exposure");
    }

    @Override
    public void onADClicked(NativeExpressADView nativeExpressADView) {

    }

//    广告关闭，广告资源已释放，不可再用
    @Override
    public void onADClosed(NativeExpressADView nativeExpressADView) {
        Log.e("GDTUnion", "native express ad closed");
    }

//    因为广告点击而离开当前app
    @Override
    public void onADLeftApplication(NativeExpressADView nativeExpressADView) {
        Log.e("GDTUnion", "native express ad left app");
    }

//    广告展开遮盖时调用
    @Override
    public void onADOpenOverlay(NativeExpressADView nativeExpressADView) {
        Log.e("GDTUnion", "native express ad overlay open");
    }

//    广告关闭遮盖时调用
    @Override
    public void onADCloseOverlay(NativeExpressADView nativeExpressADView) {
        Log.e("GDTUnion", "native express ad overlay close");
    }

//    广告加载失败
    @Override
    public void onNoAD(AdError adError) {
        Log.e("GDTUnion", "native express ad error");
    }
}
