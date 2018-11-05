package com.kuplay.kuplay.module;

import android.content.res.Configuration;
import android.content.res.Resources;
import android.util.DisplayMetrics;

import com.kuplay.kuplay.base.BaseJSModule;
import com.kuplay.kuplay.common.js.JSCallback;
import com.kuplay.kuplay.util.PrefMgr;

import java.util.Locale;

/**
 * Created by iqosjay@gmail.com on 2018/11/2
 */
public class LocalLanguageMgr extends BaseJSModule {
    private static final int LANGUAGE_SYSTEM = 1;//跟随系统
    private static final int LANGUAGE_CHINESE_SIMPLIFY = 2;//简体中文
    private static final int LANGUAGE_CHINESE_TRADITIONAL = 3;//繁体中文
    private static final int LANGUAGE_ENGLISH = 4;//英语
    private static final int LANGUAGE_JAPANESE = 5;//日语

    /**
     * Get the Language which the application is using.
     * When the function get the language successful,is will be callback
     * the ts with a parameter as following
     * {@link #LANGUAGE_SYSTEM}
     * {@link #LANGUAGE_CHINESE_SIMPLIFY}
     * {@link #LANGUAGE_CHINESE_TRADITIONAL}
     * {@link #LANGUAGE_ENGLISH}
     * {@link #LANGUAGE_JAPANESE}
     *
     * @param callbackId Ts callback id
     */
    public void getMobileLanguage(int callbackId) {
        int result = PrefMgr.getInstance(ctx).getAppLan();
        result = result > 5 ? 5 : result;
        result = result < 1 ? 1 : result;
        JSCallback.callJS(callbackId, JSCallback.SUCCESS, String.valueOf(result));
    }

    /**
     * Set the application's language.
     *
     * @param callbackId Callback id from ts.
     * @param language   The language that you would like set to,is could accept the parameter
     *                   as following:
     *                   {@link #LANGUAGE_SYSTEM}
     *                   {@link #LANGUAGE_CHINESE_SIMPLIFY}
     *                   {@link #LANGUAGE_CHINESE_TRADITIONAL}
     *                   {@link #LANGUAGE_ENGLISH}
     *                   {@link #LANGUAGE_JAPANESE}
     */
    public void setMobileLanguage(int callbackId, int language) {
        Resources resources = ctx.getResources();
        DisplayMetrics dm = resources.getDisplayMetrics();
        Configuration config = resources.getConfiguration();
        // 应用用户选择语言
        switch (language) {
            //简体中文
            case LANGUAGE_CHINESE_SIMPLIFY:
                config.locale = Locale.SIMPLIFIED_CHINESE;
                break;
            //繁体中文
            case LANGUAGE_CHINESE_TRADITIONAL:
                config.locale = Locale.TRADITIONAL_CHINESE;
                break;
            //英语
            case LANGUAGE_ENGLISH:
                config.locale = Locale.ENGLISH;
                break;
            //日语
            case LANGUAGE_JAPANESE:
                config.locale = Locale.JAPANESE;
                break;
            //跟随系统
            case LANGUAGE_SYSTEM:
            default:
                config.locale = Locale.getDefault();
                break;
        }
        resources.updateConfiguration(config, dm);
        JSCallback.callJS(callbackId, JSCallback.SUCCESS, "");
        PrefMgr.getInstance(ctx).saveAppLan(language);
    }



    /*@Retention(RetentionPolicy.SOURCE)
    @IntDef({LANGUAGE_SYSTEM, LANGUAGE_CHINESE_SIMPLIFY, LANGUAGE_CHINESE_TRADITIONAL, LANGUAGE_ENGLISH, LANGUAGE_JAPANESE})
    @interface LanguageType {
    }*/
}
