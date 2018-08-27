package com.kupay.kupay.module;

import com.kupay.kupay.base.BaseJSModule;
import com.kupay.kupay.bean.MobileSystemInfo;
import com.kupay.kupay.common.js.JSCallback;
import com.kupay.kupay.util.SystemUtil;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class SystemInfoProvider extends BaseJSModule {
    public void getSystemInfo(int callbackId) {
        MobileSystemInfo systemInfo = SystemUtil.getSystemInfo(ctx);
        JSCallback.callJS(callbackId, JSCallback.SUCCESS, systemInfo.toString());
    }
}
