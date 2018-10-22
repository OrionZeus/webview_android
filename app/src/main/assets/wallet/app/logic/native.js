_$define("app/logic/native", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var imagePicker_1 = require("../../pi/browser/imagePicker");
var qrcode_1 = require("../../pi/browser/qrcode");
var systemInfoProvider_1 = require("../../pi/browser/systemInfoProvider");
var webViewHelper_1 = require("../../pi/browser/webViewHelper");
var root_1 = require("../../pi/ui/root");
var httpHelper_1 = require("../../pi/browser/httpHelper");
/**
 * 一些底层操作
 */
exports.selectImage = function (ok, cancel) {
    console.log('选择图片');
    var image = new imagePicker_1.ImagePicker();
    image.init();
    image.selectFromLocal({
        success: function success(width, height, result) {
            ok && ok(width, height, result);
            close && close.callback(close.widget);
        },
        fail: function fail(result) {
            cancel && cancel(result);
            close && close.callback(close.widget);
        },
        useCamera: 1,
        single: 1,
        max: 1
    });
    var close = void 0;
    setTimeout(function () {
        close = root_1.popNew('app-components1-loading-loading', { text: '导入中...' });
    }, 100);
};
/**
 * 二维码扫描
 */
exports.doScanQrCode = function (ok, cancel) {
    var qrcode = new qrcode_1.QRCode();
    qrcode.init();
    qrcode.scan({
        success: function success(res) {
            ok && ok(res);
            console.log('scan-------------', res);
        },
        fail: function fail(r) {
            cancel && cancel();
            console.log("scan fail:" + r);
        }
    });
    qrcode.close({
        success: function success(r) {
            console.log("close result:" + r);
        }
    });
};
/**
 * 打开新网页
 */
exports.openNewActivity = function (url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var newWebView = new webViewHelper_1.WebViewHelper();
    newWebView.init();
    newWebView.open({
        success: function success(result) {},
        fail: function fail(result) {},
        loadUrl: url,
        title: title
    });
};
/**
 * 获取设备信息
 */
exports.getDeviceInfo = function () {
    var systemInfo = new systemInfoProvider_1.SystemInfoProvider();
    systemInfo.init();
    systemInfo.getDeviceInfo({
        success: function success(result) {
            console.log('获取设备的系统信息成功\t' + result);
        },
        fail: function fail(result) {
            console.log('获取设备的系统信息失败\t' + result);
        }
    });
};
/**
 * get 请求
 */
exports.getRequest = function (url) {
    return new Promise(function (resolve, reject) {
        var httpHelper = new httpHelper_1.HttpHelper();
        httpHelper.init();
        httpHelper.getConnection({
            url: url,
            success: function success(result) {
                resolve(result);
            },
            fail: function fail(result) {
                reject(result);
            }
        });
    });
};
/**
 * post 请求
 */
exports.postRequest = function (url, param) {
    var httpHelper = new httpHelper_1.HttpHelper();
    httpHelper.init();
    httpHelper.postConnection({
        url: url,
        json: JSON.stringify(param),
        success: function success(result) {
            alert("请求结果\t" + result);
        },
        fail: function fail(result) {
            alert("请求失败 错误信息\t" + result);
        }
    });
};
})