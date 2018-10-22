_$define("app/net/push", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var con_mgr_1 = require("../../pi/net/ui/con_mgr");
var tools_1 = require("../utils/tools");
var pull_1 = require("./pull");
var root_1 = require("../../pi/ui/root");
var constants_1 = require("../utils/constants");
/**
 * 后端主动推消息给后端
 */
// ===================================================== 导入
// ===================================================== 导出
// ===================================================== 本地
// ===================================================== 立即执行
// 主动推送
exports.initPush = function () {
    //监听指令事件
    con_mgr_1.setMsgHandler('cmd', function (res) {
        console.log('强制下线==========================', res);
        con_mgr_1.setConState(con_mgr_1.ConState.noReconnect);
        var cmd = res.cmd;
        if (cmd === constants_1.CMD.FORCELOGOUT) {
            tools_1.logoutAccount();
        } else if (cmd === constants_1.CMD.FORCELOGOUTDEL) {
            tools_1.logoutAccountDel();
        }
        root_1.popNew('app-components1-modalBox-modalBox', {
            sureText: "重新登录",
            cancelText: "退出",
            title: '下线通知',
            content: "您的账户已被下线，如非本人操作，则助记词可能已泄露。"
        }, function () {
            // for(let i = backList.length - 1;i > 0;i++){
            //     console.log('-------------',i);
            //     backCall();
            // }
            root_1.popNew('app-view-wallet-create-home');
        }, function () {
            for (var i = root_1.backList.length - 1; i > 0; i++) {
                root_1.backCall();
            }
        });
    });
    //监听充值成功事件
    con_mgr_1.setMsgHandler('event_pay_ok', function (res) {
        tools_1.popNewMessage(tools_1.getStaticLanguage().transfer.rechargeTips);
        var value = res.value.toJSNumber ? res.value.toJSNumber() : res.value;
        pull_1.getCloudBalance().then(function (res) {
            console.log('服务器推送成功 云端余额更新==========================', res);
        });
        console.log('服务器推送成功==========================', res);
    });
};
})