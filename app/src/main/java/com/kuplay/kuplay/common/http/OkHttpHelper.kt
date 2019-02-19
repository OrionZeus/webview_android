package com.kuplay.kuplay.common.http

import android.content.Context
import android.os.Handler
import android.os.Looper
import com.kuplay.kuplay.R
import okhttp3.*
import java.io.IOException

/**
 * Created by "iqosjay@gmail.com" on 2018/10/12.
 */
class OkHttpHelper {
    private val mHandler = Handler(Looper.getMainLooper())
    private var mMediaType = MediaType.parse("application/json")
    /**
     * GET请求
     */
    fun getRequest(ctx: Context, url: String, successCallback: ((result: String) -> Unit)?, failedCallback: ((msg: String) -> Unit)?) {
        val client = OkHttpClient()
        val request = Request.Builder()
                .url(url)
                .build()
        client.newCall(request).enqueue(RequestResultCallback(ctx, successCallback, failedCallback))
    }

    /**
     * POST请求
     */
    fun postRequest(ctx: Context,
                           url: String,
                           json: String,
                           successCallback: ((result: String) -> Unit)?,
                           failedCallback: ((msg: String) -> Unit)?) {
        val requestBody = RequestBody.create(mMediaType, json)
        val client = OkHttpClient()
        val request = Request.Builder()
                .post(requestBody)
                .url(url)
                .build()
        client.newCall(request).enqueue(RequestResultCallback(ctx, successCallback, failedCallback))
    }

    private inner class RequestResultCallback(val ctx: Context, val successCallback: ((result: String) -> Unit)?, val failedCallback: ((msg: String) -> Unit)?) : Callback {
        /**
         * Called when the request could not be executed due to cancellation, a connectivity problem or
         * timeout. Because networks can fail during an exchange, it is possible that the remote server
         * accepted the request before the failure.
         */
        override fun onFailure(call: Call, e: IOException) {
            mHandler.post {
                failedCallback?.invoke(e.message
                        ?: ctx.resources.getString(R.string.msg_request_failed))
            }
        }

        /**
         * Called when the HTTP response was successfully returned by the remote server. The callback may
         * proceed to read the response body with [Response.body]. The response is still live until
         * its response body is [closed][ResponseBody]. The recipient of the callback may
         * consume the response body on another thread.
         *
         *
         * Note that transport-layer success (receiving a HTTP response code, headers and body) does
         * not necessarily indicate application-layer success: `response` may still indicate an
         * unhappy HTTP response code like 404 or 500.
         */
        override fun onResponse(call: Call, response: Response) {
            if (response.isSuccessful) {
                val body = response.body()
                val result = body?.string()
                mHandler.post { successCallback?.invoke(result ?: "") }
            } else {
                mHandler.post { failedCallback?.invoke(ctx.resources.getString(R.string.msg_request_failed)) }
            }
        }
    }

}