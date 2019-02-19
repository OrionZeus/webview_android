package com.kuplay.kuplay.common.js

import android.app.Activity
import android.util.Log
import android.webkit.JavascriptInterface

import com.kuplay.kuplay.common.JSExecutable
import com.kuplay.kuplay.util.CodeUtil
import com.kuplay.kuplay.util.ContainerUtil

import org.json.JSONArray

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 * Android and js bridging files for js call the local underlying method.
 */
class JSBridge
/**
 * Constructor used to initialize classes that would be called by JS.
 * Get all classes from the project which implemented the [JSExecutable],
 * and put these classes into the JSBridge.
 * The file is needn't modify anymore,while you want add new features,
 * just make the class implement [JSExecutable].
 */
(private val mWebView: Any, private val mActivity: Activity) {

    init {
        val classes = CodeUtil.getAllClassByInterface(JSExecutable::class.java)
        if (!ContainerUtil.isNullOrEmpty(classes)){
            for (clazz in classes) {
                JSEnv.setClass(clazz.simpleName, clazz)
            }
        }

    }

    /**
     * Called when js web wanna to call local function,
     * this class isn't created by me,other parameter will be filled after a while.
     *
     * @param className  Class's name that was called.
     * @param methodName Class's method that was called.
     */
    @JavascriptInterface
    fun postMessage(className: String, methodName: String, nativeID: Int, listenerID: Int, jsonArray: String) {
        Log.d("JSBridge","$className,$methodName,$jsonArray")
        var callBack = { callType: Int, prames: Array<Any> ->
            if (callType == JSCallback.SUCCESS){
                JSCallback.callJS(mActivity, mWebView, listenerID, callType, prames)
            }else if (callType == JSCallback.FAIL){
                JSCallback.throwJS(mActivity, mWebView, className, methodName, prames[0].toString())
            }
        }
        try {
            val js = JSONArray(jsonArray)
            val params = arrayOfNulls<Any>(1 + js.length())
            for (i in 0 until params.size) {
                if (i == js.length()){
                    params[i] = callBack
                }
                else {
                    params[i] = js.get(i)
                }
            }
            Log.d("JSEnv.call000","${params.size}")

            for (o in params){
                Log.d("JSEnv.call333","$o")
            }
            when (methodName) {
                METHOD_INIT -> {
                    val id = JSEnv.newInstance(className, mWebView, mActivity)
                    JSCallback.callJS(mActivity, mWebView, listenerID, JSCallback.SUCCESS, arrayOf(id))
                }
                METHOD_CLOSE -> {
                    JSEnv.removeObject(nativeID)
                    JSCallback.callJS(mActivity, mWebView, listenerID, JSCallback.SUCCESS, emptyArray())
                }
                else -> JSEnv.call(className, methodName, nativeID, params)

            }
        } catch (e: Exception) {
            JSCallback.throwJS(mActivity, mWebView, className, methodName, e.message!!)
        }

    }

    companion object {
        private val TAG = JSBridge::class.java.name
        private val METHOD_INIT = "init"//method name->init
        private val METHOD_CLOSE = "close"//method name->close
    }
}
