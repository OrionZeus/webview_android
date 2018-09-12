package com.kupay.kupay.app

import android.app.ProgressDialog
import android.content.Intent
import android.support.v7.app.AlertDialog
import android.view.View
import android.view.WindowManager
import android.widget.LinearLayout
import android.widget.RelativeLayout
import com.airbnb.lottie.LottieAnimationView
import com.airbnb.lottie.LottieDrawable
import com.kupay.kupay.R
import com.kupay.kupay.base.BaseActivity
import com.kupay.kupay.base.BaseWebViewActivity
import com.kupay.kupay.common.js.JSEnv
import com.kupay.kupay.iview.AppView
import com.kupay.kupay.presenter.AppPresenter
import com.kupay.kupay.widget.AndroidWebView
import com.kupay.kupay.widget.X5Chrome

class App : BaseWebViewActivity(), AppView {

    private lateinit var mRlContent: RelativeLayout
    private lateinit var mLlAnim: LinearLayout
    private lateinit var mAnimView: LottieAnimationView
    private var mPdDldPro: ProgressDialog? = null
    private val presenter = AppPresenter(this)

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
        mRlContent = findViewById(R.id.app_main_rl_content)
        mLlAnim = findViewById(R.id.app_main_ll_anim_parent)
        mAnimView = findViewById(R.id.app_main_anim_view)
        initProgressDialog()
    }

    /**
     * Initialize the ProgressDialog,create a new one.
     */
    private fun initProgressDialog() {
        mPdDldPro = ProgressDialog(this)
        mPdDldPro?.setCancelable(false)
        mPdDldPro?.setTitle("请稍等")
        mPdDldPro?.setMessage("当前WebView版本太低，正在下载X5内核...")
        mPdDldPro?.max = 100
        mPdDldPro?.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL)
    }

    /**
     * Initialize basic data.
     */
    override fun init() {
        presenter.initView(this)
        super.createWebView()
        mRlContent.removeAllViews()
        mRlContent.addView(mWebView)
        AndroidWebView.sViewRoot.add(mRlContent)
        X5Chrome.sViewRoot.add(mRlContent)
    }


    /**
     * Show the download dialog.
     */
    override fun onShowDialog() {
        if (true == mPdDldPro?.isShowing)
            mPdDldPro?.show()
    }

    /**
     * Update X5Core's download Progress
     *
     * @param progress current progress
     */
    override fun onShowProgress(progress: Int) {
        mPdDldPro?.progress = progress
    }

    /**
     * show the animation from local json file.
     */
    override fun onShowAnim() {
        mAnimView.setAnimation(resources.getString(R.string.app_splash_anim_file_name))
        mAnimView.repeatCount = LottieDrawable.INFINITE
        mAnimView.playAnimation()
    }

    /**
     * Remove the ProgressDialog,cause is won't use any more.
     */
    override fun onRemoveProgressDialog() {
        mPdDldPro?.dismiss()
    }

    /**
     * Called when WebView load success.
     */
    override fun onCancelAnim() {
        mAnimView.cancelAnimation()
        mAnimView.visibility = View.GONE
        mLlAnim.visibility = View.GONE
    }

    /**
     * Take care of popping the fragment back stack or finishing the activity
     * as appropriate.
     */
    override fun onBackPressed() {
        try {
            val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as android.webkit.WebView
            webView.evaluateJavascript(String.format(BaseActivity.JS_CALLBACK, BaseActivity.ON_BACK_PRESSED), null)
        } catch (e: ClassCastException) {
            val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as com.tencent.smtt.sdk.WebView
            webView.evaluateJavascript(String.format(BaseActivity.JS_CALLBACK, BaseActivity.ON_BACK_PRESSED), null)
            e.printStackTrace()
        }

    }

    /**
     * setting x5 chrome's download progress,
     * there is a value for connect time out,
     * if the x5 chrome is in downloading,then will close the connect time out.
     *
     * @param downloading true:is downloading false : is not downloading
     */
    override fun onSetX5DownloadStatus(downloading: Boolean) {
        mX5Chrome?.setSetDownloadStatus(downloading)
    }

    /**
     * The webView load content success.
     */
    override fun onLoadFinished() {
        presenter.calculateTime()
    }

    /**
     * Connect time out.
     */
    override fun onLoadTimeOut() {
        try {
            AlertDialog.Builder(this)
                    .setTitle("提示")
                    .setMessage("您与服务器的连接已经超时")
                    .setCancelable(false)
                    .setPositiveButton("确定") { dialog, _ -> dialog.dismiss() }
                    .create()
                    .show()
        } catch (e: WindowManager.BadTokenException) {
            e.printStackTrace()
        }

    }

    /**
     * Dispatch incoming result to the correct fragment.
     *
     * @param requestCode request code
     * @param resultCode  the code of result,this mark is set by user,this will be used as mark.
     * @param data        Callback data from last Activity.
     */
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        super.onActivityResult(requestCode, resultCode, data)
        val jsImpl = JSEnv.getJsImpl()
        jsImpl?.onActivityResult(requestCode, resultCode, data)
        /*if (QRCodeEnable) {
            IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
            if (result == null || result.getContents() == null) {
                JSCallback.callJS(JSQRCodeScanCallBackID, JSCallback.FAIL, "null");
                super.onActivityResult(requestCode, resultCode, data);
            } else {
                JSCallback.callJS(JSQRCodeScanCallBackID, JSCallback.SUCCESS, result.getContents());
            }
        }*/
    }

    companion object {
        private val TAG = "App"
    }


}