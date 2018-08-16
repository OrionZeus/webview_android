_$define("app/store/conMgr", function (require, exports, module){
"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 连接管理
 */
var con_mgr_1 = require("../../pi/net/ui/con_mgr");
var genmnemonic_1 = require("../core/genmnemonic");
var globalWallet_1 = require("../core/globalWallet");
var toolMessages_1 = require("../utils/toolMessages");
var tools_1 = require("../utils/tools");
var cloudAccount_1 = require("./cloudAccount");
var dataCenter_1 = require("./dataCenter");
// 枚举登录状态
var LoginState;
(function (LoginState) {
    LoginState[LoginState["init"] = 0] = "init";
    LoginState[LoginState["logining"] = 1] = "logining";
    LoginState[LoginState["logined"] = 2] = "logined";
    LoginState[LoginState["relogining"] = 3] = "relogining";
    LoginState[LoginState["logouting"] = 4] = "logouting";
    LoginState[LoginState["logouted"] = 5] = "logouted";
    LoginState[LoginState["logerror"] = 6] = "logerror";
})(LoginState = exports.LoginState || (exports.LoginState = {}));
// 货币类型
var CurrencyType;
(function (CurrencyType) {
    CurrencyType[CurrencyType["KT"] = 100] = "KT";
    CurrencyType[CurrencyType["ETH"] = 101] = "ETH";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
// 枚举货币类型
exports.CurrencyTypeReverse = {
    100: 'KT',
    101: 'ETH'
};
// 红包类型
var RedEnvelopeType;
(function (RedEnvelopeType) {
    RedEnvelopeType["Normal"] = "00";
    RedEnvelopeType["Random"] = "01";
    RedEnvelopeType["Invite"] = "99";
})(RedEnvelopeType = exports.RedEnvelopeType || (exports.RedEnvelopeType = {}));
// export const conIp = '47.106.176.185';
exports.conIp = '127.0.0.1';
// export const conPort = '8080';
exports.conPort = '80';
// 分享链接前缀
exports.sharePerUrl = "http://" + exports.conIp + ":" + exports.conPort + "/wallet/app/boot/share.html";
// 任务id记录
var TaskSid;
(function (TaskSid) {
    TaskSid[TaskSid["createWlt"] = 1001] = "createWlt";
    TaskSid[TaskSid["firstChargeEth"] = 1002] = "firstChargeEth";
    TaskSid[TaskSid["bindPhone"] = 1003] = "bindPhone";
    TaskSid[TaskSid["chargeEth"] = 1004] = "chargeEth";
    TaskSid[TaskSid["inviteFriends"] = 1005] = "inviteFriends";
    TaskSid[TaskSid["buyFinancial"] = 1007] = "buyFinancial";
    TaskSid[TaskSid["transfer"] = 1008] = "transfer";
    TaskSid[TaskSid["bonus"] = 1009] = "bonus";
    TaskSid[TaskSid["mines"] = 1010] = "mines";
    TaskSid[TaskSid["chat"] = 1011] = "chat";
    TaskSid["redEnvelope"] = "red_bag_port"; // 红包
})(TaskSid = exports.TaskSid || (exports.TaskSid = {}));
/**
 * 登录状态
 */
var loginState = LoginState.init;
// 查询历史记录时一页的数量
exports.recordNumber = 10;
// 设置登录状态
var setLoginState = function setLoginState(s) {
    if (loginState === s) {
        return;
    }
    loginState = s;
};
/**
 * 通用的异步通信
 */
exports.requestAsync = function (msg) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                            con_mgr_1.request(msg, function (resp) {
                                if (resp.type) {
                                    console.log("\u9519\u8BEF\u4FE1\u606F\u4E3A" + resp.type);
                                    reject(resp);
                                } else if (resp.result !== 1) {
                                    toolMessages_1.showError(resp.result);
                                    reject(resp);
                                } else {
                                    resolve(resp);
                                }
                            });
                        }));

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
/**
 * 验证登录的异步通信
 */
exports.requestLogined = function (msg) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var wallets, wallet, passwd, wlt, signStr, msgLogin, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(loginState === LoginState.logined)) {
                            _context2.next = 4;
                            break;
                        }

                        return _context2.abrupt("return", exports.requestAsync(msg));

                    case 4:
                        wallets = tools_1.getLocalStorage('wallets');
                        wallet = tools_1.getCurrentWallet(wallets);
                        passwd = '';

                        if (dataCenter_1.dataCenter.getHash(wallet.walletId)) {
                            _context2.next = 11;
                            break;
                        }

                        _context2.next = 10;
                        return tools_1.openBasePage('app-components-message-messageboxPrompt', {
                            title: '输入密码', content: '', inputType: 'password'
                        });

                    case 10:
                        passwd = _context2.sent;

                    case 11:
                        _context2.next = 13;
                        return globalWallet_1.GlobalWallet.createWlt('ETH', passwd, wallet, 0);

                    case 13:
                        wlt = _context2.sent;
                        signStr = genmnemonic_1.sign(dataCenter_1.dataCenter.getConRandom(), wlt.exportPrivateKey());
                        msgLogin = { type: 'login', param: { sign: signStr } };

                        setLoginState(LoginState.logining);
                        _context2.next = 19;
                        return exports.requestAsync(msgLogin);

                    case 19:
                        res = _context2.sent;

                        if (!(res.result === 1)) {
                            _context2.next = 23;
                            break;
                        }

                        setLoginState(LoginState.logined);
                        return _context2.abrupt("return", exports.requestAsync(msg));

                    case 23:
                        setLoginState(LoginState.logerror);
                        return _context2.abrupt("return");

                    case 25:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
};
/**
 * 开启连接并获取验证随机数
 */
exports.openAndGetRandom = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var wallets, wallet, oldUser, gwlt;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        wallets = tools_1.getLocalStorage('wallets');
                        wallet = tools_1.getCurrentWallet(wallets);

                        if (wallet) {
                            _context3.next = 4;
                            break;
                        }

                        return _context3.abrupt("return");

                    case 4:
                        oldUser = dataCenter_1.dataCenter.getUser();

                        if (!(oldUser === wallet.walletId)) {
                            _context3.next = 7;
                            break;
                        }

                        return _context3.abrupt("return");

                    case 7:
                        gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);

                        if (!oldUser) {
                            _context3.next = 14;
                            break;
                        }

                        con_mgr_1.closeCon();
                        setLoginState(LoginState.init);
                        dataCenter_1.dataCenter.setUser(wallet.walletId);
                        dataCenter_1.dataCenter.setUserPublicKey(gwlt.publicKey);
                        return _context3.abrupt("return");

                    case 14:
                        con_mgr_1.setUrl("ws://" + exports.conIp + ":2081");
                        dataCenter_1.dataCenter.setUser(wallet.walletId);
                        dataCenter_1.dataCenter.setUserPublicKey(gwlt.publicKey);
                        return _context3.abrupt("return", new Promise(function (resolve, reject) {
                            con_mgr_1.open(function () {
                                // 连接打开后开始设置账号缓存
                                var msg = { type: 'get_random', param: { account: dataCenter_1.dataCenter.getUser().slice(2), pk: "04" + dataCenter_1.dataCenter.getUserPublicKey() } };
                                con_mgr_1.request(msg, function (resp) {
                                    if (resp.type) {
                                        console.log("\u9519\u8BEF\u4FE1\u606F\u4E3A" + resp.type);
                                        reject(resp.type);
                                    } else if (resp.result !== undefined) {
                                        dataCenter_1.dataCenter.setConRandom(resp.rand);
                                        dataCenter_1.dataCenter.setConUid(resp.uid);
                                        cloudAccount_1.cloudAccount.init();
                                        resolve(resp);
                                    }
                                });
                            }, function (result) {
                                console.log("open\u9519\u8BEF\u4FE1\u606F\u4E3A" + result);
                                reject(result);
                            }, function () {
                                // 连接打开后开始设置账号缓存
                                var msg = { type: 'get_random', param: { account: dataCenter_1.dataCenter.getUser().slice(2), pk: "04" + dataCenter_1.dataCenter.getUserPublicKey() } };
                                con_mgr_1.request(msg, function (resp) {
                                    if (resp.type) {
                                        console.log("\u9519\u8BEF\u4FE1\u606F\u4E3A" + resp.type);
                                        reject(resp.type);
                                    } else if (resp.result !== undefined) {
                                        dataCenter_1.dataCenter.setConRandom(resp.rand);
                                        dataCenter_1.dataCenter.setConUid(resp.uid);
                                        cloudAccount_1.cloudAccount.init();
                                        resolve(resp);
                                    }
                                });
                            });
                        }));

                    case 18:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
};
/**
 * 获取所有的货币余额
 */
exports.getAllBalance = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var msg;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        msg = { type: 'wallet/account@get', param: { list: "[" + CurrencyType.KT + ", " + CurrencyType.ETH + "]" } };
                        return _context4.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
};
/**
 * 获取指定类型的货币余额
 */
exports.getBalance = function (currencyType) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var msg;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        msg = { type: 'wallet/account@get', param: { list: "[" + currencyType + "]" } };
                        return _context5.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));
};
/**
 * 获取分红汇总信息
 */
exports.getDividend = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var msg;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_bonus_total', param: {} };
                        return _context6.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));
};
/**
 * 获取挖矿汇总信息
 */
exports.getMining = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var msg;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_mine_total', param: {} };
                        return _context7.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));
};
/**
 * 获取挖矿历史记录
 */
exports.getMiningHistory = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var msg;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_pool_detail', param: {} };
                        return _context8.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));
};
/**
 * 获取邀请红包码
 */
exports.getInviteCode = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var msg;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_invite_code', param: {} };
                        return _context9.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));
};
/**
 * 兑换邀请红包
 */
exports.inputInviteCdKey = function (code) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var msg;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@input_cd_key', param: { code: code } };
                        return _context10.abrupt("return", exports.requestLogined(msg));

                    case 2:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));
};
/**
 * 获取邀请红包领取明细
 */
exports.getInviteCodeDetail = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var msg;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_invite_code_detail', param: {} };
                        return _context11.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, this);
    }));
};
/**
 * 发送红包
 * @param rtype 红包类型
 * @param ctype 货币类型
 * @param totalAmount 总金额
 * @param count 红包数量
 * @param lm 留言
 */
exports.sendRedEnvlope = function (rtype, ctype, totalAmount, redEnvelopeNumber, lm) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var msg;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        msg = {
                            type: 'emit_red_bag',
                            param: {
                                type: rtype,
                                priceType: ctype,
                                totalPrice: tools_1.largeUnit2SmallUnit(exports.CurrencyTypeReverse[ctype], totalAmount),
                                count: redEnvelopeNumber,
                                desc: lm
                            }
                        };
                        return _context12.abrupt("return", exports.requestLogined(msg));

                    case 2:
                    case "end":
                        return _context12.stop();
                }
            }
        }, _callee12, this);
    }));
};
/**
 * 兑换红包
 */
exports.convertRedBag = function (cid) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var msg;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        msg = { type: 'convert_red_bag', param: { cid: cid } };
                        return _context13.abrupt("return", exports.requestLogined(msg));

                    case 2:
                    case "end":
                        return _context13.stop();
                }
            }
        }, _callee13, this);
    }));
};
/**
 * 获取红包留言
 * @param cid 兑换码
 */
exports.queryRedBagDesc = function (cid) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var msg;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        msg = {
                            type: 'query_red_bag_desc',
                            param: {
                                cid: cid
                            }
                        };
                        return _context14.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));
};
/**
 * 查询发送红包记录
 */
exports.querySendRedEnvelopeRecord = function (start) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var msg;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        msg = void 0;

                        if (start) {
                            msg = {
                                type: 'query_emit_log',
                                param: {
                                    start: start,
                                    count: exports.recordNumber
                                }
                            };
                        } else {
                            msg = {
                                type: 'query_emit_log',
                                param: {
                                    count: exports.recordNumber
                                }
                            };
                        }
                        return _context15.abrupt("return", exports.requestAsync(msg));

                    case 3:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, this);
    }));
};
/**
 * 查询红包兑换记录
 */
exports.queryConvertLog = function (start) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var msg;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        msg = void 0;

                        if (start) {
                            msg = {
                                type: 'query_convert_log',
                                param: {
                                    start: start,
                                    count: exports.recordNumber
                                }
                            };
                        } else {
                            msg = {
                                type: 'query_convert_log',
                                param: {
                                    count: exports.recordNumber
                                }
                            };
                        }
                        return _context16.abrupt("return", exports.requestAsync(msg));

                    case 3:
                    case "end":
                        return _context16.stop();
                }
            }
        }, _callee16, this);
    }));
};
exports.queryDetailLog = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var msg;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        msg = {
                            type: 'query_detail_log',
                            param: {
                                cids: 'J8VIXY,LQRNZV,27KP71'
                            }
                        };
                        return _context17.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));
};
/**
 * 挖矿
 */
exports.getAward = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var msg;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_award', param: {} };
                        return _context18.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context18.stop();
                }
            }
        }, _callee18, this);
    }));
};
/**
 * 矿山增加记录
 */
exports.getMineDetail = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var msg;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@grant_detail', param: {} };
                        return _context19.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context19.stop();
                }
            }
        }, _callee19, this);
    }));
};
/**
 * 获取分红历史记录
 */
exports.getDividHistory = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        var msg;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_bonus_info', param: {} };
                        return _context20.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context20.stop();
                }
            }
        }, _callee20, this);
    }));
};
/**
 * 设置客户端数据
 */
exports.setData = function (param) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        var msg;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        msg = { type: 'wallet/data@set', param: param };
                        return _context21.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context21.stop();
                }
            }
        }, _callee21, this);
    }));
};
/**
 * 获取客户端数据
 */
exports.getData = function (key) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        var msg;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        msg = { type: 'wallet/data@get', param: { key: key } };
                        return _context22.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context22.stop();
                }
            }
        }, _callee22, this);
    }));
};
/**
 * 设置用户基础信息
 */
exports.setUserInfo = function (value) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        var msg;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        msg = { type: 'wallet/user@set_info', param: { value: value } };
                        return _context23.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context23.stop();
                }
            }
        }, _callee23, this);
    }));
};
/**
 * 批量获取用户信息
 */
exports.getUserInfo = function (uids) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        var msg;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        msg = { type: 'wallet/user@get_infos', param: { list: "[" + uids.toString() + "]" } };
                        return _context24.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context24.stop();
                }
            }
        }, _callee24, this);
    }));
};
/**
 * 批量获取用户信息
 */
exports.doChat = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
        var msg;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
            while (1) {
                switch (_context25.prev = _context25.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@chat', param: {} };
                        return _context25.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context25.stop();
                }
            }
        }, _callee25, this);
    }));
};
/**
 * 获取指定货币流水
 */
exports.getAccountDetail = function (coin) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
        var msg;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
            while (1) {
                switch (_context26.prev = _context26.next) {
                    case 0:
                        msg = { type: 'wallet/account@get_detail', param: { coin: coin } };
                        return _context26.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context26.stop();
                }
            }
        }, _callee26, this);
    }));
};
/**
 * 获取矿山排名列表
 */
exports.getMineRank = function (num) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
        var msg;
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
                switch (_context27.prev = _context27.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@mine_top', param: { num: num } };
                        return _context27.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context27.stop();
                }
            }
        }, _callee27, this);
    }));
};
/**
 * 获取挖矿排名列表
 */
exports.getMiningRank = function (num) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee28() {
        var msg;
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
            while (1) {
                switch (_context28.prev = _context28.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_mine_top', param: { num: num } };
                        return _context28.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context28.stop();
                }
            }
        }, _callee28, this);
    }));
};
/**
 * 发送验证码
 */
exports.sendCode = function (phone, num) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
        var msg;
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
            while (1) {
                switch (_context29.prev = _context29.next) {
                    case 0:
                        msg = { type: 'wallet/sms@send_sms_code', param: { phone: phone, num: num, name: '钱包' } };
                        return _context29.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context29.stop();
                }
            }
        }, _callee29, this);
    }));
};
/**
 * 注册手机
 */
exports.regPhone = function (phone, code) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
        var msg;
        return regeneratorRuntime.wrap(function _callee30$(_context30) {
            while (1) {
                switch (_context30.prev = _context30.next) {
                    case 0:
                        msg = { type: 'wallet/user@reg_phone', param: { phone: phone, code: code } };
                        return _context30.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context30.stop();
                }
            }
        }, _callee30, this);
    }));
};
/**
 * 获取代理
 */
exports.getProxy = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
        var msg;
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
            while (1) {
                switch (_context31.prev = _context31.next) {
                    case 0:
                        msg = { type: 'wallet/proxy@get_proxy', param: {} };
                        return _context31.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context31.stop();
                }
            }
        }, _callee31, this);
    }));
};
})