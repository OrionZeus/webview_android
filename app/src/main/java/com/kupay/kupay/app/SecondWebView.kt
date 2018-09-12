package com.kupay.kupay.app

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.LinearLayout
import com.kupay.kupay.R
import com.kupay.kupay.common.WebViewManager
import com.kupay.kupay.widget.AndroidWebView
import com.kupay.kupay.widget.X5Chrome

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/11.
 */
class SecondWebView : AppCompatActivity() {
    private var isX5 = false //Whether use the x5 chrome
    private var mWebViewAndroid: AndroidWebView? = null//Android's WebView
    private var mWebViewX5Chrome: X5Chrome? = null//X5 Chrome
    private lateinit var mRootView: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mRootView = LinearLayout(this)
        mRootView.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT)
        setContentView(mRootView)
        isX5 = WebViewManager.isX5Core()
        if (!isX5) {
            mWebViewAndroid = AndroidWebView(this)
            mRootView.addView(mWebViewAndroid)
        } else {
            mWebViewX5Chrome = X5Chrome(this)
            mRootView.addView(mWebViewX5Chrome)
        }
        this.initData()
    }

    /**
     * Initialize the basic data.
     */
    private fun initData() {
        val loadUrl = intent?.getStringExtra(LOAD_URL_KEY) ?: return
        if (isX5) mWebViewX5Chrome?.loadUrl(loadUrl)
        else mWebViewAndroid?.loadUrl(loadUrl)
    }

    /**
     * When exit this activity,we should destroy the webView.
     */
    override fun onDestroy() {
        mWebViewAndroid?.destroy()
        mWebViewAndroid = null
        mWebViewX5Chrome?.destroy()
        mWebViewX5Chrome = null
        super.onDestroy()
    }

    override fun finish() {
        super.finish()
        overridePendingTransition(R.anim.anim_app_stay, R.anim.anim_app_u2d)
    }

    /**
     * const value
     */
    companion object {
        const val LOAD_URL_KEY = "load_url"
    }
}