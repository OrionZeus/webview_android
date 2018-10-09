package com.kuplay.kuplay.module.update

import android.Manifest
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.net.Uri
import android.os.Build
import android.os.IBinder
import android.support.v4.content.FileProvider
import com.github.dfqin.grantor.PermissionListener
import com.github.dfqin.grantor.PermissionsUtil
import com.kuplay.kuplay.R
import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.service.UpdateAppService
import com.kuplay.kuplay.util.Logger
import com.kuplay.kuplay.util.ToastManager
import java.io.File

class AppUpdater : BaseJSModule() {
    private var mUpdateService: UpdateAppService? = null
    private var downloadUrl = ""
    private val conn = object : ServiceConnection {
        override fun onServiceDisconnected(name: ComponentName?) {
        }

        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            mUpdateService = (service as UpdateAppService.UpdateBinder).getService()
            mUpdateService?.startDownload(downloadUrl)
            mUpdateService?.addDownloadProgressListener { total, progress ->
                updateDownloadProgress(total, progress)
            }
            mUpdateService?.addDownloadFinishListener { filePath ->
                prepareInstall(filePath)
            }
        }
    }

    fun updateApp(callbackId: Int, url: String) {
        PermissionsUtil.requestPermission(ctx, object : PermissionListener {
            /**
             * 拒绝授权
             * @param permission
             */
            override fun permissionDenied(permission: Array<out String>) {

            }

            /**
             * 通过授权
             * @param permission
             */
            override fun permissionGranted(permission: Array<out String>) {
                this@AppUpdater.downloadUrl = url
                val updateIntent = Intent(ctx, UpdateAppService::class.java)
                ctx.bindService(updateIntent, conn, Context.BIND_AUTO_CREATE)
            }

        }, Manifest.permission.WRITE_EXTERNAL_STORAGE
                , Manifest.permission.READ_EXTERNAL_STORAGE)
    }

    private fun updateDownloadProgress(total: Int, progress: Int) {
        Logger.error("TAG", "总进度$total 当前下载进度$progress")
    }

    private fun prepareInstall(filePath: String) {
        Logger.error("TAG", "下载成功\t文件路径为：$filePath")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            PermissionsUtil.requestPermission(ctx, object : PermissionListener {
                override fun permissionDenied(permission: Array<out String>) {
                    ToastManager.toast(ctx, "请允许${ctx.resources.getString(R.string.app_name)}安装未知来源的应用！")
                }

                override fun permissionGranted(permission: Array<out String>) {
                    installApk(filePath)
                }
            }, Manifest.permission.REQUEST_INSTALL_PACKAGES)
        } else {
            this.installApk(filePath)
        }
    }


    private fun installApk(filePath: String) {
        val install = Intent(Intent.ACTION_VIEW)
        install.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        val apkFile = File(filePath)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            install.flags = Intent.FLAG_GRANT_READ_URI_PERMISSION
            val contentUri = FileProvider.getUriForFile(ctx, ctx.packageName + ".fileprovider", apkFile)
            install.setDataAndType(contentUri, "application/vnd.android.package-archive")
        } else {
            install.setDataAndType(Uri.fromFile(apkFile), "application/vnd.android.package-archive")
        }
        ctx.startActivity(install)
    }


}