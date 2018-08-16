_$define("app/utils/basicOperation", function (require, exports, module){
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
 * 基础操作
 */
var globalWallet_1 = require("../core/globalWallet");
var conMgr_1 = require("../store/conMgr");
var dataCenter_1 = require("../store/dataCenter");
var account_1 = require("./account");
var constants_1 = require("./constants");
var tools_1 = require("./tools");
/**
 * 通过助记词导入钱包
 */
exports.importWalletByMnemonic = function (mnemonic, psw, pswTips) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _wallet$currencyRecor, _addrs;

        var wallets, addrs, gwlt, len, i, _ret, curWalletId, wallet;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        wallets = tools_1.getLocalStorage('wallets') || { walletList: [], curWalletId: '', salt: dataCenter_1.dataCenter.salt };
                        addrs = tools_1.getLocalStorage('addrs') || [];
                        gwlt = null;

                        console.time('import');
                        _context.next = 6;
                        return globalWallet_1.GlobalWallet.fromMnemonic(mnemonic, psw);

                    case 6:
                        gwlt = _context.sent;

                        console.timeEnd('import');
                        // 判断钱包是否存在
                        len = wallets.walletList.length;

                        if (!wallets.walletList.some(function (v) {
                            return v.walletId === gwlt.glwtId;
                        })) {
                            _context.next = 22;
                            break;
                        }

                        _context.next = 12;
                        return tools_1.openBasePage('app-components-message-messagebox', { itype: 'confirm', title: '提示', content: '该钱包已存在，是否使用新密码' });

                    case 12:
                        i = len - 1;

                    case 13:
                        if (!(i >= 0)) {
                            _context.next = 21;
                            break;
                        }

                        if (!(gwlt.glwtId === wallets.walletList[i].walletId)) {
                            _context.next = 18;
                            break;
                        }

                        _ret = function () {
                            var wallet0 = wallets.walletList.splice(i, 1)[0]; // 删除已存在钱包
                            var retAddrs = tools_1.getAddrsAll(wallet0);
                            addrs = addrs.filter(function (addr) {
                                return retAddrs.indexOf(addr.addr) === -1;
                            });
                            return "break";
                        }();

                        if (!(_ret === "break")) {
                            _context.next = 18;
                            break;
                        }

                        return _context.abrupt("break", 21);

                    case 18:
                        i--;
                        _context.next = 13;
                        break;

                    case 21:
                        len--;

                    case 22:
                        gwlt.nickName = "\u6211\u7684\u94B1\u5305" + (len + 1);
                        curWalletId = gwlt.glwtId;
                        wallet = {
                            walletId: curWalletId,
                            avatar: account_1.getAvatarRandom(),
                            gwlt: gwlt.toJSON(),
                            showCurrencys: constants_1.defalutShowCurrencys,
                            currencyRecords: []
                        };

                        (_wallet$currencyRecor = wallet.currencyRecords).push.apply(_wallet$currencyRecor, _toConsumableArray(gwlt.currencyRecords));
                        if (pswTips.trim().length > 0) {
                            wallet.walletPswTips = tools_1.encrypt(pswTips.trim());
                        }
                        (_addrs = addrs).push.apply(_addrs, _toConsumableArray(gwlt.addrs));
                        tools_1.setLocalStorage('addrs', addrs, false);
                        wallets.curWalletId = curWalletId;
                        wallets.walletList.push(wallet);
                        tools_1.setLocalStorage('wallets', wallets, true);
                        conMgr_1.openAndGetRandom();

                    case 33:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
})