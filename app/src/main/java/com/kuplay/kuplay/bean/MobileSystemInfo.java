package com.kuplay.kuplay.bean;

import com.google.gson.Gson;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class MobileSystemInfo {
    private String deviceId;//设备id
    private String currentSize;//当前使用容量
    private String limitSize;//总容量
    private String brand;//手机品牌
    private String model;//手机型号
    private int pixelRatio;//设备像素比
    private int screenWidth;//屏幕宽度
    private int screenHeight;//屏幕高度
    private int statusBarHeight;//状态栏高度
    //------下面这些基本上可以不要------//
    private String windowWidth;//可使用窗口宽度
    private String windowHeight;//可使用窗口高度
    private String language;//语言
    private String version;//App版本号
    private String system;//操作系统版本
    private String platform;//客户端平台
    private String fontSizeSetting;//字体大小
    private String SDKVersion;//客户端基础库版本

    public String getDeviceId() {
        return deviceId;
    }

    public MobileSystemInfo setDeviceId(String deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public String getCurrentSize() {
        return currentSize;
    }

    public MobileSystemInfo setCurrentSize(String currentSize) {
        this.currentSize = currentSize;
        return this;
    }

    public String getLimitSize() {
        return limitSize;
    }

    public MobileSystemInfo setLimitSize(String limitSize) {
        this.limitSize = limitSize;
        return this;
    }

    public String getBrand() {
        return brand;
    }

    public MobileSystemInfo setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public String getModel() {
        return model;
    }

    public MobileSystemInfo setModel(String model) {
        this.model = model;
        return this;
    }

    public int getPixelRatio() {
        return pixelRatio;
    }

    public MobileSystemInfo setPixelRatio(int pixelRatio) {
        this.pixelRatio = pixelRatio;
        return this;
    }

    public int getScreenWidth() {
        return screenWidth;
    }

    public MobileSystemInfo setScreenWidth(int screenWidth) {
        this.screenWidth = screenWidth;
        return this;
    }

    public int getScreenHeight() {
        return screenHeight;
    }

    public MobileSystemInfo setScreenHeight(int screenHeight) {
        this.screenHeight = screenHeight;
        return this;
    }

    public int getStatusBarHeight() {
        return statusBarHeight;
    }

    public MobileSystemInfo setStatusBarHeight(int statusBarHeight) {
        this.statusBarHeight = statusBarHeight;
        return this;
    }

    public String getWindowWidth() {
        return windowWidth;
    }

    public MobileSystemInfo setWindowWidth(String windowWidth) {
        this.windowWidth = windowWidth;
        return this;
    }

    public String getWindowHeight() {
        return windowHeight;
    }

    public MobileSystemInfo setWindowHeight(String windowHeight) {
        this.windowHeight = windowHeight;
        return this;
    }

    public String getLanguage() {
        return language;
    }

    public MobileSystemInfo setLanguage(String language) {
        this.language = language;
        return this;
    }

    public String getVersion() {
        return version;
    }

    public MobileSystemInfo setVersion(String version) {
        this.version = version;
        return this;
    }

    public String getSystem() {
        return system;
    }

    public MobileSystemInfo setSystem(String system) {
        this.system = system;
        return this;
    }

    public String getPlatform() {
        return platform;
    }

    public MobileSystemInfo setPlatform(String platform) {
        this.platform = platform;
        return this;
    }

    public String getFontSizeSetting() {
        return fontSizeSetting;
    }

    public MobileSystemInfo setFontSizeSetting(String fontSizeSetting) {
        this.fontSizeSetting = fontSizeSetting;
        return this;
    }

    public String getSDKVersion() {
        return SDKVersion;
    }

    public MobileSystemInfo setSDKVersion(String SDKVersion) {
        this.SDKVersion = SDKVersion;
        return this;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
