package com.kuplay.kuplay.module

import android.webkit.JsPromptResult
import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.util.InternetUtil

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
class NetworkChecker : BaseJSModule() {
    /**
     * 获取网络连接状态
     *
     */
    fun getNetworkState(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        val networkState = InternetUtil.getNetworkState(ctx!!)
        when (networkState) {
            InternetUtil.NETWORK_NONE, InternetUtil.NETWORK_WIFI, InternetUtil.NETWORK_2G, InternetUtil.NETWORK_3G, InternetUtil.NETWORK_4G, InternetUtil.NETWORK_MOBILE -> callBack(JSCallback.SUCCESS, arrayOf("网络类型:$networkState"))
            else -> callBack(JSCallback.FAIL, arrayOf("获取网络状态失败"))
        }


    }
}
