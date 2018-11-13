package com.kuplay.kuplay.common.js;

import android.app.Activity;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.kuplay.kuplay.common.JSExecutable;
import com.kuplay.kuplay.util.CodeUtil;
import com.kuplay.kuplay.util.ContainerUtil;
import com.kuplay.kuplay.util.Logger;

import org.json.JSONArray;

import java.util.List;

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 * Android and js bridging files for js call the local underlying method.
 */
public class JSBridge {
    private static final String TAG = JSBridge.class.getName();
    private static final String METHOD_INIT = "init";//method name->init
    private static final String METHOD_CLOSE = "close";//method name->close
    private final Object mWebView;
    private final Activity mActivity;

    /**
     * Constructor used to initialize classes that would be called by JS.
     * Get all classes from the project which implemented the {@link JSExecutable},
     * and put these classes into the JSBridge.
     * The file is needn't modify anymore,while you want add new features,
     * just make the class implement {@link JSExecutable}.
     */
    public JSBridge(Object webView, Activity activity) {
        this.mActivity = activity;
        this.mWebView = webView;
        List<Class> classes = CodeUtil.getAllClassByInterface(JSExecutable.class);
        if (ContainerUtil.isNullOrEmpty(classes)) return;
        for (Class clazz : classes) {
            JSEnv.setClass(clazz.getSimpleName(), clazz);
        }
    }

    /**
     * Called when js web wanna to call local function,
     * this class isn't created by me,other parameter will be filled after a while.
     *
     * @param className  Class's name that was called.
     * @param methodName Class's method that was called.
     */
    @JavascriptInterface
    public void postMessage(String className, String methodName, int nativeID, int listenerID, String jsonArray) {
        try {
            JSONArray js = new JSONArray(jsonArray);
            Object[] params = new Object[1 + js.length()];
            params[0] = listenerID;
            for (int i = 0; i < js.length(); i++) {
                params[i + 1] = js.get(i);
            }
            Log.d("JSBridge", "postMessage (" + className + ", " + methodName + ", " + nativeID + ", " + listenerID + ", " + jsonArray + ")");
            switch (methodName) {
                case METHOD_INIT:
                    int id = JSEnv.newInstance(className, mWebView, mActivity);
                    JSCallback.callJS(mActivity, listenerID, JSCallback.SUCCESS, id);
                    break;
                case METHOD_CLOSE:
                    JSEnv.removeObject(nativeID);
                    JSCallback.callJS(mActivity, listenerID, JSCallback.SUCCESS);
                    break;
                default:
                    JSEnv.call(className, methodName, nativeID, params);
                    break;
            }
        } catch (Exception e) {
            JSCallback.throwJS(mActivity, className, methodName, e.getMessage());
        }
    }
}
