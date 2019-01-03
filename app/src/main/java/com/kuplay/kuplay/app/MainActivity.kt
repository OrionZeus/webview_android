package com.kuplay.kuplay.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.util.Log
import android.view.WindowManager
import android.widget.RelativeLayout
import com.kuplay.kuplay.R
import com.kuplay.kuplay.base.BaseActivity
import com.kuplay.kuplay.base.BaseWebView
import com.kuplay.kuplay.common.js.JSBridge
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.common.js.JSEnv
import com.kuplay.kuplay.common.js.JSIntercept
import com.kuplay.kuplay.module.LocalLanguageMgr
import com.kuplay.kuplay.module.WebViewManager
import com.kuplay.kuplay.util.FileUtil
import com.kuplay.kuplay.util.PrefMgr
import com.kuplay.kuplay.util.ViewUtil
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome
import kotlinx.android.synthetic.main.layout_fake_status_bar_view.*
import java.io.File

class MainActivity : BaseWebView() {
    private lateinit var mJsIntercept: JSIntercept
    private lateinit var mRlRootView: RelativeLayout

    /**
     * Get the layout resource from XML.
     *
     * @return layout resource from XML.
     */
    override val layoutResources: Int get() = R.layout.activity_main

    override fun onCreate(savedInstanceState: Bundle?) {
        ynWebView.createYnWebView(this)
        super.onCreate(savedInstanceState)


    }


    /**
     * As the method name said,this method is used to initialize views on this activity.
     */
    override fun initViews() {

        mRlRootView = findViewById(R.id.app_main_rl_root_view)
        mRlRootView.removeAllViews()
        ynWebView.addYnWebView(mRlRootView)
        status_bar.layoutParams.height = ViewUtil.getStatusBarHeight(this).toInt()
//        AndroidBug5497Workaround.assistActivity(this)
    }

    /**
     * Initialize basic data.
     */
    override fun initData() {
        window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)// 在setContentView之后，适配顶部状态栏
        window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)// 适配底部导航栏
        mJsIntercept = ynWebView.addJavaScriptInterface(this,mRlRootView)
        super.addJEV()
        LocalLanguageMgr().setAppLanguage(PrefMgr.getInstance(this).appLan,callBack = {callType, prames -> JSCallback.callJS(null, null, 0, callType, prames) })

        var url = resources.getString(URL_RES_ID)
        if (url.startsWith("/")) {
            var content = FileUtil.readFile(mJsIntercept.bootPath + url)
            if (content == "") {
                val stream = this.getAssets().open(url.substring(1))
                content = FileUtil.readFile(stream)
            }
            if (content != "") {
                super.loadDataWithBaseUrl("file:///android_asset" + url, content);
            } else {
                Log.d("JSIntercept", "loadUrl Error!!!");
            }
        } else {
            super.loadUrl(url)
        }
        registerBc()
    }

    override fun onBackPressed() {
        ynWebView.evaluateJavascript(String.format(BaseActivity.JS_CALLBACK, BaseActivity.ON_BACK_PRESSED))
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        JSEnv.jsImpl?.onActivityResult(requestCode, resultCode, data!!)
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
                    ynWebView.evaluateJavascript(callFun)
                }
            }
        }
    }

    override fun onDestroy() {
        unregisterReceiver(mReceiver)
        super.onDestroy()
    }

    override fun onResume() {
        addJEV()
        super.onResume()
    }

    companion object {
        const val APP_RESULT_CODE = 912
        //        const val URL = "http://47.75.254.166:8080/wallet/app/boot/index.html"
        //        const val URL = "http://192.168.33.113/wallet/app/boot/index.html"
        const val URL_RES_ID = R.string.init_url
        //        const val URL = "https://www.baidu.com"
    }
}
