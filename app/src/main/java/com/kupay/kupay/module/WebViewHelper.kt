package com.kupay.kupay.module

import android.content.Intent
import com.kupay.kupay.R
import com.kupay.kupay.app.DetailDesWebView
import com.kupay.kupay.app.SecondWebView
import com.kupay.kupay.base.BaseActivity.Companion.APP_RESULT_CODE
import com.kupay.kupay.base.BaseJSModule

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/13.
 */
class WebViewHelper : BaseJSModule() {

    fun openNewWebView(callbackId: Int, loadUrl: String) {
        val intent = Intent(ctx, SecondWebView::class.java)
        intent.putExtra(LOAD_URL_KEY, loadUrl)
        ctx.startActivity(intent)
        ctx.overridePendingTransition(R.anim.anim_app_d2u, R.anim.anim_app_stay)
    }

    /**
     * const value
     */
    companion object {
        const val LOAD_URL_KEY = "load_url"
    }
}
