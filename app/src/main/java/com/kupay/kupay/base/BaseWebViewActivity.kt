package com.kupay.kupay.base

import android.bluetooth.le.AdvertisingSetCallback
import android.graphics.PixelFormat
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import com.kupay.kupay.R
import com.kupay.kupay.callback.WebViewLoadProgressCallback
import com.kupay.kupay.common.WebViewManager
import com.kupay.kupay.common.js.JSBridge
import com.kupay.kupay.common.js.JSEnv
import com.kupay.kupay.common.js.JSIntercept
import com.kupay.kupay.util.Logger
import com.kupay.kupay.widget.AndroidWebView
import com.kupay.kupay.widget.X5Chrome
import java.util.HashMap

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/22.
 * BaseWebViewActivity
 */
abstract class BaseWebViewActivity : BaseActivity(), WebViewLoadProgressCallback {
    private var mAndroidWebView/*Google Android WebView*/: AndroidWebView? = null
    protected var mX5Chrome/*X5 Chrome*/: X5Chrome? = null
    protected lateinit var mWebView: View
    private var inited = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val window = window
        //设置主界面背景颜色
        val drawable = resources.getDrawable(R.drawable.main_app_background)
        window.setBackgroundDrawable(drawable)
        window.setFormat(PixelFormat.TRANSLUCENT)
        // 避免输入法界面弹出后遮挡输入光标的问题
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE or WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN)
    }

    /**
     * Create a new WebView to show data
     */
    protected fun createWebView() {
        val x5Core = WebViewManager.isX5Core()
        if (!x5Core) {
            mAndroidWebView = AndroidWebView(this)
            mAndroidWebView!!.setLoadCallback(this)
            mAndroidWebView?.addJavascriptInterface(JSBridge(), JSBridge::class.java.simpleName)
            mAndroidWebView?.addJavascriptInterface(JSIntercept(), JSIntercept::class.java.simpleName)
            JSEnv.setEnv(JSEnv.WEBVIEW, mAndroidWebView)
            mWebView = mAndroidWebView as AndroidWebView
        } else {
            mX5Chrome = X5Chrome(this)
            mX5Chrome!!.setLoadCallback(this)
            //设置要放到这里来写、因为添加的时候是全局静态的HashMap
            //放到WebView中会被已经Destroy了的WebView覆盖掉
            mX5Chrome?.addJavascriptInterface(JSBridge(), JSBridge::class.java.simpleName)
            mX5Chrome?.addJavascriptInterface(JSIntercept(), JSIntercept::class.java.simpleName)
            JSEnv.setEnv(JSEnv.WEBVIEW, mX5Chrome)
            mWebView = mX5Chrome as X5Chrome
        }
        JSEnv.setEnv(JSEnv.CONTEXT, this)
        JSEnv.setEnv(JSEnv.ACTIVITY, this)
        inited = true
        Logger.verbose("Base", if (x5Core) "x5" else "系统")
    }

    /**
     * 加载URL
     */
    protected fun loadUrlIntoWebView(url: String) {
        val extraHeaders = HashMap<String, String>()
        extraHeaders["Referer"] = url
        if (WebViewManager.isX5Core()) mX5Chrome?.loadUrl(url, extraHeaders)
        else mAndroidWebView?.loadUrl(url, extraHeaders)
    }

    override fun onResume() {
        super.onResume()
        if (!inited) return
        if (null != mAndroidWebView) JSEnv.setEnv(JSEnv.WEBVIEW, mAndroidWebView)
        else if (null != mX5Chrome) JSEnv.setEnv(JSEnv.WEBVIEW, mX5Chrome)
    }

    /**
     * Activity生命周期->销毁
     */
    override fun onDestroy() {
        mX5Chrome?.destroy()
        mAndroidWebView?.destroy()
        super.onDestroy()
    }

}
