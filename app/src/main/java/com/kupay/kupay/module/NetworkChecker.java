package com.kupay.kupay.module;

import com.kupay.kupay.base.BaseJSModule;
import com.kupay.kupay.common.js.JSCallback;
import com.kupay.kupay.util.InternetUtil;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class NetworkChecker extends BaseJSModule {
    /**
     * 获取网络连接状态
     *
     * @param callbackId 回调TS层的CallbackId
     */
    public void getNewworkState(final int callbackId) {
        int networkState = InternetUtil.getNetworkState(ctx);
        switch (networkState) {
            case InternetUtil.NETWORK_NONE:
            case InternetUtil.NETWORK_WIFI:
            case InternetUtil.NETWORK_2G:
            case InternetUtil.NETWORK_3G:
            case InternetUtil.NETWORK_4G:
            case InternetUtil.NETWORK_MOBILE:
                JSCallback.callJS(callbackId, JSCallback.SUCCESS, "");
                break;
            default:
                JSCallback.callJS(callbackId, JSCallback.FAIL, "获取网络状态失败");
                break;
        }
    }
}
