package com.kuplay.kuplay.app

import android.app.Application
import android.webkit.WebView
import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.base.YNWebView
import com.kuplay.kuplay.util.WebViewUtil
import com.tencent.smtt.sdk.QbSdk

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/26.
 */
class App : Application() {

    override fun onCreate() {
        super.onCreate()
        sAppCtx = this
        YNWebView.getX5Open(this)
    }

    companion object {
        lateinit var sAppCtx: Application
    }
}