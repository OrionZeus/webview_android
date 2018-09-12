package com.kupay.kupay.base

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.text.TextUtils
import android.widget.Toast

import com.kupay.kupay.common.js.JSEnv
import com.kupay.kupay.util.Logger
import com.kupay.kupay.util.ToastManager

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/25.
 * BaseActivity
 */
abstract class BaseActivity : AppCompatActivity(), BaseView {
    var isHome: Boolean = false

    /**
     * Get the layout resource from XML.
     *
     * @return layout resource from XML.
     */
    protected abstract val layoutResources: Int

    /**
     * mBackgroundReceiver is a listener to listen the application's lifecycle
     * when user lock the screen and press home key,the event will be push to ts.
     */
    private val mBackgroundReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val action = intent.action
            if (TextUtils.isEmpty(action)) return
            when (action) {
                //亮屏
                Intent.ACTION_SCREEN_ON -> gotoBackground()
                //锁屏
                Intent.ACTION_SCREEN_OFF -> {
                }
                //解锁屏幕
                Intent.ACTION_USER_PRESENT -> gotoForeground()
                Intent.ACTION_CLOSE_SYSTEM_DIALOGS -> {
                    val reason = intent.getStringExtra(SYSTEM_DIALOG_REASON_KEY)
                    if (null != reason) {
                        if (reason == SYSTEM_DIALOG_REASON_HOME_KEY) {
                            if (isHome) return
                            isHome = true
                            gotoBackground()
                        }
                    }
                }
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (NO_LAYOUT != layoutResources) {
            setContentView(layoutResources)
            this.initViews()
        }
        registerAppLifeListener()
        this.init()
    }

    /**
     * As the method name said,this method is used to initialize views on this activity.
     */
    protected abstract fun initViews()

    /**
     * Initialize basic data.
     */
    protected abstract fun init()

    /**
     * Show the toast tip
     *
     * @param resId the message's id of what would you like to tip
     */
    override fun onToast(resId: Int) {
        this.onToast(resources.getString(resId))
    }

    /**
     * Show the toast tip
     *
     * @param msg the message of what would you like to tip
     */
    override fun onToast(msg: String) {
        this.onToast(msg, Toast.LENGTH_SHORT)
    }

    /**
     * Show the toast tip
     *
     * @param msg      the message of what would you like to tip
     * @param duration the message last time.
     */
    override fun onToast(msg: String, @ToastManager.Duration duration: Int) {
        ToastManager.toast(this, msg, duration)
    }

    /**
     * Show the toast tip
     *
     * @param msg      the message's id of what would you like to tip.
     * @param duration the message last time.
     */
    override fun onToast(msg: Int, duration: Int) {
        this.onToast(resources.getString(msg), duration)
    }

    /**
     * Hide the content being prompted.
     */
    override fun onHideToast() {
        ToastManager.hideToast()
    }

    /**
     * Register the broadcast receiver.
     */
    private fun registerAppLifeListener() {
        val filter = IntentFilter()
        filter.addAction(Intent.ACTION_SCREEN_ON)//亮屏
        filter.addAction(Intent.ACTION_SCREEN_OFF)//锁屏
        filter.addAction(Intent.ACTION_USER_PRESENT)//解锁屏幕
        filter.addAction(Intent.ACTION_CLOSE_SYSTEM_DIALOGS)
        registerReceiver(mBackgroundReceiver, filter)
    }

    /**
     * App已经进入后台
     */
    private fun gotoBackground() {
        Logger.error("BaseActivity", "App进入后台")
        try {
            val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as android.webkit.WebView
            webView.evaluateJavascript(String.format(JS_CALLBACK, ON_APP_PAUSED), null)
        } catch (e: ClassCastException) {
            val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as com.tencent.smtt.sdk.WebView
            webView.evaluateJavascript(String.format(JS_CALLBACK, ON_APP_PAUSED), null)
            e.printStackTrace()
        }

    }

    /**
     * App进入前台
     */
    private fun gotoForeground() {
        Logger.error("BaseActivity", "App进入前台")
        try {
            val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as android.webkit.WebView
            webView.evaluateJavascript(String.format(JS_CALLBACK, ON_APP_RESUMED), null)
        } catch (e: ClassCastException) {
            val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as com.tencent.smtt.sdk.WebView
            webView.evaluateJavascript(String.format(JS_CALLBACK, ON_APP_RESUMED), null)
            e.printStackTrace()
        }

    }

    companion object {
        const val JS_CALLBACK = "handle_app_lifecycle_listener('%s')"
        private const val ON_APP_RESUMED = "onAppResumed"
        private const val ON_APP_PAUSED = "onAppPaused"
        const val ON_BACK_PRESSED = "onBackPressed"
        private const val SYSTEM_DIALOG_REASON_KEY = "reason"
        private const val SYSTEM_DIALOG_REASON_HOME_KEY = "homekey"
        const val APP_RESULT_CODE = 134
        protected const val NO_LAYOUT = -1//No Layout Resources.
    }
}

