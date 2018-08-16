_$define("app/shareView/utils/tools", function (require, exports, module){
"use strict";
/**
 * 常用工具
 */

Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocalStorage = function (keyName, data) {
    localStorage.setItem(keyName, JSON.stringify(data));
};
exports.getLocalStorage = function (keyName) {
    return JSON.parse(localStorage.getItem(keyName));
};
// 解析url参数
exports.parseUrlParams = function (search, key) {
    var ret = search.match(new RegExp("(\\?|&)" + key + "=(.*?)(&|$)"));
    return ret && decodeURIComponent(ret[2]);
};
// unicode数组转字符串
exports.unicodeArray2Str = function (arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += String.fromCharCode(arr[i]);
    }
    return str;
};
// 复制到剪切板
exports.copyToClipboard = function (copyText) {
    var input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', copyText);
    input.setAttribute('style', 'position:absolute;top:-9999px;');
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    document.body.removeChild(input);
};
// 时间戳格式化
exports.timestampFormat = function (timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    var minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    var seconds = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
};
/**
 * wei转Eth
 */
exports.wei2Eth = function (num) {
    if (!num) return 0;
    return num / Math.pow(10, 18);
};
/**
 * wei转Eth
 */
exports.eth2Wei = function (num) {
    if (!num) return 0;
    return num * Math.pow(10, 18);
};
/**
 * kpt转kt
 */
exports.kpt2kt = function (num) {
    if (!num) return 0;
    return num / Math.pow(10, 9);
};
/**
 * kt转kpt
 */
exports.kt2kpt = function (num) {
    if (!num) return 0;
    return num * Math.pow(10, 9);
};
/**
 * 根据货币类型小单位转大单位
 */
exports.smallUnit2LargeUnit = function (currencyName, amount) {
    if (currencyName === 'ETH') {
        return exports.wei2Eth(amount);
    } else if (currencyName === 'KT') {
        return exports.kpt2kt(amount);
    }
};
/**
 * 根据货币类型大单位转小单位
 */
exports.largeUnit2SmallUnit = function (currencyName, amount) {
    if (currencyName === 'ETH') {
        return Math.floor(exports.eth2Wei(amount));
    } else if (currencyName === 'KT') {
        return Math.floor(exports.kt2kpt(amount));
    }
};
})