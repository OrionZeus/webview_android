package com.kupay.kupay.app

import android.support.design.widget.Snackbar
import android.view.View
import android.widget.RelativeLayout
import com.kupay.kupay.R
import com.kupay.kupay.base.BaseWebViewActivity
import com.kupay.kupay.module.WebViewHelper.Companion.LOAD_URL_KEY

class DetailDesWebView : BaseWebViewActivity() {
    private lateinit var mVStatus: View
    private lateinit var mRlView: RelativeLayout

    /**
     * Get the layout resource from XML.
     *
     * @return layout resource from XML.
     */
    override val layoutResources: Int get() = R.layout.activity_detail_des_web_view

    /**
     * As the method name said,this method is used to initialize views on this activity.
     */
    override fun initViews() {
        mVStatus = findViewById(R.id.app_detail_des_wv_v_status)
        mRlView = findViewById(R.id.app_detail_des_wv_rl_wev_content)
    }

    /**
     * Initialize basic data.
     */
    override fun initData() {
        super.createWebView()
        mRlView.addView(mWebView)
        val loadUrl = intent?.getStringExtra(LOAD_URL_KEY) ?: return
        super.loadUrlIntoWebView(loadUrl)
        this.onLoadFinished()
    }

    /**
     * The webView load content success.
     */
    override fun onLoadFinished() {
        Snackbar.make(mRlView, R.string.tip_web_view_load_failed, Snackbar.LENGTH_SHORT).show()
    }

    /**
     * Connect time out.
     */
    override fun onLoadTimeOut() {
        onToast(R.string.tip_web_view_connect_time_out)
    }

    /**
     * 重写此方法让Activity的退出方式是从上到下退出
     */
    override fun finish() {
        setResult(APP_RESULT_CODE, intent)
        super.finish()
        overridePendingTransition(R.anim.anim_app_stay, R.anim.anim_app_u2d)
    }

}
