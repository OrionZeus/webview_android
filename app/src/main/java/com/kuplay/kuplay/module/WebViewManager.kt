package com.kuplay.kuplay.module

import android.content.Context
import android.content.Intent
import android.text.TextUtils
import android.webkit.WebView

import com.kuplay.kuplay.R
import com.kuplay.kuplay.app.MainActivity
import com.kuplay.kuplay.app.NewWebViewActivity
import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.util.ViewUtil
import com.kuplay.kuplay.widget.AndroidWebView
import com.kuplay.kuplay.widget.X5Chrome

import org.json.JSONObject

import java.io.BufferedWriter
import java.io.File
import java.io.FileWriter
import java.io.IOException
import java.util.HashMap

internal class FreeWebView(private val view: Any, private val isX5: Boolean) : Runnable {

    override fun run() {
        if (isX5) {
            (view as X5Chrome).destroy()
        } else {
            (view as AndroidWebView).destroy()
        }
    }
}

internal class NewWebView(private val context: Context, private val isX5: Boolean, private val webViewName: String, private val url: String, private val headers: Map<*, *>) : Runnable {

    override fun run() {
        if (isX5) {
            val view = X5Chrome(this.context, null)
            WebViewManager.addWebView(this.webViewName, view)
            view.loadUrl(this.url, this.headers as MutableMap<String, String>?)
        } else {
            val view = AndroidWebView(this.context, null)
            WebViewManager.addWebView(this.webViewName, view)
            view.loadUrl(this.url, this.headers as MutableMap<String, String>?)
        }
    }
}

/**
 * Created by iqosjay@gmail.com on 2018/11/7
 */
class WebViewManager : BaseJSModule() {

    /**
     * Get the webView's name by webView.
     *
     * @return The name of webView.
     */
    private val nameByWebViewObj: String?
        get() {
            val obj = webView
            val entries = WEB_VIEW_FORM.entries
            for ((key, value) in entries) {
                if (obj == value) {
                    return key
                }
            }
            return null
        }

    /**
     * 新开webview，但不显示出来
     * @param callbackId
     * @param webViewName
     * @param url
     * @param headers，以 key1:value1 key2:value2 方式传递
     */
    fun newView(callbackId: Int, webViewName: String, url: String, headers: String) {

        if (TextUtils.isEmpty(webViewName)) {
            JSCallback.throwJS(activity, webView,
                    WebViewManager::class.java.simpleName, "newView", "The WebView's name can't be null.")
            return
        }

        if (TextUtils.isEmpty(url)) {
            JSCallback.throwJS(activity, webView,
                    WebViewManager::class.java.simpleName, "newView", "The url can't be null.")
            return
        }

        if (isWebViewNameExists(webViewName)) {
            JSCallback.throwJS(activity, webView,
                    WebViewManager::class.java.simpleName, "newView", "WebView name is exist.")
            return
        }

        val extraHeaders = mutableMapOf<Any, Any>()
        try {
            val obj = JSONObject(headers)
            val keysItr = obj.keys()
            while (keysItr.hasNext()) {
                val key = keysItr.next()
                extraHeaders.put(key, obj.getString(key))
            }
        } catch (e: Exception) {

        }

        val isX5 = webView is X5Chrome
        activity.runOnUiThread(NewWebView(activity.applicationContext, isX5, webViewName, url, extraHeaders))
        JSCallback.callJS(activity, webView, callbackId, JSCallback.SUCCESS, null!!)
    }

    fun freeView(callbackId: Int, webViewName: String) {
        try {
            if ("default" == webViewName) {
                JSCallback.throwJS(activity, webView,
                        WebViewManager::class.java.simpleName, "freeView", "The default WebView couldn't remove,please select a new one.")
                return
            }

            if (!isWebViewNameExists(webViewName)) {
                return
            }

            val view = WebViewManager.getWebView(webViewName)
            activity.runOnUiThread(FreeWebView(view!!, view is X5Chrome))
            WebViewManager.removeWebView(webViewName)
        } catch (e: Exception) {
            e.printStackTrace()
        }

        JSCallback.callJS(activity, webView, callbackId, JSCallback.SUCCESS, emptyArray())
    }

    /**
     * Open a new WebView to display a web page.
     *
     * @param callbackId  TS callbackId.
     * @param webViewName This is both name and key for the new webView,
     * you could called[.closeWebView] with this key
     * after opened the webView.
     * @param url         The web page's url.
     * @param title       The title what would you like to show in the new View.
     */
    fun openWebView(callbackId: Int, webViewName: String, url: String, title: String, injectContent: String) {

        if (TextUtils.isEmpty(webViewName)) {
            JSCallback.throwJS(activity, webView,
                    WebViewManager::class.java.simpleName, "openWebView", "The WebView's name can't be null.")
            return
        }
        if (TextUtils.isEmpty(url)) {
            JSCallback.throwJS(activity, webView,
                    WebViewManager::class.java.simpleName, "openWebView", "The url can't be null.")
            return
        }
        if (isWebViewNameExists(webViewName)) {
            JSCallback.throwJS(activity, webView,
                    WebViewManager::class.java.simpleName, "openWebView", "WebView name is exist.")
        } else {
            val file = File(ctx!!.cacheDir, "new_webview_inject")
            try {
                val bw = BufferedWriter(FileWriter(file))
                bw.write(injectContent)
                bw.close()
            } catch (e: IOException) {
                e.printStackTrace()
            }

            val intent = Intent(ctx, NewWebViewActivity::class.java)
            intent.putExtra("inject", file.absolutePath)
            intent.putExtra("title", title)
            intent.putExtra("load_url", url)
            intent.putExtra("tag", webViewName)

            ctx!!.startActivity(intent)
        }
    }

    /**
     * Close the specified WebView.
     *
     * @param callbackId  TS callbackId.
     * @param webViewName WebView's name.
     */
    fun closeWebView(callbackId: Int, webViewName: String) {
        if ("default" == webViewName) {
            JSCallback.throwJS(activity, webView,
                    WebViewManager::class.java.simpleName, "closeWebView", "The default WebView couldn't remove,please select a new one.")
            return
        }
        if (!isWebViewNameExists(webViewName)) {
            return
        }
        sendCloseWebViewMessage(webViewName)
    }

    /**
     * Send a message to the web page view with the specified name.
     *
     * @param webViewName The name of WebView which you want send message to.
     * @param message     The message what you would like to send.
     */
    fun postWebViewMessage(callbackId: Int, webViewName: String, message: String) {
        if (!isWebViewNameExists(webViewName)) {
            JSCallback.throwJS(activity, webView,
                    WebViewManager::class.java.simpleName, "postWebViewMessage", "The WebView's name is not exists.")
            return
        }
        val fromWebView = nameByWebViewObj
        val intent = Intent("send_message$webViewName")
        intent.putExtra("message", message)
        intent.putExtra("from_web_view", fromWebView)
        ctx!!.sendBroadcast(intent)
    }

    fun getScreenModify(callbackId: Int) {
        //ViewUtil.getNavigationBarHeight(getActivity())
        //DisplayCutout displayCutout = decorView.getRootWindowInsets().getDisplayCutout();
        val high = ViewUtil.getStatusBarHeight(activity)
        JSCallback.callJS(activity, webView, callbackId, JSCallback.SUCCESS, arrayOf(high,0))
    }

    /**
     * Close the WebView by webView's name.Finished by send broadcast,
     * because in this way, the coupling is the lowest.
     *
     * @param webViewName WebView's name.
     */
    private fun sendCloseWebViewMessage(webViewName: String) {
        val intent = Intent("close_web_view")
        intent.putExtra("web_view_name", webViewName)
        ctx!!.sendBroadcast(intent)
    }

    /**
     * Check whether the name of webView is exists.
     *
     * @param webViewName The name of webView
     * @return true for the name has been exists.
     */
    private fun isWebViewNameExists(webViewName: String): Boolean {
        for (key in WEB_VIEW_FORM.keys) {
            if (webViewName == key) {
                return true
            }
        }
        return false
    }

    companion object {
        /**
         * All WebViews that have been opened.
         */
        private val WEB_VIEW_FORM = HashMap<String, Any>()

        /**
         * Add WebView.
         *
         * @param key    WebView's name.
         * @param object WebView:X5 or Android
         */
        fun addWebView(key: String, `object`: Any) {
            WEB_VIEW_FORM[key] = `object`
        }

        /**
         * Remove WebView by its name.
         *
         * @param key WebView's name
         */
        fun removeWebView(key: String) {
            WEB_VIEW_FORM.remove(key)
        }

        fun getWebView(key: String): Any? {
            return WEB_VIEW_FORM[key]
        }
    }
}
