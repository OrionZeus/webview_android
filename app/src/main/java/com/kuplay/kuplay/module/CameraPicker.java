package com.kuplay.kuplay.module;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;

import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;

import java.io.ByteArrayOutputStream;
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
        if (resultCode == TAKE_PHOTO){
            if (null != data) {
                Uri uri =data.getData();
                if (uri != null) {
                    bitmap = BitmapFactory.decodeFile(uri.getPath());
                    if (bitmap == null) {
                        Bundle bundle = data.getExtras();
                        if (bundle != null) {
                            bitmap = (Bitmap) bundle.get("data");
                        }
                    }
                }
            }
            if (bitmap == null){
                JSCallback.callJS(getActivity(), getWebView(), this.callbackId, JSCallback.FAIL, "未选择图片");
                return;
            }
            String base64 = bitmapToBase64(bitmap);
        }
    }


    public static String bitmapToBase64(Bitmap bitmap) {

        String result = null;
        ByteArrayOutputStream baos = null;
        try {
            if (bitmap != null) {
                baos = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);

                baos.flush();
                baos.close();

                byte[] bitmapBytes = baos.toByteArray();
                result = Base64.encodeToString(bitmapBytes, Base64.DEFAULT);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (baos != null) {
                    baos.flush();
                    baos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

}
