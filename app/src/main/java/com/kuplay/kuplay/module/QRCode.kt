package com.kuplay.kuplay.module

import android.Manifest
import android.content.Intent
import android.os.Build
import android.text.TextUtils

import com.github.dfqin.grantor.PermissionListener
import com.github.dfqin.grantor.PermissionsUtil
import com.iqos.qrscanner.app.QRScannerActivity
import com.kuplay.kuplay.R
import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 * QRCode would be called by javaScript instead of java code.
 */
class QRCode : BaseJSModule() {

    /**
     * What would you like to prompt user "You Missed Permission".
     *
     * @return the message content you want to prompt user.
     */
    protected val tipContentWithoutPermission: String
        get() = ctx!!.resources.getString(R.string.tip_please_allow_app_scan_qr_code)

    fun scan(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        this.callBack = callBack
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            PermissionsUtil.requestPermission(ctx, object : PermissionListener {
                override fun permissionGranted(permission: Array<String>) {
                    jumpToScanQRCode()
                }

                override fun permissionDenied(permission: Array<String>) {

                }
            }, Manifest.permission.CAMERA)
        } else {
            jumpToScanQRCode()
        }
    }

    /**
     * 跳转到扫码
     */
    private fun jumpToScanQRCode() {
        val intent = Intent(ctx, QRScannerActivity::class.java)
        ctx!!.startActivityForResult(intent, QRScannerActivity.SCAN_RESULT_CODE)
    }

    /**
     * Dispatch incoming result to the correct fragment.
     *
     * @param requestCode request code
     * @param resultCode  the code of result,this mark is set by user,this will be used as mark.
     * @param data        Callback data from last Activity.
     */
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        when (resultCode) {
            QRScannerActivity.SCAN_RESULT_CODE -> {
                if (null == data) {
                    callBack(JSCallback.FAIL, arrayOf("空"))
                    //JSCallback.callJS(null, null, getCallbackId(), JSCallback.getFAIL(), "空")

                }else{
                    val result = data.getStringExtra(QRScannerActivity.SCAN_RESULT)
                    if (TextUtils.isEmpty(result)) {
                        callBack(JSCallback.FAIL, arrayOf("空"))
                        //JSCallback.callJS(null, null, getCallbackId(), JSCallback.getFAIL(), "空")
                    } else {
                        callBack(JSCallback.SUCCESS, arrayOf(result))
                        //JSCallback.callJS(null, null, getCallbackId(), JSCallback.getSUCCESS(), result)
                    }
                }

            }
        }
    }
}
