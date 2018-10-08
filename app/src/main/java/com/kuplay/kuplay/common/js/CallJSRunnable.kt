package com.kuplay.kuplay.common.js

import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome

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
