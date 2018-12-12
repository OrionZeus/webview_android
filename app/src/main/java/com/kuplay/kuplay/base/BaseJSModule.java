package com.kuplay.kuplay.base;

import android.app.Activity;
import android.content.Intent;

import com.github.dfqin.grantor.PermissionsUtil;
import com.kuplay.kuplay.R;
import com.kuplay.kuplay.common.JSExecutable;
import com.kuplay.kuplay.common.js.JSEnv;
import com.kuplay.kuplay.common.js.JSInterface;

/**
 * Created by "iqos_jay@outlook.com" on 2018/7/5.
 * BaseJSModule has implemented {@link JSExecutable},
 * it means the class which extends {@link BaseJSModule} will auto implement {@link JSExecutable},
 * it will be also auto add into the JSBridge,then we need not call {@link JSEnv#setClass(String, Class)} as well.
 * this class will define some basic views or methods,
 * such as : how to show tip on dialog when user refused the application's Permission.
 * Cause is it is unnecessary for us to define the same property and method in different code files.
 * Of course, if you don't need to use the request permission,
 * you can implements {@link JSExecutable} directly.
 */
public abstract class BaseJSModule implements JSExecutable, JSInterface {
    /**
     * The callbackId is a value from the TS,
     * it will be used when do sth complete no ever it is successful or failed.
     */
    protected int callbackId;
    /**
     * TipInfo:When the application is missing the necessary permissions
     * are displayed to the user's prompt o message.
     */
    protected PermissionsUtil.TipInfo mTipInfo;
    /**
     * Activity could be used as context.
     */
    protected Activity ctx;

    /**
     * It's constructor will initialize some values.
     */
    public BaseJSModule() {
        ctx = (Activity) JSEnv.getEnv(JSEnv.ACTIVITY);
        if (null == ctx) return;
        mTipInfo = new PermissionsUtil.TipInfo(ctx.getResources().getString(R.string.dialog_title_prompt), getTipContentWithoutPermission(), ctx.getResources().getString(R.string.dialog_title_cancel), ctx.getResources().getString(R.string.dialog_title_ok));
        JSEnv.setJsImpl(this);
    }

    protected Object mWebView;
    protected Activity mActivity;

    protected Object getWebView() {
        return mWebView;
    }

    protected Activity getActivity() {
        return mActivity;
    }

    public void setWebView(Object webView) {
        mWebView = webView;
    }
    public void setActivity(Activity activity) {
        mActivity = activity;
    }

    /**
     * What would you like to prompt user "You Missed Permission".
     *
     * @return the message content you want to prompt user.
     */
    protected String getTipContentWithoutPermission() {
        return ctx.getResources().getString(R.string.tip_misseed_permission_default_prompt);
    }

    /**
     * Activity's visibility changes from invisible to visible.
     */
    @Override
    public void onResume() {
    }

    /**
     * Dispatch incoming result to the correct fragment.
     *
     * @param requestCode request code
     * @param resultCode  the code of result,this mark is set by user,this will be used as mark.
     * @param data        Callback data from last Activity.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
    }
}
