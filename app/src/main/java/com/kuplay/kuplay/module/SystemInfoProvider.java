package com.kuplay.kuplay.module;

import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.bean.MobileSystemInfo;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.util.SystemUtil;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class SystemInfoProvider extends BaseJSModule {
    public void getSystemInfo(int callbackId) {
        MobileSystemInfo systemInfo = SystemUtil.getSystemInfo(ctx);
        JSCallback.callJS(null, null, callbackId, JSCallback.SUCCESS, systemInfo.toString());
    }
}
