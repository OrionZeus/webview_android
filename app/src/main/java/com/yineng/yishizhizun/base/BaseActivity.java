package com.yineng.yishizhizun.base;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import com.yineng.yishizhizun.util.ToastManager;

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/25.
 * BaseActivity
 */
public abstract class BaseActivity extends AppCompatActivity implements BaseView {
    public static final int APP_RESULT_CODE = 134;
    protected static final int NO_LAYOUT = -1;//No Layout Resources.

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (NO_LAYOUT != getLayoutResources()) {
            setContentView(getLayoutResources());
            this.initViews();
        }
        this.init();
    }

    /**
     * Get the layout resource from XML.
     *
     * @return layout resource from XML.
     */
    protected abstract int getLayoutResources();

    /**
     * As the method name said,this method is used to initialize views on this activity.
     */
    protected abstract void initViews();

    /**
     * Initialize basic data.
     */
    protected abstract void init();

    /**
     * Show the toast tip
     *
     * @param resId the message's id of what would you like to tip
     */
    @Override
    public void onToast(int resId) {
        this.onToast(getResources().getString(resId));
    }

    /**
     * Show the toast tip
     *
     * @param msg the message of what would you like to tip
     */
    @Override
    public void onToast(String msg) {
        this.onToast(msg, Toast.LENGTH_SHORT);
    }

    /**
     * Show the toast tip
     *
     * @param msg      the message of what would you like to tip
     * @param duration the message last time.
     */
    @Override
    public void onToast(String msg, @ToastManager.Duration int duration) {
        ToastManager.toast(this, msg, duration);
    }

    /**
     * Show the toast tip
     *
     * @param msg      the message's id of what would you like to tip.
     * @param duration the message last time.
     */
    @Override
    public void onToast(int msg, int duration) {
        this.onToast(getResources().getString(msg), duration);
    }

    /**
     * Hide the content being prompted.
     */
    @Override
    public void onHideToast() {
        ToastManager.hideToast();
    }
}

