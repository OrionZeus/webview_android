package com.kuplay.kuplay.common.js;

import android.app.Activity;
import android.content.Context;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Path;

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

    public JSIntercept(Activity activity, Object webView) {
        mActivity = activity;
        mWebView = webView;
        mConfigPath = "/data/data/" + activity.getPackageName() + "/bootFilePaths.json";

        String content = readFile(mConfigPath);
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

    @JavascriptInterface
    public void getBootPaths(int listenerID) {
        String func = String.format("window.handle_jsintercept_callback(%d, true, '%s')", listenerID, mBootFilePaths.toString());
        mActivity.runOnUiThread(new CallJSRunnable(mWebView, func));
    }

    @JavascriptInterface
    public void saveFile(String path, String base64Str, int listenerID) {
        try {
            if (path.contains(".depend")) {
                path = path.replace(".depend", "depend");
            }

            Context context = mActivity.getApplicationContext();
            String fullPath = "/data/data/" + context.getPackageName() + "/" + path;
            byte[] content = Base64.decode(base64Str, Base64.NO_WRAP);
            writeFile(fullPath, content);

            String fileName = path.substring(path.lastIndexOf("/") + 1);
            mBootFilePaths.put(fileName, "file:///data/data/" + context.getPackageName());
            writeFile(mConfigPath, mBootFilePaths.toString().getBytes(Charsets.UTF_8));

            Log.d("Intercept", "JSIntercept.saveFile: " + fullPath);
            String func = String.format("window.handle_jsintercept_callback(%d, true)", listenerID);
            mActivity.runOnUiThread(new CallJSRunnable(mWebView, func));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String readFile(String path) {
        String content = "";
        File file = new File(path);
        try {
            FileInputStream stream = new FileInputStream(file);
            byte[] bs = new byte[stream.available()];
            stream.read(bs);
            content = new String(bs, Charsets.UTF_8);
            stream.close();
        } catch (Exception e) {

        }
        return content;
    }

    private void writeFile(String path, byte[] content) {
        File f = new File(path);
        try {
            if (!f.exists()) {
                new File(path.substring(0, path.lastIndexOf('/'))).mkdirs();
                f.createNewFile();
            }
            FileOutputStream stream = new FileOutputStream(f);
            stream.write(content);
            stream.close();
        } catch (Exception e) {

        }
    }
}
