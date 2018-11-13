package com.kuplay.kuplay.module;

import android.app.KeyguardManager;
import android.content.Context;
import android.os.Build;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;

import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/23.
 */
public class FingerReader extends BaseJSModule {

    public void showFingerPrintTouch(final int callbackId) {
        this.callbackId = callbackId;
        if (Build.VERSION_CODES.M > Build.VERSION.SDK_INT) return;
        FingerprintManagerCompat fingerprintManager = FingerprintManagerCompat.from(ctx);
        KeyguardManager keyguardManager = (KeyguardManager) ctx.getSystemService(Context.KEYGUARD_SERVICE);
        if (null == keyguardManager) return;
        if (keyguardManager.isKeyguardSecure()) {
            //按照Google的说法，如果设备未开启锁屏是不安全的，不能使用指纹
            fingerprintManager.authenticate(null, 0, null, mCallback, null);
        }
    }

    private FingerprintManagerCompat.AuthenticationCallback mCallback = new FingerprintManagerCompat.AuthenticationCallback() {
        @Override
        public void onAuthenticationError(int errMsgId, CharSequence errString) {
            super.onAuthenticationError(errMsgId, errString);
        }

        @Override
        public void onAuthenticationHelp(int helpMsgId, CharSequence helpString) {
            super.onAuthenticationHelp(helpMsgId, helpString);
        }

        @Override
        public void onAuthenticationSucceeded(FingerprintManagerCompat.AuthenticationResult result) {
            super.onAuthenticationSucceeded(result);
            JSCallback.callJS(getActivity(), callbackId, JSCallback.SUCCESS, "");
        }

        @Override
        public void onAuthenticationFailed() {
            super.onAuthenticationFailed();
            JSCallback.callJS(getActivity(), callbackId, JSCallback.FAIL, "");
    }
    };
}
