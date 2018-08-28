package com.kupay.kupay.module;

import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;

import com.kupay.kupay.base.BaseJSModule;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/23.
 */
public class ExitApp extends BaseJSModule {
    /**
     * The method will be called when the web view couldn't back anymore
     * and the user still press key-back.
     * Then there is a dialog to show the message tell:
     * confirm exit?
     *
     * @param callbackId This method is would be called by TS,this value from ts.
     */
    public void confirmExit(int callbackId) {
        AlertDialog dialog = new AlertDialog.Builder(ctx)
                .setTitle("提示")
                .setMessage("确定退出App？")
                .setCancelable(true)
                .setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        ctx.finish();
                    }
                })
                .create();
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();
    }
}
