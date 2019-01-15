package com.kuplay.kuplay.app;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.View;

import com.kuplay.kuplay.R;
import com.kuplay.kuplay.gdtunion.Splash;

public class SplashActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        View decorView = getWindow().getDecorView();
//        int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN;
//        decorView.setSystemUiVisibility(uiOptions);
//        startActivity(new Intent(this, MainActivity.class));
//        finish();
        View view = this.getWindow().getDecorView();
        view.setBackgroundResource(R.drawable.splash);

        Splash ad = new Splash();
        ad.addSplashAD(this, MainActivity.class);
    }
}
