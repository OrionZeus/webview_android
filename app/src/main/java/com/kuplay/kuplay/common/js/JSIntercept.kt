package com.kuplay.kuplay.common.js

import android.app.Activity
import android.app.Application
import android.content.Context
import android.content.Intent
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.util.Base64
import android.util.Log
import android.webkit.JavascriptInterface

import com.kuplay.kuplay.app.App
import com.kuplay.kuplay.module.AppUpdater
import com.kuplay.kuplay.service.RestartService
import com.kuplay.kuplay.util.FileUtil

import org.json.JSONException
import org.json.JSONObject

import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.nio.file.Path

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 * Android and js bridging files for js call the local underlying method.
 */
class JSIntercept(private val mActivity: Activity, private val mWebView: Any) {

    private var mBootFilePaths: JSONObject? = null
    private val mConfigPath: String
    val bootPath: String

    init {
        bootPath = "/data/data/" + mActivity.packageName
        mConfigPath = "$bootPath/bootFilePaths.json"

        val content = FileUtil.readFile(mConfigPath)
        try {
            if (content !== "") {
                mBootFilePaths = JSONObject(content)
            } else {
                mBootFilePaths = JSONObject()
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

    }

    @JavascriptInterface
    fun restartApp() {
        android.os.Process.killProcess(android.os.Process.myPid())
    }

    @JavascriptInterface
    fun getAppVersion(listenerID: Int) {
        var name = ""
        try {
            val pm = mActivity.applicationContext.packageManager
            val info = pm.getPackageInfo(mActivity.applicationContext.packageName, 0)
            name = info.versionName
        } catch (e: Exception) {
            e.printStackTrace()
        }

        val func = String.format("window.handle_jsintercept_callback(%d, true, '%s')", listenerID, name)
        mActivity.runOnUiThread(CallJSRunnable(mWebView, func))
    }

    @JavascriptInterface
    fun updateApp(url: String, listenerID: Int) {
        val updater = AppUpdater()
        updater.activity = mActivity
        updater.webView = mWebView
        updater.updateApp(url)
    }

    @JavascriptInterface
    fun getBootFiles(listenerID: Int) {

        val result = JSONObject()

        try {
            val iterator = mBootFilePaths!!.keys()
            while (iterator.hasNext()) {
                val key = iterator.next() as String
                val fullPath = mBootFilePaths!!.getString(key)
                result.put(key, Base64.encodeToString(FileUtil.readFileToData(fullPath), Base64.NO_WRAP))
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

        val func = String.format("window.handle_jsintercept_callback(%d, true, '%s')", listenerID, result.toString())
        mActivity.runOnUiThread(CallJSRunnable(mWebView, func))
    }

    @JavascriptInterface
    fun saveFile(path: String, base64Str: String, listenerID: Int) {
        var path = path
        try {
            if (path.contains(".depend")) {
                path = path.replace(".depend", "depend")
            }

            val fullPath = "$bootPath/$path"
            val content = Base64.decode(base64Str, Base64.NO_WRAP)
            FileUtil.writeFile(fullPath, content)

            path = path.substring(path.lastIndexOf("/") + 1)
            mBootFilePaths!!.put(path, fullPath)
            FileUtil.writeFile(mConfigPath, mBootFilePaths!!.toString().toByteArray(Charsets.UTF_8))

            Log.d("Intercept", "JSIntercept.saveFile: $fullPath")
            val func = String.format("window.handle_jsintercept_callback(%d, true)", listenerID)
            mActivity.runOnUiThread(CallJSRunnable(mWebView, func))

        } catch (e: Exception) {
            e.printStackTrace()
        }

    }
}
