package com.kuplay.kuplay.base

import android.app.Application
import android.graphics.Bitmap
import android.graphics.Canvas
import android.util.Log
import android.widget.RelativeLayout
import com.kuplay.kuplay.common.js.JSBridge
import com.kuplay.kuplay.common.js.JSEnv
import com.kuplay.kuplay.common.js.JSIntercept
import com.kuplay.kuplay.module.WebViewManager
import com.kuplay.kuplay.util.WebViewUtil
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome
import com.tencent.smtt.sdk.QbSdk
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

class YNWebView {
    var mAndroidWebView: AndroidWebView? = null
    var mX5: X5Chrome? = null

    //创建YNWebView
    fun createYnWebView(baseActivity: BaseActivity){
        if (isX5) mX5 = X5Chrome(baseActivity)
        else mAndroidWebView = AndroidWebView(baseActivity)
    }

    //销毁YNWebView
    fun destroyYnWebView(){
        if (isX5) mX5?.destroy()
        else mAndroidWebView?.destroy()
    }


    fun setJEN(){
        if (mX5 != null) {

            JSEnv.setEnv(JSEnv.WEBVIEW, mX5 as X5Chrome)
        } else {
            JSEnv.setEnv(JSEnv.WEBVIEW, mAndroidWebView as Any)
        }
    }

    fun loadURL(url: String, extraHeaders: HashMap<String, String>){
        if (isX5) mX5?.loadUrl(url, extraHeaders)
        else mAndroidWebView?.loadUrl(url, extraHeaders)
    }

    fun loadDataWithBaseUrl(url: String, content: String){
        if (isX5) mX5?.loadDataWithBaseURL(url, content, "text/html", "utf8", url);
        else mAndroidWebView?.loadDataWithBaseURL(url, content, "text/html", "utf8", url);
    }



    //js

    fun addYnWebView(mRlRootView: RelativeLayout){
        mRlRootView.addView(if (isX5) mX5 else mAndroidWebView)
    }

    fun addNewJavaScript(mActivity: BaseActivity, mRlRootView: RelativeLayout, tag: String, url: String, content: String){
        if (isX5) {
            mX5!!.addJavascriptInterface(JSBridge(mX5!!, mActivity), JSBridge::class.java.simpleName)
            mX5!!.addJavascriptInterface(JSIntercept(mActivity, mX5 as Any), JSIntercept::class.java.simpleName)
            X5Chrome.sViewRoot.add(mRlRootView)
            WebViewManager.addWebView(tag, mX5!!)
            mX5!!.setInjectContent(url, content)
        } else {
            mAndroidWebView!!.addJavascriptInterface(JSBridge(mAndroidWebView!!, mActivity), JSBridge::class.java.simpleName)
            mAndroidWebView!!.addJavascriptInterface(JSIntercept(mActivity, mAndroidWebView as Any), JSIntercept::class.java.simpleName)
            AndroidWebView.sViewRoot.add(mRlRootView)
            WebViewManager.addWebView(tag, mAndroidWebView!!)
            mAndroidWebView!!.setInjectContent(url, content)
        }
    }

    fun addJavaScriptInterface(activity: BaseActivity, mRlRootView: RelativeLayout): JSIntercept{
        lateinit var mJsIntercept: JSIntercept
        if (isX5) {
            mJsIntercept = JSIntercept(activity, mX5 as Any)
            mX5?.addJavascriptInterface(JSBridge(mX5!!, activity), JSBridge::class.java.simpleName)
            mX5?.addJavascriptInterface(mJsIntercept, JSIntercept::class.java.simpleName)
            X5Chrome.sViewRoot.add(mRlRootView)
            WebViewManager.addWebView("default", mX5!!)
        } else {
            mJsIntercept = JSIntercept(activity, mAndroidWebView as Any)
            mAndroidWebView?.addJavascriptInterface(JSBridge(mAndroidWebView!!, activity), JSBridge::class.java.simpleName)
            mAndroidWebView?.addJavascriptInterface(mJsIntercept, JSIntercept::class.java.simpleName)
            AndroidWebView.sViewRoot.add(mRlRootView)
            WebViewManager.addWebView("default", mAndroidWebView!!)
        }
        return mJsIntercept
    }


    fun evaluateJavascript(format: String){
        if (isX5) mX5?.evaluateJavascript(format, null)
        else mAndroidWebView?.evaluateJavascript(format, null)
    }



    companion object {
        var isX5 = false

        //判断是否使用X5浏览器
        fun getX5Open(sAppCtx: Application) {

            //读取文件，如果文件不存在打开WebView判断版本号，如果文件存在，读取文件内容（获取文件更新时间，超过30天重新写文件）
            val mBootPath = "/data/data/" + sAppCtx.packageName
            val filePath = "x5file.txt"
            val f = File(mBootPath,filePath)
            if (f.exists()){
                //获取文件修改时间
                val time = f.lastModified()
                val formatter = SimpleDateFormat("MM")
                val filemonth = formatter.format(time)
                Log.d("file",filemonth)
                //获取
                val nowTime = System.currentTimeMillis()
                val nowmonth = formatter.format(nowTime)
                Log.d("file",nowmonth)
                //如果在当月就读取文件内容，如果不在就查询
                if (nowmonth.equals(filemonth)){
                    val contents = f.readText()
                    println(contents)
                    isX5 = contents.equals("true")
                    Log.d("file", isX5.toString())
                }else{
                    x5Read(sAppCtx)
                }

            }else{
                Log.d("file", "file not exit")
                x5Read(sAppCtx)
            }

            if (isX5) {
                QbSdk.initX5Environment(sAppCtx, object : QbSdk.PreInitCallback {
                    override fun onViewInitFinished(isX5Core: Boolean) {}
                    override fun onCoreInitFinished() {}
                })
            }

        }

        fun x5Read(sAppCtx: Application){
            isX5 = !WebViewUtil.shouldUseAndroidWebView(android.webkit.WebView(sAppCtx), sAppCtx)
            //将结果写入文件
            val mBootPath = "/data/data/" + sAppCtx.packageName
            val filePath = "x5file.txt"
            val f = File(mBootPath,filePath)
            if (isX5) f.writeText("true")
            else f.writeText("false")
        }



        //前后台
        fun backFrontgrandEvn(format: String){
            if (YNWebView.isX5) {
                val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as X5Chrome
                webView.evaluateJavascript(format, null)
            } else {
                val webView = JSEnv.getEnv(JSEnv.WEBVIEW) as AndroidWebView
                webView.evaluateJavascript(format, null)
            }
        }

        fun evaLua(webView: Any, format: String){
            if (isX5) {
                (webView as X5Chrome).evaluateJavascript(format, null)
            } else {
                (webView as AndroidWebView).evaluateJavascript(format, null)
            }
        }

    }
}