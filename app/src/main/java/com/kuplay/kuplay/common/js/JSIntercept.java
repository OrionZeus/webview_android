package com.kuplay.kuplay.common.js;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.kuplay.kuplay.app.App;
import com.kuplay.kuplay.service.RestartService;
import com.kuplay.kuplay.util.FileUtil;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.util.Iterator;

import kotlin.text.Charsets;

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 * Android and js bridging files for js call the local underlying method.
 */
public class JSIntercept {

    private JSONObject mBootFilePaths;
    private Activity mActivity;
    private Object mWebView;
    private String mConfigPath;
    private String mBootPath;

    public JSIntercept(Activity activity, Object webView) {
        mActivity = activity;
        mWebView = webView;
        mBootPath = "/data/data/" + activity.getPackageName();
        mConfigPath = mBootPath + "/bootFilePaths.json";

        String content = FileUtil.readFile(mConfigPath);
        try {
            if (content != "") {
                mBootFilePaths = new JSONObject(content);
            } else {
                mBootFilePaths = new JSONObject();
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getBootPath() {
        return mBootPath;
    }

    @JavascriptInterface
    public void restartApp() {
//        /** 开启一个新的服务，用来重启本APP */
//        Intent intent = new Intent(mActivity.getApplicationContext(), RestartService.class);
//        intent.putExtra("PackageName", mActivity.getApplicationContext().getPackageName());
//        intent.putExtra("Delayed",  5);
//        mActivity.getApplicationContext().startService(intent);
//
//        /* 杀死整个进程 */
//        android.os.Process.killProcess(android.os.Process.myPid());

        final Intent intent = mActivity.getApplication().getPackageManager()
                .getLaunchIntentForPackage(mActivity.getApplication().getPackageName());
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        mActivity.getApplication().startActivity(intent);
    }

    @JavascriptInterface
    public void getBootFiles(int listenerID) {

        JSONObject result = new JSONObject();

        try {
            Iterator iterator = mBootFilePaths.keys();
            while (iterator.hasNext()) {
                String key = (String) iterator.next();
                String fullPath = mBootFilePaths.getString(key);
                result.put(key, Base64.encodeToString(FileUtil.readFileToData(fullPath), Base64.NO_WRAP));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        String func = String.format("window.handle_jsintercept_callback(%d, true, '%s')", listenerID, result.toString());
        mActivity.runOnUiThread(new CallJSRunnable(mWebView, func));
    }

    @JavascriptInterface
    public void saveFile(String path, String base64Str, int listenerID) {
        try {
            if (path.contains(".depend")) {
                path = path.replace(".depend", "depend");
            }

            Context context = mActivity.getApplicationContext();
            String fullPath = mBootPath + "/" + path;
            byte[] content = Base64.decode(base64Str, Base64.NO_WRAP);
            FileUtil.writeFile(fullPath, content);

            String fileName = path.substring(path.lastIndexOf("/") + 1);
            mBootFilePaths.put(fileName, fullPath);
            FileUtil.writeFile(mConfigPath, mBootFilePaths.toString().getBytes(Charsets.UTF_8));

            Log.d("Intercept", "JSIntercept.saveFile: " + fullPath);
            String func = String.format("window.handle_jsintercept_callback(%d, true)", listenerID);
            mActivity.runOnUiThread(new CallJSRunnable(mWebView, func));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
