package com.kuplay.kuplay.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.widget.ImageView
import android.widget.RelativeLayout
import android.widget.TextView
import com.kuplay.kuplay.R
import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.common.js.JSBridge
import com.kuplay.kuplay.common.js.JSIntercept
import com.kuplay.kuplay.module.WebViewManager
import com.kuplay.kuplay.util.ViewUtil
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome
import kotlinx.android.synthetic.main.layout_fake_status_bar_view.*

class NewWebViewActivity : BaseWebView() {
    private lateinit var mRlRootView: RelativeLayout
    private lateinit var mIvBack: ImageView
    private lateinit var mTvTitle: TextView
    private var tag: String? = null
    /**
     * Get the layout resource from XML.
     *
     * @return layout resource from XML.
     */
    override val layoutResources: Int get() = R.layout.activity_new_web_view

    /**
     * As the method name said,this method is used to initialize views on this activity.
     */
    override fun initViews() {
        mRlRootView = findViewById(R.id.app_new_web_view_rl_root_view)
        mIvBack = findViewById(R.id.app_new_web_view_activity_iv_back)
        mTvTitle = findViewById(R.id.app_new_web_view_activity_tv_title)
        mRlRootView.removeAllViews()
        mRlRootView.addView(if (isX5) mX5 else mAndroidWebView)
        status_bar.layoutParams.height = ViewUtil.getStatusBarHeight(this).toInt()
    }

    /**
     * Initialize basic data.
     */
    override fun initData() {
        mTvTitle.text = intent?.getStringExtra("title")
        tag = intent?.getStringExtra("tag")
        if (null == tag) throw Exception("The tag can't be null!")
        mIvBack.setOnClickListener { onBackPressed() }
        if (isX5) {
            mX5?.addJavascriptInterface(JSBridge(mX5), JSBridge::class.java.simpleName)
            mX5?.addJavascriptInterface(JSIntercept(), JSIntercept::class.java.simpleName)
            X5Chrome.sViewRoot.add(mRlRootView)
            WebViewManager.addWebView(tag, mX5)
        } else {
            mAndroidWebView?.addJavascriptInterface(JSBridge(mAndroidWebView), JSBridge::class.java.simpleName)
            mAndroidWebView?.addJavascriptInterface(JSIntercept(), JSIntercept::class.java.simpleName)
            AndroidWebView.sViewRoot.add(mRlRootView)
            WebViewManager.addWebView(tag, mAndroidWebView)
        }
        super.addJEV()
        super.loadUrl(intent?.getStringExtra("load_url") ?: "https://cn.bing.com")
        registerCloseReceiver()
    }


    private fun registerCloseReceiver() {
        val intentFilter = IntentFilter()
        intentFilter.addAction("close_web_view")
        intentFilter.addAction("send_message$tag")
        registerReceiver(mCloseReceiver, intentFilter)
    }

    private val mCloseReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            val action = intent?.action ?: return
            when (action) {
                "close_web_view" -> {
                    if (tag == intent.getStringExtra("web_view_name")) {
                        this@NewWebViewActivity.onBackPressed()
                    }
                }
                "send_message$tag" -> {
                    val message = intent.getStringExtra("message")
                    val sender = intent.getStringExtra("from_web_view")
                    val callFun = String.format("javascript:window.onWebViewPostMessage('%s','%s')", sender, message)
                    if (isX5) {
                        mX5?.evaluateJavascript(callFun, null)
                    } else {
                        mAndroidWebView?.evaluateJavascript(callFun, null)
                    }
                }
            }
        }
    }

    override fun onDestroy() {
        WebViewManager.removeWebView(tag)
        unregisterReceiver(mCloseReceiver)
        super.onDestroy()
    }


}
