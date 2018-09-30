package com.kupay.kupay.module

import com.kupay.kupay.base.BaseJSModule
import com.kupay.kupay.common.js.JSCallback
import com.kupay.kupay.util.GetDeviceId

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/28.
 */
class DeviceIdProvider : BaseJSModule() {
    fun getUUId(callbackId: Int) {
        JSCallback.callJS(callbackId, JSCallback.SUCCESS, GetDeviceId.getDeviceId(ctx))
    }
}
