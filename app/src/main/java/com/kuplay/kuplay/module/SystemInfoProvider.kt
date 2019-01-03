package com.kuplay.kuplay.module

import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.bean.MobileSystemInfo
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.util.SystemUtil

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
class SystemInfoProvider : BaseJSModule() {
    fun getSystemInfo(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        val systemInfo = SystemUtil.getSystemInfo(ctx)
        callBack(JSCallback.SUCCESS, arrayOf(systemInfo.toString()))
        //JSCallback.callJS(null, null, callbackId, JSCallback.getSUCCESS(), systemInfo.toString())
    }
}
