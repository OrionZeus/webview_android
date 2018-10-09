package com.kuplay.kuplay.module.update

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.IBinder
import com.kuplay.kuplay.base.BaseJSModule
import com.kuplay.kuplay.service.UpdateAppService
import com.kuplay.kuplay.util.Logger

class AppUpdater : BaseJSModule() {
    private var mUpdateService: UpdateAppService? = null
    fun updateApp(callbackId: Int, url: String) {
        val updateIntent = Intent(ctx, UpdateAppService::class.java)
        val conn = object : ServiceConnection {
            override fun onServiceDisconnected(name: ComponentName?) {
            }

            override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
                mUpdateService = (service as UpdateAppService.UpdateBinder).getService()
            }

        }
        ctx.bindService(updateIntent, conn, Context.BIND_AUTO_CREATE)
        mUpdateService?.startDownload(url)
        mUpdateService?.addDownloadProgressListener { total, progress ->
            updateDownloadProgress(total, progress)
        }
        mUpdateService?.addDownloadFinishListener { filePath ->
            prepareInstall(filePath)
        }
    }

    private fun updateDownloadProgress(total: Int, progress: Int) {
        Logger.error("TAG", "总进度$total 当前下载进度$progress")
    }

    private fun prepareInstall(filePath: String) {
        Logger.error("TAG", "下载成功$filePath")
    }


}