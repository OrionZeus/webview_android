package com.kuplay.kuplay.app

import android.content.Intent
import android.view.View
import android.view.WindowManager
import android.widget.RelativeLayout
import com.kuplay.kuplay.R
import com.kuplay.kuplay.base.BaseActivity
import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.common.js.JSBridge
import com.kuplay.kuplay.common.js.JSEnv
import com.kuplay.kuplay.common.js.JSIntercept
import com.kuplay.kuplay.module.LocalLanguageMgr
import com.kuplay.kuplay.util.PrefMgr
import com.kuplay.kuplay.util.ViewUtil
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome
import kotlinx.android.synthetic.main.layout_fake_status_bar_view.*

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
        status_bar.layoutParams.height = ViewUtil.getStatusBarHeight(this).toInt()
//        AndroidBug5497Workaround.assistActivity(this)
    }

    /**
     * Initialize basic data.
     */
    override fun initData() {
        window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)// 在setContentView之后，适配顶部状态栏
        window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)// 适配底部导航栏
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
        LocalLanguageMgr().setMobileLanguage(0, PrefMgr.getInstance(this).appLan)
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

    fun setLanguage(v: View) {
    }

    companion object {
        const val APP_RESULT_CODE = 912
        //        const val URL = "http://47.75.254.166:8080/wallet/app/boot/index.html"
        //        const val URL = "http://192.168.33.113/wallet/app/boot/index.html"
        const val URL_RES_ID = R.string.init_url
        //        const val URL = "https://www.baidu.com"
    }
}
