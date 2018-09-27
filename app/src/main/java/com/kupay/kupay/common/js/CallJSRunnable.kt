package com.kupay.kupay.common.js

import com.kupay.kupay.base.BaseWebView
import com.kupay.kupay.widget.AndroidWebView
import com.kupay.kupay.widget.X5Chrome

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 */
class CallJSRunnable(private val func: String) : Runnable {

    override fun run() {
        if (BaseWebView.isX5) {
            val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as X5Chrome
            webView.evaluateJavascript(func, null)
        } else {
            val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as AndroidWebView
            webView.evaluateJavascript(func, null)
        }
    }
}
