package com.kuplay.kuplay.common.js;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.kuplay.kuplay.app.App;
import com.kuplay.kuplay.module.AppUpdater;
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
        android.os.Process.killProcess(android.os.Process.myPid());
    }

    @JavascriptInterface
    public void getAppVersion(int listenerID) {
        String name = "";
        try {
            PackageManager pm = mActivity.getApplicationContext().getPackageManager();
            PackageInfo info = pm.getPackageInfo(mActivity.getApplicationContext().getPackageName(), 0);
            name = info.versionName;
        } catch (Exception e) {
            e.printStackTrace();
        }

        String func = String.format("window.handle_jsintercept_callback(%d, true, '%s')", listenerID, name);
        mActivity.runOnUiThread(new CallJSRunnable(mWebView, func));
    }

    @JavascriptInterface
    public void updateApp(String url, int listenerID) {
        AppUpdater updater = new AppUpdater();
        updater.setActivity(mActivity);
        updater.setWebView(mWebView);
        updater.updateApp(listenerID, url);
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

            String fullPath = mBootPath + "/" + path;
            byte[] content = Base64.decode(base64Str, Base64.NO_WRAP);
            FileUtil.writeFile(fullPath, content);

            path = path.substring(path.lastIndexOf("/") + 1);
            mBootFilePaths.put(path, fullPath);
            FileUtil.writeFile(mConfigPath, mBootFilePaths.toString().getBytes(Charsets.UTF_8));

            Log.d("Intercept", "JSIntercept.saveFile: " + fullPath);
            String func = String.format("window.handle_jsintercept_callback(%d, true)", listenerID);
            mActivity.runOnUiThread(new CallJSRunnable(mWebView, func));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
