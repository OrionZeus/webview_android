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
import com.kuplay.kuplay.app.MainActivity;
import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.util.FileUtil;
import com.kuplay.kuplay.util.Logger;
import com.kuplay.kuplay.util.ToastManager;

import java.io.File;
import java.lang.ref.WeakReference;
import java.util.ArrayList;

/**
 * Created by "iqos_jay@outlook.com" on 2018/7/5.
 * ImagePicker would be called by javaScript instead of java code.
 */
public class ImagePicker extends BaseJSModule {
    private static final String TAG = "ImagePicker";
    private static final String BASE64_IMAGE_HEADER = "data:image/png;base64,";
    private boolean useCamera;
    private int width, height;


    /**
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
                JSCallback.callJS(callbackId, JSCallback.FAIL, "用户拒绝了权限!");
            }
        }, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE
                , Manifest.permission.CAMERA}, true, mTipInfo);
    }

    /**
     * Open the gallery to choose a piece of photo.
     */
    private void openGallery(boolean useCamera, boolean single, int max) {
        try {
            //限数量的多选(比如最多9张)
            ImageSelector.builder()
                    .useCamera(useCamera)//设置是否使用拍照
                    .setSingle(single)//设置是否单选
                    .showGif(false)//是否要显示GIF图片(默认是要显示的)
                    .setMaxSelectCount(max)//图片的最大选择数量，小于等于0时，不限数量。
                    .start(ctx, MainActivity.APP_RESULT_CODE);//打开相册
        } catch (IndexOutOfBoundsException e) {
            ToastManager.toast(ctx, "手机里面没有照片！");
        }
    }

    /**
     * Change the image to te byte arrays might take much time,
     * in order not to cause ANR, use thread asynchronous.
     */
    private static class DecodeImageTask extends AsyncTask<String, Void, String> {
        private WeakReference<ImagePicker> weak;

        private DecodeImageTask(ImagePicker picker) {
            this.weak = new WeakReference<>(picker);
        }

        @Override
        protected String doInBackground(String... strings) {
            ImagePicker imagePicker = weak.get();
            if (null == imagePicker) return null;
            String path = strings[0];
            if (TextUtils.isEmpty(path)) return null;
            try {
                imagePicker.width = FileUtil.getImageWidth(path);
                imagePicker.height = FileUtil.getImageHeight(path);
                String base64 = FileUtil.fileToBase64(new File(path));
                return BASE64_IMAGE_HEADER + base64;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        protected void onPostExecute(String base64) {
            ImagePicker picker = weak.get();
            if (TextUtils.isEmpty(base64)) {
                JSCallback.callJS(picker.callbackId, JSCallback.FAIL, "选择图片失败");
            } else {
                JSCallback.callJS(picker.callbackId, JSCallback.SUCCESS, String.valueOf(picker.width), String.valueOf(picker.height), base64);
            }
        }
    }

    /**
     * 计算Ahash
     * This method will be called by js.
     *
     * @param path 文件的路径
     */
    public void calcAHash(int callbackId, String path) {
        this.callbackId = callbackId;
        new CalcAHashTask(this).execute(path);
    }

    /**
     * 计算Base64
     * This method will be called by js.
     *
     * @param path 文件路径
     */
    public void calcBase64(int callbackId, String path) {
        this.callbackId = callbackId;
        new DecodeImageTask(this).execute(path);
    }

    private static class CalcAHashTask extends AsyncTask<String, Void, String> {
        private WeakReference<ImagePicker> weak;

        private CalcAHashTask(ImagePicker picker) {
            this.weak = new WeakReference<>(picker);
        }

        @Override
        protected String doInBackground(String... strings) {
            ImagePicker imagePicker = weak.get();
            if (null == imagePicker) return null;
            String path = strings[0];
            if (TextUtils.isEmpty(path)) {
                JSCallback.callJS(imagePicker.callbackId, JSCallback.FAIL, "The path can not be null.");
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
        protected void onPostExecute(String s) {
            ImagePicker imagePicker = weak.get();
            if (null == imagePicker) return;
            if (TextUtils.isEmpty(s)) {
                JSCallback.callJS(imagePicker.callbackId, JSCallback.FAIL, "");
            } else {
                Logger.error("TAG", "计算结果\t" + s);
                JSCallback.callJS(imagePicker.callbackId, JSCallback.SUCCESS, s);
            }
        }
    }


    /**
     * What would you like to prompt user "You Missed Permission".
     *
     * @return the message content you want to prompt user.
     */
    @Override
    protected String getTipContentWithoutPermission() {
        return isUseCamera() ? "使用相机需要相机权限、读写手机存储权限" : "打开相册需要读取手机存储权限";
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
                    JSCallback.callJS(callbackId, JSCallback.FAIL, "未选择图片");
                    break;
                }
                //获取选择器返回的数据
                ArrayList<String> images = data.getStringArrayListExtra(ImageSelectorUtils.SELECT_RESULT);
                if (null != images && 0 != images.size()) {
                    if (1 == images.size()) {
                        String path = images.get(0);
                        Logger.error("TAG", "图片宽度\t" + FileUtil.getImageWidth(path));
                        Logger.error("TAG", "图片高度\t" + FileUtil.getImageHeight(path));
//                        new CalcAHashTask(this).execute(path);
//                        this.copyFileToDataDir(path);
                        new DecodeImageTask(this).execute(path);
                    } else {
                        JSCallback.callJS(callbackId, JSCallback.FAIL, "The Path Is Null.");
                    }
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
        final String copy = "/data0/data/" + ctx.getPackageName() + File.separator + FileUtil.getFileNameByPath(path);
        ctx.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                boolean success = FileUtil.copyFile(path, copy);
                if (success) {
                    Logger.error("拷贝过后的新文件路径：", copy);
                    JSCallback.callJS(callbackId, JSCallback.SUCCESS, copy);
                } else {
                    JSCallback.callJS(callbackId, JSCallback.FAIL, "");
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
