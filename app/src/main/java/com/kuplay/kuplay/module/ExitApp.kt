package com.kuplay.kuplay.module

import android.content.DialogInterface
import android.content.Intent
import android.support.v7.app.AlertDialog

import com.kuplay.kuplay.R
import com.kuplay.kuplay.base.BaseJSModule

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/23.
 */
class ExitApp : BaseJSModule() {
    /**
     * The method will be called when the web view couldn't back anymore
     * and the user still press key-back.
     * Then there is a dialog to show the message tell:
     * confirm exit?
     *
     */
    fun confirmExit(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        val dialog = AlertDialog.Builder(ctx!!)
                .setTitle(ctx!!.resources.getString(R.string.dialog_title_prompt))
                .setMessage(ctx!!.resources.getString(R.string.dialog_msg_confirm_exit_app))
                .setCancelable(true)
                .setPositiveButton(ctx!!.resources.getString(R.string.dialog_title_ok)) { dialog, which -> ctx!!.finish() }
                .create()
        dialog.setCanceledOnTouchOutside(false)
        dialog.show()
    }

    /**
     * Back to home screen instead of the exit application,
     * if you call this function,the application will always run in the background.
     *
     * @param callbackId This method is would be called by TS,this value from ts.
     */
    fun backToHome(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        val home = Intent(Intent.ACTION_MAIN)
        home.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
        home.addCategory(Intent.CATEGORY_HOME)
        ctx!!.startActivity(home)
    }
}
