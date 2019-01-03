package com.kuplay.kuplay.module

import android.app.KeyguardManager
import android.content.Context
import android.os.Build
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat

import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/23.
 */
class FingerReader : BaseJSModule() {

    private val mCallback = object : FingerprintManagerCompat.AuthenticationCallback() {
        override fun onAuthenticationError(errMsgId: Int, errString: CharSequence?) {
            super.onAuthenticationError(errMsgId, errString)
        }

        override fun onAuthenticationHelp(helpMsgId: Int, helpString: CharSequence?) {
            super.onAuthenticationHelp(helpMsgId, helpString)
        }

        override fun onAuthenticationSucceeded(result: FingerprintManagerCompat.AuthenticationResult?) {
            super.onAuthenticationSucceeded(result)
            callBack(JSCallback.SUCCESS, arrayOf(""))
            //JSCallback.callJS(null, null, getCallbackId(), JSCallback.getSUCCESS(), "")
        }

        override fun onAuthenticationFailed() {
            super.onAuthenticationFailed()
            callBack(JSCallback.FAIL, arrayOf(""))
            //JSCallback.callJS(null, null, getCallbackId(), JSCallback.getFAIL(), "")
        }
    }

    fun showFingerPrintTouch(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        this.callBack = callBack
        //this.setCallbackId(callbackId)
        if (Build.VERSION_CODES.M > Build.VERSION.SDK_INT) return
        val fingerprintManager = FingerprintManagerCompat.from(ctx!!)
        val keyguardManager = ctx!!.getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
                ?: return
        if (keyguardManager.isKeyguardSecure) {
            //按照Google的说法，如果设备未开启锁屏是不安全的，不能使用指纹
            fingerprintManager.authenticate(null, 0, null, mCallback, null)
        }
    }
}
