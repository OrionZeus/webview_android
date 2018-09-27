package com.kupay.kupay.app

import android.app.Application
import android.webkit.WebView
import com.kupay.kupay.base.BaseWebView
import com.kupay.kupay.util.WebViewUtil
import com.tencent.smtt.sdk.QbSdk

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/26.
 */
class App : Application() {

    override fun onCreate() {
        super.onCreate()
        sAppCtx = this
        BaseWebView.isX5 = !WebViewUtil.shouldUseAndroidWebView(WebView(sAppCtx), sAppCtx)
        if (BaseWebView.isX5) {
            QbSdk.initX5Environment(sAppCtx, object : QbSdk.PreInitCallback {
                override fun onViewInitFinished(isX5Core: Boolean) {}
                override fun onCoreInitFinished() {}
            })
        }
    }

    companion object {
        lateinit var sAppCtx: Application
    }
}