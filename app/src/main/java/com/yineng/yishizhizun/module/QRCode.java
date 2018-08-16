package com.yineng.yishizhizun.module;

import android.app.Activity;

import com.google.zxing.integration.android.IntentIntegrator;
import com.yineng.yishizhizun.app.App;
import com.yineng.yishizhizun.base.BaseJSModule;
import com.yineng.yishizhizun.common.JSExecutable;
import com.yineng.yishizhizun.common.js.JSEnv;

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 * QRCode would be called by javaScript instead of java code.
 */
public class QRCode extends BaseJSModule {
    private static final String TAG = "QRCode";

    public void scan(int cbId) {
        App.JSQRCodeScanCallBackID = cbId;
        App.QRCodeEnable = true;
        Activity activity = (Activity) JSEnv.getEnv(JSEnv.ACTIVITY);
        IntentIntegrator intentIntegrator = new IntentIntegrator(activity);
        intentIntegrator.setRequestCode(App.APP_RESULT_CODE);
        intentIntegrator.initiateScan();
    }


}
