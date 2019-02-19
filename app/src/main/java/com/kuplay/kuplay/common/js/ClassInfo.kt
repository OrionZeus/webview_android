package com.kuplay.kuplay.common.js

import java.lang.reflect.Method
import java.util.HashMap

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 */
class ClassInfo(val clazz: Class<*>) {
    var methods: HashMap<String, Method>? = null
        private set // 方法信息，键是方法名

    init {
        if (null == methods) {
            methods = HashMap()
        }
    }
}
