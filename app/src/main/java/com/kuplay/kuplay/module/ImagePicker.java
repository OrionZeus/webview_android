package com.kuplay.kuplay.module;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.github.dfqin.grantor.PermissionListener;
import com.github.dfqin.grantor.PermissionsUtil;
import com.iqos.imageselector.utils.ImageSelector;
import com.iqos.imageselector.utils.ImageSelectorUtils;
import com.iqos.imageselector.utils.ImageUtil;
import com.kuplay.kuplay.R;
import com.kuplay.kuplay.app.MainActivity;
import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.util.FileUtil;
import com.kuplay.kuplay.util.Logger;

import java.io.File;
import java.lang.ref.WeakReference;
import java.util.ArrayList;

/**
 * Created by "iqos_jay@outlook.com" on 2018/7/5.
 * ImagePicker would be called by javaScript instead of java code.
 */
public class ImagePicker extends BaseJSModule {
    private static final String TAG = "ImagePicker";
    private boolean useCamera;
    private String path = "";   // 最近选择的图片路径

    /**
     * .
     * * Select photo from local gallery.
     *
     * @param callbackId transmission from js,
     *                   that will be use when {@link JSCallback} callback js.
     * @param useCamera  whether use phone's camera:the value "1" means true,else means false.
     * @param single     just select one photo:the value "1" means true,else means false.
     * @param max        the max photos that you could select.
     */
    public void chooseImage(final int callbackId, final int useCamera, final int single, final int max) {
        setUseCamera(1 == useCamera);
        this.callbackId = callbackId;
        PermissionsUtil.requestPermission(ctx, new PermissionListener() {
            @Override
            public void permissionGranted(@NonNull String[] permission) {
                openGallery(1 == useCamera, 1 == single, max);
            }

            @Override
            public void permissionDenied(@NonNull String[] permission) {
                JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "用户拒绝了权限!");
            }
        }, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE
                , Manifest.permission.CAMERA}, true, mTipInfo);
    }

    /**
     * Open the gallery to choose a piece of photo.
     */
    private void openGallery(boolean useCamera, boolean single, int max) {
        //限数量的多选(比如最多9张)
        ImageSelector.builder()
                .useCamera(useCamera)//设置是否使用拍照
                .setSingle(single)//设置是否单选
                .showGif(false)//是否要显示GIF图片(默认是要显示的)
                .setMaxSelectCount(max)//图片的最大选择数量，小于等于0时，不限数量。
                .start(ctx, MainActivity.APP_RESULT_CODE);//打开相册
    }

    /**
     * Change the image to te byte arrays might take much time,
     * in order not to cause ANR, use thread asynchronous.
     */
    private static class GetImageContenTask extends AsyncTask<String, Void, String> {

        private int callbackID;

        private GetImageContenTask(int callbackID) {
            this.callbackID = callbackID;
        }

        @Override
        protected String doInBackground(String... strings) {

            String path = strings[0];
            if (TextUtils.isEmpty(path)) {
                return null;
            }

            try {
                String base64 = FileUtil.fileToBase64(new File(path));
                return base64;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        protected void onPostExecute(String base64) {
             if (TextUtils.isEmpty(base64)) {
                JSCallback.callJS(null, null, this.callbackID, JSCallback.FAIL, "GetImageContenTask Failed");
            } else {
                JSCallback.callJS(null, null, this.callbackID, JSCallback.SUCCESS, base64);
            }
        }
    }
	
	   private static class GetAHashTask extends AsyncTask<String, Void, String> {
           private int callbackID;

           private GetAHashTask(int callbackID) {
               this.callbackID = callbackID;
           }

           @Override
           protected String doInBackground(String... strings) {
               String path = strings[0];
               if (TextUtils.isEmpty(path)) {
                   return null;
               }

               try {
                   int[] bitmapARGB = FileUtil.getBitmapPixelColors(path);
                   int imageWidth = FileUtil.getImageWidth(path);
                   int imageHeight = FileUtil.getImageHeight(path);
                   return AHash.ahash(bitmapARGB, imageWidth, imageHeight, 4);
               } catch (Exception e) {
                   e.printStackTrace();
                   return null;
               }
           }

           @Override
           protected void onPostExecute(String hash) {
               if (TextUtils.isEmpty(hash)) {
                   JSCallback.callJS(null, null, this.callbackID, JSCallback.FAIL, "GetAHashTask Failed");
               } else {
                   JSCallback.callJS(null, null, this.callbackID, JSCallback.SUCCESS, hash);
               }
           }
       }
		
    /**
     * 计算AHash
     * This method will be called by js.
     *
     */
    public void getAHash(int callbackId) {
        if (!this.path.startsWith("file://")) {
            JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "path is invalid");
            return;
        }

        String path = this.path.substring("file://".length());

        try {
            new GetAHashTask(callbackId).execute(path);
        } catch (Exception e) {
            e.printStackTrace();
            JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "getAHash Failed!");
        }
    }

    /**
     * 得到图片内容
     * This method will be called by js.
     *
     */
    public void getContent(int callbackId) {
        if (!this.path.startsWith("file://")) {
            JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "取不到图片内容 1");
            return;
        }

        String path = this.path.substring("file://".length());

        try {
            new GetImageContenTask(callbackId).execute(path);
        } catch (Exception e) {
            e.printStackTrace();
            JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "ImagePicker getContent Failed!");
        }
    }

    /**
     * What would you like to prompt user "You Missed Permission".
     *
     * @return the message content you want to prompt user.
     */
    @Override
    protected String getTipContentWithoutPermission() {
        return isUseCamera() ? ctx.getResources().getString(R.string.tip_please_allow_app_read_gallery_with_camera) : ctx.getResources().getString(R.string.tip_please_allow_app_read_gallery_without_camera);
    }

    /**
     * Dispatch incoming result to the correct fragment.
     *
     * @param requestCode request code
     * @param resultCode  the code of result,this mark is set by user,this will be used as mark.
     * @param data        Callback data from last Activity.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case MainActivity.APP_RESULT_CODE:
                if (null == data) {
                    JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "未选择图片");
                    break;
                }
                //获取选择器返回的数据
                ArrayList<String> images = data.getStringArrayListExtra(ImageSelectorUtils.SELECT_RESULT);
                if (null != images && 0 != images.size()) {
                    String path = images.get(0);
                    if (1 == images.size() && path != null) {
                        this.path = "file://" + path;
                        int width = FileUtil.getImageWidth(path);
                        int height = FileUtil.getImageHeight(path);
                        JSCallback.callJS(null, null, callbackId, JSCallback.SUCCESS, width, height, this.path);
                    } else {
                        JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "The path is null.");
                    }
                } else  {
                    JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "The path is null.");
                }
                break;
        }
    }

    /**
     * 把文件复制到Data目录下
     *
     * @param path 源文件的路径
     */
    @SuppressLint("SdCardPath")
    private void copyFileToDataDir(final String path) {
        final String copy = "/data/data/" + ctx.getPackageName() + FileUtil.getFileNameByPath(path);
        ctx.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                boolean success = FileUtil.copyFile(path, copy);
                if (success) {
                    Logger.error("拷贝过后的新文件路径：", copy);
                    JSCallback.callJS(null, null, callbackId, JSCallback.SUCCESS, copy);
                } else {
                    JSCallback.callJS(null, null, callbackId, JSCallback.FAIL, "Copy file failed.");
                }
            }
        });
    }

    /**
     * Whether use the camera?
     *
     * @return 1、true the camera will be used. 2、false the camera won't be used.
     */
    private boolean isUseCamera() {
        return useCamera;
    }

    /**
     * Whether use the camera?
     *
     * @param useCamera 1、true the camera  will be used. 2、false the camera won't be used.
     */
    private void setUseCamera(boolean useCamera) {
        this.useCamera = useCamera;
    }

}
