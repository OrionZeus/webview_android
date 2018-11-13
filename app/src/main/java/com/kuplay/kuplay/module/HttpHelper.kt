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
    fun openGetConnection(callbackId: Int, url: String) {
        OkHttpHelper().getRequest(ctx,
                url,
                successCallback = { result -> JSCallback.callJS(getActivity(), callbackId, JSCallback.SUCCESS, result) },
                failedCallback = { msg -> JSCallback.callJS(getActivity(), callbackId, JSCallback.FAIL, msg) })
    }

    /**
     * HTTP 请求 -> POST
     */
    fun openPostConnection(callbackId: Int, url: String, json: String) {
        OkHttpHelper().postRequest(ctx,
                url,
                json,
                successCallback = { result -> JSCallback.callJS(getActivity(), callbackId, JSCallback.SUCCESS, result) },
                failedCallback = { msg -> JSCallback.callJS(getActivity(), callbackId, JSCallback.FAIL, msg) })
    }
}
