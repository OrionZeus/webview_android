package com.kuplay.kuplay.base

import android.os.Bundle
import com.kuplay.kuplay.common.js.JSEnv
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome
import java.util.HashMap

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/27.
 */
abstract class BaseWebView : BaseActivity() {
    protected var mAndroidWebView: AndroidWebView? = null
    protected var mX5: X5Chrome? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        if (isX5) mX5 = X5Chrome(this)
        else mAndroidWebView = AndroidWebView(this)
        super.onCreate(savedInstanceState)
    }

    override fun onDestroy() {
        if (isX5) mX5?.destroy()
        else mAndroidWebView?.destroy()
        super.onDestroy()
    }

    protected fun addJEV() {
        JSEnv.setEnv(JSEnv.CONTEXT, this)
        JSEnv.setEnv(JSEnv.ACTIVITY, this)
        if (isX5) {
            if (null != mX5) JSEnv.setEnv(JSEnv.WEBVIEW, mX5)
        } else {
            if (null != mAndroidWebView) JSEnv.setEnv(JSEnv.WEBVIEW, mAndroidWebView)
        }
    }

    override fun onResume() {
        addJEV()
        super.onResume()
    }

    protected fun loadUrl(url: String) {
        val extraHeaders = HashMap<String, String>()
        extraHeaders["Referer"] = url
        if (isX5) mX5?.loadUrl(url, extraHeaders)
        else mAndroidWebView?.loadUrl(url, extraHeaders)
    }

    companion object {
        var isX5 = false
    }
}