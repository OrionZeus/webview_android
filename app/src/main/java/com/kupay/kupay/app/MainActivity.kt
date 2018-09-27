package com.kupay.kupay.app

import android.content.Intent
import android.widget.RelativeLayout
import com.kupay.kupay.R
import com.kupay.kupay.base.BaseActivity
import com.kupay.kupay.base.BaseWebView
import com.kupay.kupay.common.js.JSBridge
import com.kupay.kupay.common.js.JSEnv
import com.kupay.kupay.common.js.JSIntercept
import com.kupay.kupay.widget.AndroidWebView
import com.kupay.kupay.widget.X5Chrome
import java.util.*

class MainActivity : BaseWebView() {
    private lateinit var mRlRootView: RelativeLayout
    /**
     * Get the layout resource from XML.
     *
     * @return layout resource from XML.
     */
    override val layoutResources: Int get() = R.layout.activity_main

    /**
     * As the method name said,this method is used to initialize views on this activity.
     */
    override fun initViews() {
        mRlRootView = findViewById(R.id.app_main_rl_root_view)
        mRlRootView.removeAllViews()
        mRlRootView.addView(if (isX5) mX5 else mAndroidWebView)
    }

    /**
     * Initialize basic data.
     */
    override fun initData() {
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
        super.loadUrl(resources.getString(URL_RES_ID))//必须放在addJavascriptInterface()下面
    }

    override fun onBackPressed() {
        if (isX5) mX5?.evaluateJavascript(String.format(BaseActivity.JS_CALLBACK, BaseActivity.ON_BACK_PRESSED), null)
        else mAndroidWebView?.evaluateJavascript(String.format(BaseActivity.JS_CALLBACK, BaseActivity.ON_BACK_PRESSED), null)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        JSEnv.getJsImpl()?.onActivityResult(requestCode, resultCode, data)
        super.onActivityResult(requestCode, resultCode, data)
    }

    companion object {
        const val APP_RESULT_CODE = 912
        //        const val URL = "http://47.75.254.166:8080/wallet/app/boot/index.html"
        //        const val URL = "http://192.168.33.113/wallet/app/boot/index.html"
        const val URL_RES_ID = R.string.init_url
        //        const val URL = "https://www.baidu.com"
    }
}
