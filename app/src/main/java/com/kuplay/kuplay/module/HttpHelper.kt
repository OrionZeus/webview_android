package com.kuplay.kuplay.module

import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.http.OkHttpHelper
import com.kuplay.kuplay.common.js.JSCallback

/**
 * Created by "iqosjay@gmail.com" on 2018/10/12.
 */
class HttpHelper : BaseJSModule() {
    /**
     * HTTP 请求 -> GET
     */
    fun openGetConnection(url: String,callBack:(callType: Int, prames: Array<Any>)->Unit) {
        OkHttpHelper().getRequest(ctx!!,
                url,
                successCallback = { result -> callBack(JSCallback.SUCCESS, arrayOf(result)) },
                failedCallback = { msg -> callBack(JSCallback.FAIL, arrayOf(msg)) })
    }

    /**
     * HTTP 请求 -> POST
     */
    fun openPostConnection(url: String, json: String, callBack:(callType: Int, prames: Array<Any>)->Unit) {
        OkHttpHelper().postRequest(ctx!!,
                url,
                json,
                successCallback = { result -> callBack(JSCallback.SUCCESS, arrayOf(result)) },
                failedCallback = { msg -> callBack(JSCallback.FAIL, arrayOf(msg)) })
    }
}
