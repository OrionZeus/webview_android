package com.kuplay.kuplay.common.js

import android.app.Activity
import android.support.annotation.IntDef
import android.util.Log

import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 */
object JSCallback {
    const val SUCCESS = 0
    const val FAIL = 1
    const val CALLBACK = 100


    /**
     * params只接受整数，浮点数，字符串
     */
    fun callJS(activity: Activity?, webview: Any?, listenerId: Int, @StatusCode statusCode: Int,  params: Array<Any>) {
        var activity = activity
        var webview = webview
        if (activity == null) {
            activity = JSEnv.getEnv(JSEnv.ACTIVITY) as Activity
        }
        if (webview == null) {
            webview = JSEnv.getEnv(JSEnv.WEBVIEW)
        }

        val func = StringBuilder("window['handle_Native_Message']($listenerId, $statusCode")
        if (null != params)
            for (o in params) {
                Log.d("callJS","$o")
                if (o is Byte) {
                    val v = o.toInt()
                    func.append(", ").append(v)
                } else if (o is Short) {
                    val v = o.toInt()
                    func.append(", ").append(v)
                } else if (o is Int) {
                    val v = o
                    func.append(", ").append(v)
                } else if (o is Float) {
                    val v = o
                    func.append(", ").append(v)
                } else if (o is Double) {
                    val v = o
                    func.append(", ").append(v)
                } else if (o is Boolean) {
                    val v = o
                    func.append(", ").append(if (v) 1 else 0)
                } else if (o is String) {
                    val s = o as String
                    func.append(String.format(", '%s'", s))
                } else {
                    throwJS(activity, webview, "Android", "CallJS", "Internal Error, CallJS params error!")
                    return
                }
            }
        func.append(")")

        Log.d("JSBridge", "callJS: " + func.toString())
        activity.runOnUiThread(CallJSRunnable(webview!!, func.toString()))
    }

    fun throwJS(activity: Activity, webview: Any?, className: String, methodName: String, message: String) {
        val func = String.format("handle_Native_ThrowError('%s', '%s', '%s'", className, methodName, message)
        Log.d("JSBridge", "throwJS: $func")
        activity.runOnUiThread(CallJSRunnable(webview!!, func))
    }

    /**
     * In order to make the passed parameter types safe,so we use custom annotations here.
     * When you want to send the parameter,the parameter must be defined in @StatusCode.
     * Else the warning will appear,but it can still run with the red warning,
     * cause is this just is a type checker instead of code.
     */
    @IntDef(SUCCESS, FAIL, CALLBACK)
    @Retention(RetentionPolicy.SOURCE)
    private annotation class StatusCode
}
