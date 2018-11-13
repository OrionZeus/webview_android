package com.kuplay.kuplay.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.view.WindowManager
import android.widget.RelativeLayout
import com.kuplay.kuplay.R
import com.kuplay.kuplay.base.BaseActivity
import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.common.js.JSBridge
import com.kuplay.kuplay.common.js.JSEnv
import com.kuplay.kuplay.common.js.JSIntercept
import com.kuplay.kuplay.module.LocalLanguageMgr
import com.kuplay.kuplay.module.WebViewManager
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
            mX5?.addJavascriptInterface(JSBridge(mX5, this), JSBridge::class.java.simpleName)
            mX5?.addJavascriptInterface(JSIntercept(), JSIntercept::class.java.simpleName)
            X5Chrome.sViewRoot.add(mRlRootView)
            WebViewManager.addWebView("default", mX5)
        } else {
            mAndroidWebView?.addJavascriptInterface(JSBridge(mAndroidWebView, this), JSBridge::class.java.simpleName)
            mAndroidWebView?.addJavascriptInterface(JSIntercept(), JSIntercept::class.java.simpleName)
            AndroidWebView.sViewRoot.add(mRlRootView)
            WebViewManager.addWebView("default", mAndroidWebView)
        }
        super.addJEV()
        LocalLanguageMgr().setAppLanguage(0, PrefMgr.getInstance(this).appLan)
        super.loadUrl(resources.getString(URL_RES_ID))//必须放在addJavascriptInterface()下面
        registerBc()
    }

    override fun onBackPressed() {
        if (isX5) mX5?.evaluateJavascript(String.format(BaseActivity.JS_CALLBACK, BaseActivity.ON_BACK_PRESSED), null)
        else mAndroidWebView?.evaluateJavascript(String.format(BaseActivity.JS_CALLBACK, BaseActivity.ON_BACK_PRESSED), null)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        JSEnv.getJsImpl()?.onActivityResult(requestCode, resultCode, data)
        super.onActivityResult(requestCode, resultCode, data)
    }

    private fun registerBc() {
        val intentFilter = IntentFilter()
        intentFilter.addAction("send_messagedefault")
        registerReceiver(mReceiver, intentFilter)
    }

    private val mReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            val action = intent?.action ?: return
            when (action) {
                "send_messagedefault" -> {
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
        unregisterReceiver(mReceiver)
        super.onDestroy()
    }

    companion object {
        const val APP_RESULT_CODE = 912
        //        const val URL = "http://47.75.254.166:8080/wallet/app/boot/index.html"
        //        const val URL = "http://192.168.33.113/wallet/app/boot/index.html"
        const val URL_RES_ID = R.string.init_url
        //        const val URL = "https://www.baidu.com"
    }
}
