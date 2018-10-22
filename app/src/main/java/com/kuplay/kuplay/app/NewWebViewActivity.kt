package com.kuplay.kuplay.app

import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.RelativeLayout
import android.widget.TextView
import com.kuplay.kuplay.R
import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.common.js.JSBridge
import com.kuplay.kuplay.common.js.JSIntercept
import com.kuplay.kuplay.util.ViewUtil
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome
import kotlinx.android.synthetic.main.layout_fake_status_bar_view.*

class NewWebViewActivity : BaseWebView() {
    private lateinit var mRlRootView: RelativeLayout
    private lateinit var mIvBack: ImageView
    private lateinit var mTvTitle: TextView
    private lateinit var mVStatusBar: View
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
        mVStatusBar = findViewById(R.id.app_new_web_view_v_status)
        mRlRootView.removeAllViews()
        mRlRootView.addView(if (isX5) mX5 else mAndroidWebView)
        status_bar.layoutParams.height = ViewUtil.getStatusBarHeight(this).toInt()
    }

    /**
     * Initialize basic data.
     */
    override fun initData() {
        mTvTitle.text = intent?.getStringExtra("title")
        mVStatusBar.layoutParams = LinearLayout.LayoutParams(ViewUtil.getScreenWidth(this).toInt(), ViewUtil.getStatusBarHeight(this).toInt())
        mIvBack.setOnClickListener { onBackPressed() }
        if (isX5) {
            mX5?.addJavascriptInterface(JSBridge(), JSBridge::class.java.simpleName)
            mX5?.addJavascriptInterface(JSIntercept(), JSIntercept::class.java.simpleName)
            X5Chrome.sViewRoot.add(mRlRootView)
        } else {
            mAndroidWebView?.addJavascriptInterface(JSBridge(), JSBridge::class.java.simpleName)
            mAndroidWebView?.addJavascriptInterface(JSIntercept(), JSIntercept::class.java.simpleName)
            AndroidWebView.sViewRoot.add(mRlRootView)
        }
        super.addJEV()
        super.loadUrl(intent?.getStringExtra("load_url") ?: "https://cn.bing.com")
    }

}
