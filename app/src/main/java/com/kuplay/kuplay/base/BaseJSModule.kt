package com.kuplay.kuplay.base

import android.app.Activity
import android.content.Intent

import com.github.dfqin.grantor.PermissionsUtil
import com.kuplay.kuplay.R
import com.kuplay.kuplay.common.JSExecutable
import com.kuplay.kuplay.common.js.JSEnv
import com.kuplay.kuplay.common.js.JSInterface

/**
 * Created by "iqos_jay@outlook.com" on 2018/7/5.
 * BaseJSModule has implemented [JSExecutable],
 * it means the class which extends [BaseJSModule] will auto implement [JSExecutable],
 * it will be also auto add into the JSBridge,then we need not call [JSEnv.setClass] as well.
 * this class will define some basic views or methods,
 * such as : how to show tip on dialog when user refused the application's Permission.
 * Cause is it is unnecessary for us to define the same property and method in different code files.
 * Of course, if you don't need to use the request permission,
 * you can implements [JSExecutable] directly.
 */
abstract class BaseJSModule : JSExecutable, JSInterface {
    /**
     * The callbackId is a value from the TS,
     * it will be used when do sth complete no ever it is successful or failed.
     */
    lateinit var callBack: (callType: Int, prames: Array<Any>)->Unit
    /**
     * TipInfo:When the application is missing the necessary permissions
     * are displayed to the user's prompt o message.
     */
    lateinit var mTipInfo: PermissionsUtil.TipInfo
    /**
     * Activity could be used as context.
     */
    var ctx: Activity? = null

    lateinit var webView: Any
        set
    lateinit var activity: Activity
        set

    /**
     * What would you like to prompt user "You Missed Permission".
     *
     * @return the message content you want to prompt user.
     */
    private val tipContentWithoutPermission: String
        get() = ctx!!.resources.getString(R.string.tip_misseed_permission_default_prompt)

    /**
     * It's constructor will initialize some values.
     */
    init {
        ctx = JSEnv.getEnv(JSEnv.ACTIVITY) as Activity
        if (null != ctx){
            mTipInfo = PermissionsUtil.TipInfo(ctx!!.resources.getString(R.string.dialog_title_prompt), tipContentWithoutPermission, ctx!!.resources.getString(R.string.dialog_title_cancel), ctx!!.resources.getString(R.string.dialog_title_ok))
            JSEnv.jsImpl = this
        }
    }

    /**
     * Activity's visibility changes from invisible to visible.
     */
    override fun onResume() {}

    /**
     * Dispatch incoming result to the correct fragment.
     *
     * @param requestCode request code
     * @param resultCode  the code of result,this mark is set by user,this will be used as mark.
     * @param data        Callback data from last Activity.
     */
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {}
}
