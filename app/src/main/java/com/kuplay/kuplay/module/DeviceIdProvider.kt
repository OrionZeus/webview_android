package com.kuplay.kuplay.module

import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.util.GetDeviceId

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/28.
 */
class DeviceIdProvider : BaseJSModule() {
    fun getUUId(callbackId: Int) {
        JSCallback.callJS(null, null, callbackId, JSCallback.SUCCESS, GetDeviceId.getDeviceId(ctx))
    }
}
