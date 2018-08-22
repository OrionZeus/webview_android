package com.kupay.kupay.app;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.kupay.kupay.common.WebViewManager;

public class YNApplication extends Application {
    private static final String TAG = "YNApplication";
    private static Application appCtx;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.e(TAG, "onCreate: "+System.currentTimeMillis() );
        appCtx = this;
        WebViewManager manager = WebViewManager.touch();
        manager.initWebView();
    }

    /**
     * Getter
     *
     * @return The application's context
     */
    public static Application getAppCtx() {
        return appCtx;
    }
}
