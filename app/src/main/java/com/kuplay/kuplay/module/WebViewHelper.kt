package com.kuplay.kuplay.module

import android.content.Intent
import com.kuplay.kuplay.app.NewWebViewActivity
import com.kuplay.kuplay.base.BaseJSModule

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/13.
 */
class WebViewHelper : BaseJSModule() {

    fun openNewWebView(callbackId: Int, loadUrl: String, title: String) {
        val intent = Intent(ctx, NewWebViewActivity::class.java)
        intent.putExtra(LOAD_URL_KEY, loadUrl)
        intent.putExtra(TITLE, title)
        ctx.startActivity(intent)
    }

    /**
     * const value
     */
    companion object {
        const val LOAD_URL_KEY = "load_url"
        const val TITLE = "title"
    }
}
