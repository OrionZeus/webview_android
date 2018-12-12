package com.kuplay.kuplay.module;

import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;
import android.webkit.WebView;

import com.kuplay.kuplay.R;
import com.kuplay.kuplay.app.MainActivity;
import com.kuplay.kuplay.app.NewWebViewActivity;
import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.widget.AndroidWebView;
import com.kuplay.kuplay.widget.X5Chrome;

import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

class FreeWebView implements Runnable {

    private Object view;
    private boolean isX5;

    FreeWebView(Object view, boolean isX5) {
        this.view = view;
        this.isX5 = isX5;
    }

    @Override
    public void run() {
        if (isX5) {
            ((X5Chrome)view).destroy();
        } else {
            ((AndroidWebView)view).destroy();
        }
    }
}

class NewWebView implements Runnable {
    private boolean isX5;
    private String url;
    private String webViewName;
    private Map headers;
    private Context context;

    NewWebView(Context context, boolean isX5, String webViewName, String url, Map headers) {
        this.url = url;
        this.isX5 = isX5;
        this.context = context;
        this.webViewName = webViewName;
        this.headers = headers;
    }

    @Override
    public void run() {
        if (isX5) {
            X5Chrome view = new X5Chrome(this.context, null);
            WebViewManager.addWebView(this.webViewName, view);
            view.loadUrl(this.url, this.headers);
        } else {
            AndroidWebView view = new AndroidWebView(this.context, null);
            WebViewManager.addWebView(this.webViewName, view);
            view.loadUrl(this.url, this.headers);
        }
    }
}

/**
 * Created by iqosjay@gmail.com on 2018/11/7
 */
public class WebViewManager extends BaseJSModule {
    /**
     * All WebViews that have been opened.
     */
    private static final HashMap<String, Object> WEB_VIEW_FORM = new HashMap<>();

    /**
     * 新开webview，但不显示出来
     * @param callbackId
     * @param webViewName
     * @param url
     * @param headers，以 key1:value1 key2:value2 方式传递
     */
    public void newView(int callbackId, String webViewName, String url, String headers) {

        if (TextUtils.isEmpty(webViewName)) {
            JSCallback.throwJS(getActivity(), getWebView(),
                    WebViewManager.class.getSimpleName(), "newView", "The WebView's name can't be null.");
            return;
        }

        if (TextUtils.isEmpty(url)) {
            JSCallback.throwJS(getActivity(), getWebView(),
                    WebViewManager.class.getSimpleName(), "newView", "The url can't be null.");
            return;
        }

        if (isWebViewNameExists(webViewName)) {
            JSCallback.throwJS(getActivity(), getWebView(),
                    WebViewManager.class.getSimpleName(), "newView", "WebView name is exist.");
            return;
        }

        Map extraHeaders = new HashMap();
        try {
            JSONObject obj = new JSONObject(headers);
            Iterator<String> keysItr = obj.keys();
            while(keysItr.hasNext()) {
                String key = keysItr.next();
                extraHeaders.put(key, obj.getString(key));
            }
        } catch (Exception e) {

        }

        boolean isX5 = mWebView instanceof X5Chrome;
        mActivity.runOnUiThread(new NewWebView(mActivity.getApplicationContext(), isX5, webViewName, url, extraHeaders));
        JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.SUCCESS);
    }

    public void freeView(int callbackId, String webViewName) {
        try {
            if ("default".equals(webViewName)) {
                JSCallback.throwJS(getActivity(), getWebView(),
                        WebViewManager.class.getSimpleName(), "freeView", "The default WebView couldn't remove,please select a new one.");
                return;
            }

            if (!isWebViewNameExists(webViewName)) {
                return;
            }

            Object view = WebViewManager.getWebView(webViewName);
            mActivity.runOnUiThread(new FreeWebView(view, view instanceof X5Chrome));
            WebViewManager.removeWebView(webViewName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        JSCallback.callJS(getActivity(), getWebView(), callbackId, JSCallback.SUCCESS);
    }

    /**
     * Open a new WebView to display a web page.
     *
     * @param callbackId  TS callbackId.
     * @param webViewName This is both name and key for the new webView,
     *                    you could called{@link #closeWebView(int, String)} with this key
     *                    after opened the webView.
     * @param url         The web page's url.
     * @param title       The title what would you like to show in the new View.
     */
    public void openWebView(int callbackId, String webViewName, String url, String title, String injectContent) {

        if (TextUtils.isEmpty(webViewName)) {
            JSCallback.throwJS(getActivity(), getWebView(),
                    WebViewManager.class.getSimpleName(), "openWebView", "The WebView's name can't be null.");
            return;
        }
        if (TextUtils.isEmpty(url)) {
            JSCallback.throwJS(getActivity(), getWebView(),
                    WebViewManager.class.getSimpleName(), "openWebView", "The url can't be null.");
            return;
        }
        if (isWebViewNameExists(webViewName)) {
            JSCallback.throwJS(getActivity(), getWebView(),
                    WebViewManager.class.getSimpleName(), "openWebView", "WebView name is exist.");
        } else {
            File file = new File(ctx.getCacheDir(), "new_webview_inject");
            try {
                BufferedWriter bw = new BufferedWriter(new FileWriter(file));
                bw.write(String.valueOf(injectContent));
                bw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

            Intent intent = new Intent(ctx, NewWebViewActivity.class);
            intent.putExtra("inject", file.getAbsolutePath());
            intent.putExtra("title", title);
            intent.putExtra("load_url", url);
            intent.putExtra("tag", webViewName);

            ctx.startActivity(intent);
        }
    }

    /**
     * Close the specified WebView.
     *
     * @param callbackId  TS callbackId.
     * @param webViewName WebView's name.
     */
    public void closeWebView(int callbackId, String webViewName) {
        if ("default".equals(webViewName)) {
            JSCallback.throwJS(getActivity(), getWebView(),
                    WebViewManager.class.getSimpleName(), "closeWebView", "The default WebView couldn't remove,please select a new one.");
            return;
        }
        if (!isWebViewNameExists(webViewName)) {
            return;
        }
        sendCloseWebViewMessage(webViewName);
    }

    /**
     * Add WebView.
     *
     * @param key    WebView's name.
     * @param object WebView:X5 or Android
     */
    public static void addWebView(String key, Object object) {
        WEB_VIEW_FORM.put(key, object);
    }

    /**
     * Remove WebView by its name.
     *
     * @param key WebView's name
     */
    public static void removeWebView(String key) {
        WEB_VIEW_FORM.remove(key);
    }

    public static Object getWebView(String key) {
        return WEB_VIEW_FORM.get(key);
    }

    /**
     * Send a message to the web page view with the specified name.
     *
     * @param webViewName The name of WebView which you want send message to.
     * @param message     The message what you would like to send.
     */
    public void postWebViewMessage(int callbackId, String webViewName, String message) {
        if (!isWebViewNameExists(webViewName)) {
            JSCallback.throwJS(getActivity(), getWebView(),
                    WebViewManager.class.getSimpleName(), "postWebViewMessage", "The WebView's name is not exists.");
            return;
        }
        String fromWebView = getNameByWebViewObj();
        Intent intent = new Intent("send_message" + webViewName);
        intent.putExtra("message", message);
        intent.putExtra("from_web_view", fromWebView);
        ctx.sendBroadcast(intent);
    }

    /**
     * Get the webView's name by webView.
     *
     * @return The name of webView.
     */
    private String getNameByWebViewObj() {
        Object obj = getWebView();
        Set<Map.Entry<String, Object>> entries = WEB_VIEW_FORM.entrySet();
        for (Map.Entry<String, Object> entry : entries) {
            if (obj.equals(entry.getValue())) {
                return entry.getKey();
            }
        }
        return null;
    }

    /**
     * Close the WebView by webView's name.Finished by send broadcast,
     * because in this way, the coupling is the lowest.
     *
     * @param webViewName WebView's name.
     */
    private void sendCloseWebViewMessage(String webViewName) {
        Intent intent = new Intent("close_web_view");
        intent.putExtra("web_view_name", webViewName);
        ctx.sendBroadcast(intent);
    }

    /**
     * Check whether the name of webView is exists.
     *
     * @param webViewName The name of webView
     * @return true for the name has been exists.
     */
    private boolean isWebViewNameExists(String webViewName) {
        for (String key : WEB_VIEW_FORM.keySet()) {
            if (webViewName.equals(key)) {
                return true;
            }
        }
        return false;
    }
}
