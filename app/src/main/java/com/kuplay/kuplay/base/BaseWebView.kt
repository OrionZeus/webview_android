package com.kuplay.kuplay.base

import android.os.Bundle
import android.util.Log
import com.kuplay.kuplay.common.js.JSEnv
import java.util.HashMap

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/27.
 */
abstract class BaseWebView : BaseActivity() {
    var ynWebView = YNWebView()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //ynWebView.createYnWebView(this)
    }

    override fun onDestroy() {
        super.onDestroy()
        ynWebView.destroyYnWebView()
    }

    protected fun addJEV() {
        JSEnv.setEnv(JSEnv.CONTEXT, this)
        JSEnv.setEnv(JSEnv.ACTIVITY, this)
        ynWebView.setJEN()
    }

    protected fun loadUrl(url: String) {
        val extraHeaders = HashMap<String, String>()
        extraHeaders["Referer"] = url
        ynWebView.loadURL(url,extraHeaders)
    }

    protected fun loadDataWithBaseUrl(url: String, content: String) {
        ynWebView.loadDataWithBaseUrl(url,content)
    }

}