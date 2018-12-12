package com.kuplay.kuplay.widget;

import android.app.Activity;
import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.webkit.MimeTypeMap;

import com.kuplay.kuplay.common.js.CallJSRunnable;
import com.kuplay.kuplay.common.js.JSEnv;

import org.json.JSONArray;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;

public class Interceptor {

    public static Object injectHtml(Object webView, String url, String inject) {
        try {
            Log.d("Intercept", "injectHtml Begin");

            OkHttpClient client = new OkHttpClient();
            Request  request = new Request.Builder().url(url).build();
            Call call = client.newCall(request);

            String context = call.execute().body().string();
            context = "<script>" + inject + "</script>" + context;
            InputStream stream = new ByteArrayInputStream(context.getBytes(StandardCharsets.UTF_8));

            String mimeType = "text/html";
            Object response = null;
            if (webView instanceof android.webkit.WebView) {
                response = new android.webkit.WebResourceResponse(mimeType, "UTF-8", stream);
            } else if (webView instanceof com.tencent.smtt.sdk.WebView) {
                response = new com.tencent.smtt.export.external.interfaces.WebResourceResponse(mimeType, "UTF-8", stream);
            }
            return response;
        } catch (Exception e) {
            Log.d("Interceptor", "injectHtml crash");
            e.printStackTrace();
        }
        return null;
    }
}