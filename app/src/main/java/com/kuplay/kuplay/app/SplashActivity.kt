package com.kuplay.kuplay.app

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View

class SplashActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val decorView = window.decorView
        val uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_FULLSCREEN
        decorView.systemUiVisibility = uiOptions
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
