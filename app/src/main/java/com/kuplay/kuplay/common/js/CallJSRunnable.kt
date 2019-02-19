package com.kuplay.kuplay.common.js

import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.base.YNWebView
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 */
class CallJSRunnable(var webView: Any, private val func: String) : Runnable {
    override fun run() {
        if (webView == null) webView = JSEnv.getEnv(JSEnv.WEBVIEW) as Object
        YNWebView.evaLua(webView,func)
    }
}
