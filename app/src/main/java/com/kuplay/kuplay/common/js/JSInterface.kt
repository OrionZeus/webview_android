package com.kuplay.kuplay.common.js

import android.content.Intent

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/27.
 * Callback interface for Android lifecycle calls.
 */
interface JSInterface {
    /**
     * Dispatch incoming result to the correct fragment.
     *
     * @param requestCode request code
     * @param resultCode  the code of result,this mark is set by user,this will be used as mark.
     * @param data        Callback data from last Activity.
     */
    fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent)

    /**
     * Activity's visibility changes from invisible to visible.
     */
    fun onResume()
}
