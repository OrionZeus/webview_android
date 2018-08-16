package com.yineng.yishizhizun.module;

import android.Manifest;
import android.content.Intent;
import android.support.annotation.NonNull;

import com.donkingliang.imageselector.utils.ImageSelector;
import com.donkingliang.imageselector.utils.ImageSelectorUtils;
import com.github.dfqin.grantor.PermissionListener;
import com.github.dfqin.grantor.PermissionsUtil;
import com.yineng.yishizhizun.app.App;
import com.yineng.yishizhizun.app.YNApplication;
import com.yineng.yishizhizun.base.BaseJSModule;
import com.yineng.yishizhizun.common.js.JSCallback;
import com.yineng.yishizhizun.util.Logger;

import java.util.ArrayList;

/**
 * Created by "iqos_jay@outlook.com" on 2018/7/5.
 * ImagePicker would be called by javaScript instead of java code.
 */
public class ImagePicker extends BaseJSModule {
    private static final String TAG = "ImagePicker";

    /**
     * Select photo from local gallery.
     *
     * @param callbackId transmission from js,
     *                   that will be use when {@link JSCallback} callback js.
     */
    public void chooseImage(int callbackId) {
        PermissionsUtil.requestPermission(YNApplication.getAppCtx(), new PermissionListener() {
            @Override
            public void permissionGranted(@NonNull String[] permission) {
                openGallery();
            }

            @Override
            public void permissionDenied(@NonNull String[] permission) {

            }
        }, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, true, mTipInfo);
    }

    /**
     * Open the gallery to choose a piece of photo.
     */
    private void openGallery() {
        //限数量的多选(比喻最多9张)
        ImageSelector.builder()
                .useCamera(true)//设置是否使用拍照
                .setSingle(false)//设置是否单选
                .setMaxSelectCount(9)//图片的最大选择数量，小于等于0时，不限数量。
                .start(ctx, App.APP_RESULT_CODE);//打开相册
    }

    /**
     * What would you like to prompt user "You Missed Permission".
     *
     * @return the message content you want to prompt user.
     */
    @Override
    protected String getTipContentWithoutPermission() {
        return "打开相册需要读取手机存储权限";
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
            case App.APP_RESULT_CODE:
                if (null == data) break;
                //获取选择器返回的数据
                ArrayList<String> images = data.getStringArrayListExtra(ImageSelectorUtils.SELECT_RESULT);
                for (String image : images) {
                    Logger.info(TAG, image);
                }
                break;
        }
    }
}
