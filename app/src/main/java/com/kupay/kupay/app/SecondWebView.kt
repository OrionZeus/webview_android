package com.kupay.kupay.app

import com.kupay.kupay.R
import com.kupay.kupay.base.BaseWebViewActivity

/**
 * Created by "iqos_jay@outlook.com" on 2018/9/11.
 */
class SecondWebView : BaseWebViewActivity() {
    /**
     * Get the layout resource from XML.
     *
     * @return layout resource from XML.
     */
    override fun getLayoutResources(): Int = R.layout.activity_main

    /**
     * Connect time out.
     */
    override fun onLoadTimeOut() {
    }

    /**
     * As the method name said,this method is used to initialize views on this activity.
     */
    override fun initViews() {
    }

    /**
     * Initialize basic data.
     */
    override fun init() {
    }

    /**
     * The webView load content success.
     */
    override fun onLoadFinished() {
    }

}