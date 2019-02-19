package com.kuplay.kuplay.module;

import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.util.InternetUtil;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class NetworkChecker extends BaseJSModule {
    /**
     * 获取网络连接状态
     *
     * @param callbackId 回调TS层的CallbackId
     */
    public void getNetworkState(final int callbackId) {
        int networkState = InternetUtil.getNetworkState(ctx);
        switch (networkState) {
            case InternetUtil.NETWORK_NONE:
            case InternetUtil.NETWORK_WIFI:
            case InternetUtil.NETWORK_2G:
            case InternetUtil.NETWORK_3G:
            case InternetUtil.NETWORK_4G:
            case InternetUtil.NETWORK_MOBILE:
                JSCallback.callJS(null, null, callbackId, JSCallback.SUCCESS, "网络类型:" + networkState);
                break;
            default:
                JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "获取网络状态失败");
                break;
        }
    }
}
