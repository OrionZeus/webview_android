package com.kuplay.kuplay.common.js;

import android.app.Activity;
import android.content.Context;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;

import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 * Android and js bridging files for js call the local underlying method.
 */
public class JSIntercept {

    public JSIntercept() {

    }

    @JavascriptInterface
    public void saveFile(String path, String base64Str, int saveID) {
        try {
            Context context = (Context) JSEnv.getEnv(JSEnv.CONTEXT);
            String fullPath = "/data/data/" + context.getPackageName() + "/" + path;

            Log.d("Intercept", "JSIntercept.saveFile: " + fullPath);

            File f = new File(fullPath);
            if (!f.exists()) {
                new File(fullPath.substring(0, fullPath.lastIndexOf('/'))).mkdirs();
                f.createNewFile();
            }
            FileOutputStream stream = new FileOutputStream(f);
            byte[] data = Base64.decode(base64Str, Base64.NO_WRAP);
            stream.write(data);
            stream.close();

            String func = String.format("window.handle_update_save(%d)", saveID);
            Activity activity = (Activity) JSEnv.getEnv(JSEnv.ACTIVITY);
            activity.runOnUiThread(new CallJSRunnable(JSEnv.getEnv(JSEnv.WEBVIEW), func.toString()));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
