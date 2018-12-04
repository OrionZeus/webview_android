package com.kuplay.kuplay.base

import android.os.Bundle
import android.util.Log
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

    protected fun setIntercept(isIntercept: Boolean) {
        if (isX5) mX5?.setIntercept(isIntercept)
        else mAndroidWebView?.setIntercept(isIntercept)
    }

    protected fun addJEV() {
        JSEnv.setEnv(JSEnv.CONTEXT, this)
        JSEnv.setEnv(JSEnv.ACTIVITY, this)
        if (mX5 != null) {
            JSEnv.setEnv(JSEnv.WEBVIEW, mX5)
        } else {
            JSEnv.setEnv(JSEnv.WEBVIEW, mAndroidWebView)
        }
    }

    protected fun loadUrl(url: String) {
        val extraHeaders = HashMap<String, String>()
        extraHeaders["Referer"] = url
        if (isX5) mX5?.loadUrl(url, extraHeaders)
        else mAndroidWebView?.loadUrl(url, extraHeaders)
    }

    protected fun loadDataWithBaseUrl(url: String, content: String) {
        if (isX5) mX5?.loadDataWithBaseURL(url, content, "text/html", "utf8", url);
        else mAndroidWebView?.loadDataWithBaseURL(url, content, "text/html", "utf8", url);
    }

    companion object {
        var isX5 = false
    }
}