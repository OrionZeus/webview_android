package com.kuplay.kuplay.module;

import android.content.Intent;
import android.text.TextUtils;

import com.kuplay.kuplay.app.NewWebViewActivity;
import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by iqosjay@gmail.com on 2018/11/7
 */
public class WebViewManager extends BaseJSModule {
    /**
     * All WebViews that have been opened.
     */
    private static final HashMap<String, Object> WEB_VIEW_FORM = new HashMap<>();
    /**
     * The name of the WebView in all active states,
     * the last element is the name of the currently displayed WebView
     */
    private static final List<String> WEB_VIEW_NAME_LIST = new ArrayList<>();

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
    public void openWebView(int callbackId, String webViewName, String url, String title) {
        if (TextUtils.isEmpty(webViewName)) {
            JSCallback.throwJS(WebViewManager.class.getSimpleName(), "openWebView", "The WebView's name can't be null.");
            return;
        }
        if (TextUtils.isEmpty(url)) {
            JSCallback.throwJS(WebViewManager.class.getSimpleName(), "openWebView", "The url can't be null.");
            return;
        }
        if (isWebViewNameExists(webViewName)) {
            JSCallback.throwJS(WebViewManager.class.getSimpleName(), "openWebView", "このWebViewな名前は存在したことがある，新しいな名前を使ってください！");
        } else {
            Intent intent = new Intent(ctx, NewWebViewActivity.class);
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
            JSCallback.throwJS(WebViewManager.class.getSimpleName(), "closeWebView", "The default WebView couldn't remove,please select a new one.");
        } else {
            if (!isWebViewNameExists(webViewName)) {
                JSCallback.throwJS(WebViewManager.class.getSimpleName(), "closeWebView", "The WebView's name is not exists.");
            } else {
                sendCloseWebViewMessage(webViewName);
            }
        }
    }

    /**
     * Add WebView.
     *
     * @param key    WebView's name.
     * @param object WebView:X5 or Android
     */
    public static void addWebView(String key, Object object) {
        WEB_VIEW_FORM.put(key, object);
        WEB_VIEW_NAME_LIST.add(key);
    }

    /**
     * Remove WebView by its name.
     *
     * @param key WebView's name
     */
    public static void removeWebView(String key) {
        WEB_VIEW_FORM.remove(key);
        WEB_VIEW_NAME_LIST.remove(key);
    }

    /**
     * Send a message to the web page view with the specified name.
     *
     * @param webViewName The name of WebView which you want send message to.
     * @param message     The message what you would like to send.
     */
    public void postWebViewMessage(int callbackId, String webViewName, String message) {
        if (!isWebViewNameExists(webViewName)) {
            JSCallback.throwJS(WebViewManager.class.getSimpleName(), "postWebViewMessage", "The WebView's name is not exists.");
            return;
        }
        Intent intent = new Intent("send_message");
        intent.putExtra("message", message);
        intent.putExtra("from_web_view", WEB_VIEW_NAME_LIST.get(WEB_VIEW_NAME_LIST.size() - 1));
        ctx.sendBroadcast(intent);
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
