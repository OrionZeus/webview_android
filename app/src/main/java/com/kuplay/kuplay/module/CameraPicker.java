package com.kuplay.kuplay.module;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.util.FileUtil;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class CameraPicker extends BaseJSModule {
    private int TAKE_PHOTO = 3;

    public void takePhoto(final int listenID){
        this.callbackId = listenID;
        Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
        ctx.startActivityForResult(intent,TAKE_PHOTO);
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Bitmap bitmap = null;
        File outputImage=new File(ctx.getExternalCacheDir(),"outputImage.jpg");
        Log.d("z1u24", String.valueOf(resultCode));
        Log.d("z1u24", String.valueOf(data));
        if (requestCode == TAKE_PHOTO){
            if (null != data) {
                 Bundle bundle = data.getExtras();
                 if (bundle != null) {
                     bitmap = (Bitmap) bundle.get("data");
                     if(bitmap != null){
                         saveBitmapASPng(bitmap,outputImage);
                     }
                 }
            }
            if (bitmap == null){
                JSCallback.callJS(getActivity(), getWebView(), this.callbackId, JSCallback.FAIL, "未选择图片");
                return;
            }
            String base64 = FileUtil.fileToBase64(outputImage);
            JSCallback.callJS(getActivity(),getWebView(),this.callbackId,JSCallback.SUCCESS,base64);
        }
    }

    //bitmap转png
    private void saveBitmapASPng(Bitmap bitmap, File outputImage){
        try{
            FileOutputStream out = new FileOutputStream(outputImage);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
            out.flush();
            out.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



}
