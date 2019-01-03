package com.kuplay.kuplay.common.js

import android.app.Activity
import android.util.Log

import com.kuplay.kuplay.base.BaseJSModule

import java.util.HashMap

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 */
object JSEnv {
    private val TAG = "JSEnv"
    /**
     * 环境串，用于全局取环境变量
     */
    val CONTEXT = "CONTEXT"
    val WEBVIEW = "WEBVIEW"
    val ACTIVITY = "ACTIVITY"

    /**
     * 环境映射表
     */
    private val envMap = HashMap<String, Any>()
    /**
     * 对象映射表，键从1开始递增
     */
    private val objMap = HashMap<Int, Any>()
    /**
     * 类映射表，键是类名
     */
    private val clsMap = HashMap<String, ClassInfo>()
    /**
     * 当本地执行的方法是涉及到Activity回传数据
     * 需要把[JSInterface]的当前实现类存下来、
     * 进行回调
     */
    /**
     * getter
     *
     * @return JSInterface的当前实现类
     */
    /**
     * setterE
     *
     * @param jsImpl JSInterface的当前实现类
     */
    var jsImpl: JSInterface? = null
    /**
     * 对象的键ID
     */
    private var currID = 0


    /**
     * 添加对象，获得对象的id
     */
    fun addObject(o: Any): Int {
        val id = ++currID
        objMap[id] = o
        return id
    }

    /**
     * 根据ID取对象
     */
    fun getObject(id: Int): Any? {
        return objMap[id]
    }

    /**
     * 移除对象
     */
    fun removeObject(id: Int) {
        objMap.remove(id)
    }

    /**
     * 设置环境
     */
    fun setEnv(key: String, o: Any) {
        envMap[key] = o
    }

    /**
     * 获取环境对象
     */
    fun getEnv(key: String): Any? {
        return envMap[key]
    }

    /**
     * Put classes.
     *
     * @param className class's simple name.
     * @param clazz     class.
     */
    fun setClass(className: String, clazz: Class<*>) {
        val info = ClassInfo(clazz)
        clsMap[className] = info
        val ms = clazz.declaredMethods
        for (m in ms) {
            info.methods!![m.name] = m
        }
        println()
    }

    /**
     * 生成对象的实例，返回id
     */
    @Throws(Exception::class)
    fun newInstance(className: String, webView: Any, activity: Activity): Int {
        val info = clsMap[className] ?: throw Exception("JSEnv.call class $className don't find")
        val id: Int
        try {
            val c = info.clazz.getDeclaredConstructor()
            val o = c.newInstance()
            if (o is BaseJSModule) {
                o.webView = webView
                o.activity = activity
            }
            id = addObject(o)
        } catch (e: Exception) {
            e.printStackTrace()
            throw Exception(e)
        }

        return id
    }

    /**
     * 通用调用
     */
    @Throws(Exception::class)
    fun call(className: String, methodName: String, objectID: Int, params: Array<Any?>): Any? {
        var obj: Any? = null
        if (objectID > 0) {
            obj = getObject(objectID)
        }
        val info = clsMap[className] ?: throw Exception("JSEnv.call class $className don't find")

        val m = info.methods!![methodName]
                ?: throw Exception("JSEnv.call method " + methodName + "in class " + className + " don't find")
        var r: Any? = null
        try {
            for (o in params){
                Log.d("JSEnv.call","${obj.toString()},${o.toString()}")
            }

            r = m.invoke(obj, *params)
        } catch (e: Exception) {
            e.printStackTrace()
        }

        return r
    }
}
