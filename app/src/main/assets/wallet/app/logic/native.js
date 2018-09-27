_$define("app/logic/native", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var imagePicker_1 = require("../../pi/browser/imagePicker");
var qrcode_1 = require("../../pi/browser/qrcode");
var root_1 = require("../../pi/ui/root");
/**
 * 一些底层操作
 */
exports.selectImage = function (ok, cancel) {
    console.log('选择图片');
    var close = root_1.popNew('app-components1-loading-loading', { text: '导入中...' });
    var image = new imagePicker_1.ImagePicker();
    image.init();
    image.selectFromLocal({
        success: function success(width, height, result) {
            ok && ok(width, height, result);
            close.callback(close.widget);
        },
        fail: function fail(result) {
            cancel && cancel(result);
            close.callback(close.widget);
            root_1.popNew('app-components-message-message', { content: '导入失败' });
        },
        useCamera: 1,
        single: 1,
        max: 1
    });
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
})