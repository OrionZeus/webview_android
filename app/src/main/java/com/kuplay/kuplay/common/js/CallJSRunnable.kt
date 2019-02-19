package com.kuplay.kuplay.common.js

import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 */
class CallJSRunnable(var webView: Object, private val func: String) : Runnable {
    override fun run() {
        if (webView == null) webView = JSEnv.getEnv(JSEnv.WEBVIEW) as Object
        if (BaseWebView.isX5) {
            (webView as X5Chrome).evaluateJavascript(func, null)
        } else {
            (webView as AndroidWebView).evaluateJavascript(func, null)
        }
    }
}
