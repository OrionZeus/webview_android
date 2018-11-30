package com.kuplay.kuplay.intercepter;

import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.webkit.MimeTypeMap;

import com.kuplay.kuplay.common.js.JSEnv;

import org.json.JSONArray;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;

public class Interceptor {

    private Uri uri;
    private Boolean isIntercept = false;
    private String injectContent = "";
    private static String[] domains = null;
    private static boolean fetchFromMobile = true;
    private Object mWebView;
    private Context ctx;

    public Interceptor(Context ctx) {
        this.ctx = ctx;
        uri = null;
    }

    public void setIntercept(Boolean isIntercept) {
        // this.isIntercept = isIntercept;
    }

    public void setInjectContent(String content) {
        this.injectContent = content;
    }

    public void setWebView(Object webView) {
        this.mWebView = webView;
    }

    public InterceptorHandler GetInterceptHandle(Uri uri) {

        if (null == uri) return null;
        if (uri.toString().startsWith("blob:")) return null;
        this.uri = uri;
        String path = uri.getPath();
        InterceptorHandler handler = null;
        if (null == path) return null;

        if (injectContent != null && !"".equals(injectContent)) {
            return new InjectHandler();
        } else if (!isIntercept) {
            return null;
        }

//        if (path.startsWith("/$intercept")) {
//            handler = new SetInterceptHandler();
//        } else if (path.startsWith("/$resinfo")) {
//            handler = new ResInfoHandler();
//        } else if (fetchFromMobile) {
//            if (uri.toString().contains("$forceServer=1")) {
//                handler = null;
//            } else if (domains == null) {
//                handler = new FetchFromLocalHandler();
//            } else {
//                String url = uri.toString();
//                for (String domain : domains) {
//                    if (url.startsWith(domain)) {
//                        handler = new FetchFromLocalHandler();
//                    }
//                }
//            }
//        }
        return handler;
    }

    //******************** Handlers *********************//

    /**
     * 设置拦截标记
     */
    public class SetInterceptHandler implements InterceptorHandler {
        public Object handle(Interceptor interceptor) {
            String value = interceptor.uri.getQueryParameter("value");
            fetchFromMobile = "1".equals(value);
            String result = "true";
            InputStream in = null;
            try {
                in = new ByteArrayInputStream(result.getBytes("UTF-8"));
            } catch (Exception e) {
                in = new ByteArrayInputStream(result.getBytes());
            }

            Object response = null;
            if (interceptor.mWebView instanceof android.webkit.WebView) {
                response = new android.webkit.WebResourceResponse("text/json", "UTF-8", in);
            } else if (interceptor.mWebView instanceof com.tencent.smtt.sdk.WebView) {
                response = new com.tencent.smtt.export.external.interfaces.WebResourceResponse("text/json", "UTF-8", in);
            }
            return response;
        }
    }

    /**
     * 设置资源信息
     */
    public class ResInfoHandler implements InterceptorHandler {
        public Object handle(Interceptor interceptor) {
            try {
                JSONArray domainsArray = new JSONArray(interceptor.uri.getQueryParameter("domains"));
                domains = new String[domainsArray.length()];
                for (int i = 0; i < domainsArray.length(); i++) {
                    domains[i] = domainsArray.getString(i);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            String result = "true";
            InputStream in = null;
            try {
                in = new ByteArrayInputStream(result.getBytes("UTF-8"));
            } catch (Exception e) {
                in = new ByteArrayInputStream(result.getBytes());
            }

            Object response = null;
            if (interceptor.mWebView instanceof android.webkit.WebView) {
                response = new android.webkit.WebResourceResponse("text/json", "UTF-8", in);
            } else if (interceptor.mWebView instanceof com.tencent.smtt.sdk.WebView) {
                response = new com.tencent.smtt.export.external.interfaces.WebResourceResponse("text/json", "UTF-8", in);
            }
            return response;
        }
    }

    public class FetchFromLocalHandler implements InterceptorHandler {

        // 从手机路径读不到，就到assert路径读取
        public Object handle(Interceptor interceptor) {

            Context context = (Context) JSEnv.getEnv(JSEnv.CONTEXT);

            String path = interceptor.uri.getPath();

            String fullPath = "/data/data/" + context.getPackageName() + path;

            Log.d("Intercept", "FetchFromLocalHandler--boot: " + fullPath);
            File f = new File(fullPath);
            if (f.exists() && !f.isDirectory()) {
                try {
                    FileInputStream stream = new FileInputStream(f);
                    String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(interceptor.uri.toString()));

                    Object response = null;
                    if (interceptor.mWebView instanceof android.webkit.WebView) {
                        response = new android.webkit.WebResourceResponse(mimeType, "UTF-8", stream);
                    } else if (interceptor.mWebView instanceof com.tencent.smtt.sdk.WebView) {
                        response = new com.tencent.smtt.export.external.interfaces.WebResourceResponse(mimeType, "UTF-8", stream);
                    }
                    return response;
                } catch (Exception e) {
                    Log.d("Intercept", "FetchFromLocalHandler--boot--catch: " + fullPath);
                }
            }

            try {
                if (path.contains(".depend")) {
                    path = path.replace(".depend", "depend");
                }
                if (path.startsWith("/")) {
                    path = path.substring(1);
                }

                Log.d("Intercept", "FetchFromLocalHandler--assets: " + path);
                InputStream stream = ctx.getAssets().open(path);
                String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(interceptor.uri.toString()));

                Object response = null;
                if (interceptor.mWebView instanceof android.webkit.WebView) {
                    response = new android.webkit.WebResourceResponse(mimeType, "UTF-8", stream);
                } else if (interceptor.mWebView instanceof com.tencent.smtt.sdk.WebView) {
                    response = new com.tencent.smtt.export.external.interfaces.WebResourceResponse(mimeType, "UTF-8", stream);
                }
                return response;

            } catch (Exception e) {
                Log.d("Intercept", "FetchFromLocalHandler--assets--catch: " + path);
                e.printStackTrace();
            }
            return null;
        }
    }

    public class InjectHandler implements InterceptorHandler {

        public Object handle(Interceptor interceptor) {
            try {
                Log.d("Intercept", "InjectHandler Begin");
                String mimeType = "text/html";

                InputStream stream = null;

                OkHttpClient client = new OkHttpClient();
                Request  request = new Request.Builder().url(interceptor.uri.toString()).build();
                Call call = client.newCall(request);
                try {
                    String context = call.execute().body().string();
                    context = "<script>" + interceptor.injectContent + "</script>" + context;
                    stream = new ByteArrayInputStream(context.getBytes(StandardCharsets.UTF_8));
                } catch (Exception e) {
                    e.printStackTrace();
                }

                Object response = null;
                if (interceptor.mWebView instanceof android.webkit.WebView) {
                    response = new android.webkit.WebResourceResponse(mimeType, "UTF-8", stream);
                } else if (interceptor.mWebView instanceof com.tencent.smtt.sdk.WebView) {
                    response = new com.tencent.smtt.export.external.interfaces.WebResourceResponse(mimeType, "UTF-8", stream);
                }
                return response;
            } catch (Exception e) {
                Log.d("Intercept", "InjectHandler");
                e.printStackTrace();
            }
            return null;
        }
    }
}
