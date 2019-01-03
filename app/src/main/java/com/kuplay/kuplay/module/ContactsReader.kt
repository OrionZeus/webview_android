package com.kuplay.kuplay.module

import android.Manifest
import android.content.Intent
import android.net.Uri
import android.text.TextUtils

import com.github.dfqin.grantor.PermissionListener
import com.github.dfqin.grantor.PermissionsUtil
import com.kuplay.kuplay.R
import com.kuplay.kuplay.app.MainActivity
import com.kuplay.kuplay.adapter.SelectContactsActivity
import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.presenter.SelectContactsPresenter

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
class ContactsReader : BaseJSModule() {


    /**
     * What would you like to prompt user "You Missed Permission".
     *
     * @return the message content you want to prompt user.
     */
    protected val tipContentWithoutPermission: String
        get() = ctx!!.resources.getString(R.string.tip_please_allow_app_read_contacts)

    fun readInfo(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        this.callBack = callBack
        //this.setCallbackId(callbackId)
        PermissionsUtil.requestPermission(ctx, object : PermissionListener {
            override fun permissionGranted(permission: Array<String>) {
                val intent = Intent(ctx, SelectContactsActivity::class.java)
                ctx!!.startActivityForResult(intent, MainActivity.APP_RESULT_CODE)
            }

            override fun permissionDenied(permission: Array<String>) {

            }
        }, Manifest.permission.READ_CONTACTS)
    }

    /**
     * 拨打电话或者是发送短信
     *
     * @param callbackId  回调TS的id
     * @param phoneNumber 对方的电话号码
     * @param type        1、打电话 2、发短信
     */
    fun giveCallOrSMS(phoneNumber: String, type: Int, callBack:(callType: Int, prames: Array<Any>)->Unit) {
        if (1 == type) {
            val intent = Intent(Intent.ACTION_DIAL, Uri.parse(String.format("tel:%s", phoneNumber)))
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            ctx!!.startActivity(intent)
        } else {
            val smsToUri = Uri.parse(String.format("smsto:%s", phoneNumber))
            val intent = Intent(Intent.ACTION_SENDTO, smsToUri)
            intent.putExtra("sms_body", "")
            ctx!!.startActivity(intent)
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
        when (resultCode) {
            MainActivity.APP_RESULT_CODE -> {
                if (null != data) {
                    val result = data.getStringExtra(SelectContactsPresenter.SELECTED_CONTACTS)
                    if (TextUtils.isEmpty(result)) {
                        this.callBack(JSCallback.FAIL, arrayOf(""))
                    } else {
                        this.callBack(JSCallback.SUCCESS, arrayOf(result))
                    }
                }else{
                    this.callBack(JSCallback.FAIL, arrayOf(""))
                }

            }
        }
    }
}
