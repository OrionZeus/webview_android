package com.kuplay.kuplay.module

import android.content.Intent
import android.graphics.Bitmap
import android.util.Log

import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.common.js.JSCallback
import com.kuplay.kuplay.util.FileUtil

import java.io.File
import java.io.FileNotFoundException
import java.io.FileOutputStream
import java.io.IOException

class CameraPicker : BaseJSModule() {
    private val TAKE_PHOTO = 3

    fun takePhoto(callBack:(callType: Int, prames: Array<Any>)->Unit) {
        this.callBack = callBack
        val intent = Intent("android.media.action.IMAGE_CAPTURE")
        ctx!!.startActivityForResult(intent, TAKE_PHOTO)
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        super.onActivityResult(requestCode, resultCode, data)
        var bitmap: Bitmap? = null
        val outputImage = File(ctx!!.externalCacheDir, "outputImage.jpg")
        Log.d("z1u24", resultCode.toString())
        Log.d("z1u24", data.toString())
        if (requestCode == TAKE_PHOTO) {
            if (null != data) {
                val bundle = data.extras
                if (bundle != null) {
                    bitmap = bundle.get("data") as Bitmap
                    if (bitmap != null) {
                        saveBitmapASPng(bitmap, outputImage)
                    }
                }
            }
            if (bitmap == null) {
                this.callBack(JSCallback.FAIL, arrayOf("未选择图片"))
                //JSCallback.callJS(activity, webView, this.callbackId, JSCallback.FAIL, "未选择图片")
                return
            }
            val base64 = FileUtil.fileToBase64(outputImage)
            this.callBack(JSCallback.SUCCESS, arrayOf(base64))
            //JSCallback.callJS(activity, webView, this.callbackId, JSCallback.SUCCESS, base64!!)
        }
    }

    //bitmap转png
    private fun saveBitmapASPng(bitmap: Bitmap, outputImage: File) {
        try {
            val out = FileOutputStream(outputImage)
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
            out.flush()
            out.close()
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }

    }


}
