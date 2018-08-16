_$define("app/view/mine/walletManagement/walletManagement", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
 * my wallet
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var globalWallet_1 = require("../../../core/globalWallet");
var conMgr_1 = require("../../../store/conMgr");
var dataCenter_1 = require("../../../store/dataCenter");
var store_1 = require("../../../store/store");
var account_1 = require("../../../utils/account");
var tools_1 = require("../../../utils/tools");

var WalletManagement = function (_widget_1$Widget) {
    _inherits(WalletManagement, _widget_1$Widget);

    function WalletManagement() {
        _classCallCheck(this, WalletManagement);

        var _this = _possibleConstructorReturn(this, (WalletManagement.__proto__ || Object.getPrototypeOf(WalletManagement)).call(this));

        _this.registerWalletsFun = function (wallets) {
            var wallet = tools_1.getWalletByWalletId(wallets, _this.props.walletId);
            if (!wallet) return;
            var gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
            var pswTips = '';
            if (wallet.walletPswTips) {
                pswTips = tools_1.decrypt(wallet.walletPswTips);
            }
            pswTips = pswTips.length > 0 ? pswTips : '无';
            _this.state.mnemonicBackup = gwlt.mnemonicBackup;
            _this.state.pswTips = pswTips;
            _this.paint();
        };
        /**
         * 总资产更新
         */
        _this.registerAddrsFun = function (addrs) {
            var wallets = tools_1.getLocalStorage('wallets');
            var wallet = tools_1.getWalletByWalletId(wallets, _this.props.walletId);
            if (!wallet) return;
            _this.state.totalAssets = tools_1.formatBalanceValue(tools_1.fetchTotalAssets());
            _this.paint();
        };
        return _this;
    }

    _createClass(WalletManagement, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(WalletManagement.prototype.__proto__ || Object.getPrototypeOf(WalletManagement.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            store_1.register('wallets', this.registerWalletsFun);
            store_1.register('addrs', this.registerAddrsFun);
            var wallets = tools_1.getLocalStorage('wallets');
            var wallet = tools_1.getWalletByWalletId(wallets, this.props.walletId);
            var gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
            var pswTips = '';
            if (wallet.walletPswTips) {
                pswTips = tools_1.decrypt(wallet.walletPswTips);
            }
            pswTips = pswTips.length > 0 ? pswTips : '无';
            this.state = {
                wallet: wallet,
                gwlt: gwlt,
                showPswTips: false,
                pswTips: pswTips,
                mnemonicBackup: gwlt.mnemonicBackup,
                isUpdatingWalletName: false,
                isUpdatingPswTips: false,
                totalAssets: 0.00
            };
            this.registerAddrsFun();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            store_1.unregister('wallets', this.registerWalletsFun);
            store_1.unregister('addrs', this.registerAddrsFun);
            return _get(WalletManagement.prototype.__proto__ || Object.getPrototypeOf(WalletManagement.prototype), "destroy", this).call(this);
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.pageClick();
            this.ok && this.ok();
        }
    }, {
        key: "pswTipsClick",
        value: function pswTipsClick() {
            if (this.state.isUpdatingWalletName || this.state.isUpdatingPswTips) {
                this.pageClick();
                return;
            }
            this.state.showPswTips = !this.state.showPswTips;
            this.paint();
        }
    }, {
        key: "exportPrivateKeyClick",
        value: function exportPrivateKeyClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var close, wallets, wallet, passwd, mnemonic;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(this.state.isUpdatingWalletName || this.state.isUpdatingPswTips)) {
                                    _context.next = 3;
                                    break;
                                }

                                this.pageClick();
                                return _context.abrupt("return");

                            case 3:
                                close = root_1.popNew('pi-components-loading-loading', { text: '导出私钥中...' });
                                _context.prev = 4;
                                wallets = tools_1.getLocalStorage('wallets');
                                wallet = tools_1.getWalletByWalletId(wallets, this.props.walletId);
                                passwd = void 0;

                                if (dataCenter_1.dataCenter.getHash(wallet.walletId)) {
                                    _context.next = 12;
                                    break;
                                }

                                _context.next = 11;
                                return tools_1.openBasePage('app-components-message-messageboxPrompt', {
                                    title: '输入密码', content: '', inputType: 'password'
                                });

                            case 11:
                                passwd = _context.sent;

                            case 12:
                                _context.next = 14;
                                return tools_1.getMnemonic(wallet, passwd);

                            case 14:
                                mnemonic = _context.sent;

                                if (mnemonic) {
                                    root_1.popNew('app-view-mine-exportPrivateKey-exportPrivateKey', { mnemonic: mnemonic, walletId: this.props.walletId });
                                } else {
                                    root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });
                                }
                                _context.next = 22;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.t0 = _context["catch"](4);

                                console.log(_context.t0);
                                root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });

                            case 22:
                                close.callback(close.widget);

                            case 23:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[4, 18]]);
            }));
        }
    }, {
        key: "bindPhone",
        value: function bindPhone() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(this.state.isUpdatingWalletName || this.state.isUpdatingPswTips)) {
                                    _context2.next = 3;
                                    break;
                                }

                                this.pageClick();
                                return _context2.abrupt("return");

                            case 3:
                                root_1.popNew('app-view-cloud-cloudAccount-bindPhone', {});

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "walletNameInputFocus",
        value: function walletNameInputFocus() {
            this.state.isUpdatingWalletName = true;
        }
    }, {
        key: "walletNameInputBlur",
        value: function walletNameInputBlur(e) {
            var v = e.currentTarget.value.trim();
            var input = document.querySelector('#walletNameInput');
            if (!account_1.walletNameAvailable(v)) {
                root_1.popNew('app-components-message-message', { itype: 'error', content: '钱包名长度为1-24位', center: true });
                input.value = this.state.gwlt.nickName;
                this.state.isUpdatingWalletName = false;
                return;
            }
            if (v !== this.state.gwlt.nickName) {
                this.state.gwlt.nickName = v;
                var wallets = tools_1.getLocalStorage('wallets');
                var wallet = tools_1.getWalletByWalletId(wallets, this.props.walletId);
                // const addr0 = wallet.currencyRecords[0].addrs[0];
                var gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
                gwlt.nickName = v;
                wallet.gwlt = gwlt.toJSON();
                tools_1.setLocalStorage('wallets', wallets, true);
            }
            input.value = v;
            this.state.isUpdatingWalletName = false;
        }
    }, {
        key: "pswTipsInputFocus",
        value: function pswTipsInputFocus() {
            this.state.isUpdatingPswTips = true;
        }
    }, {
        key: "pswTipsInputBlur",
        value: function pswTipsInputBlur() {
            var pswTipsInput = document.querySelector('#pswTipsInput');
            var value = pswTipsInput.value;
            var wallets = tools_1.getLocalStorage('wallets');
            var wallet = tools_1.getWalletByWalletId(wallets, this.props.walletId);
            wallet.walletPswTips = tools_1.encrypt(value);
            tools_1.setLocalStorage('wallets', wallets, true);
            this.state.isUpdatingPswTips = false;
        }
    }, {
        key: "pageClick",
        value: function pageClick() {
            if (this.state.isUpdatingWalletName) {
                var walletNameInput = document.querySelector('#walletNameInput');
                walletNameInput.blur();
                return;
            }
            if (this.state.isUpdatingPswTips) {
                var pswTipsInput = document.querySelector('#pswTipsInput');
                pswTipsInput.blur();
                return;
            }
        }
        /**
         * 备份助记词
         */

    }, {
        key: "backupMnemonic",
        value: function backupMnemonic() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var close, wallets, wallet, passwd, mnemonic;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(this.state.isUpdatingWalletName || this.state.isUpdatingPswTips)) {
                                    _context3.next = 3;
                                    break;
                                }

                                this.pageClick();
                                return _context3.abrupt("return");

                            case 3:
                                close = root_1.popNew('pi-components-loading-loading', { text: '导出中...' });
                                _context3.prev = 4;
                                wallets = tools_1.getLocalStorage('wallets');
                                wallet = tools_1.getWalletByWalletId(wallets, this.props.walletId);
                                passwd = void 0;

                                if (dataCenter_1.dataCenter.getHash(wallet.walletId)) {
                                    _context3.next = 12;
                                    break;
                                }

                                _context3.next = 11;
                                return tools_1.openBasePage('app-components-message-messageboxPrompt', {
                                    title: '输入密码', content: '', inputType: 'password'
                                });

                            case 11:
                                passwd = _context3.sent;

                            case 12:
                                _context3.next = 14;
                                return tools_1.getMnemonic(wallet, passwd);

                            case 14:
                                mnemonic = _context3.sent;

                                if (mnemonic) {
                                    root_1.popNew('app-view-wallet-backupWallet-backupMnemonicWord', { mnemonic: mnemonic, passwd: passwd, walletId: this.props.walletId });
                                } else {
                                    root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });
                                }
                                _context3.next = 22;
                                break;

                            case 18:
                                _context3.prev = 18;
                                _context3.t0 = _context3["catch"](4);

                                console.log(_context3.t0);
                                root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入111', center: true });

                            case 22:
                                close.callback(close.widget);

                            case 23:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[4, 18]]);
            }));
        }
        /**
         * 显示群钱包
         */

    }, {
        key: "showGroupWallet",
        value: function showGroupWallet() {
            if (this.state.isUpdatingWalletName || this.state.isUpdatingPswTips) {
                this.pageClick();
                return;
            }
            root_1.popNew('app-view-groupwallet-groupwallet');
        }
        /**
         * 修改密码
         */

    }, {
        key: "changePasswordClick",
        value: function changePasswordClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var close, wallets, wallet, passwd, isEffective;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(this.state.isUpdatingWalletName || this.state.isUpdatingPswTips)) {
                                    _context4.next = 3;
                                    break;
                                }

                                this.pageClick();
                                return _context4.abrupt("return");

                            case 3:
                                close = root_1.popNew('pi-components-loading-loading', { text: '加载中...' });
                                _context4.prev = 4;
                                wallets = tools_1.getLocalStorage('wallets');
                                wallet = tools_1.getWalletByWalletId(wallets, this.props.walletId);
                                passwd = void 0;

                                if (dataCenter_1.dataCenter.getHash(wallet.walletId)) {
                                    _context4.next = 12;
                                    break;
                                }

                                _context4.next = 11;
                                return tools_1.openBasePage('app-components-message-messageboxPrompt', {
                                    title: '输入密码', content: '', inputType: 'password'
                                });

                            case 11:
                                passwd = _context4.sent;

                            case 12:
                                _context4.next = 14;
                                return tools_1.VerifyIdentidy(wallet, passwd);

                            case 14:
                                isEffective = _context4.sent;

                                if (isEffective) {
                                    root_1.popNew('app-view-mine-changePassword-changePassword', { passwd: passwd, walletId: this.props.walletId });
                                } else {
                                    root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });
                                }
                                _context4.next = 22;
                                break;

                            case 18:
                                _context4.prev = 18;
                                _context4.t0 = _context4["catch"](4);

                                console.log(_context4.t0);
                                root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });

                            case 22:
                                close.callback(close.widget);

                            case 23:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[4, 18]]);
            }));
        }
        /**
         * 退出钱包
         */

    }, {
        key: "signOutClick",
        value: function signOutClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!(this.state.isUpdatingWalletName || this.state.isUpdatingPswTips)) {
                                    _context5.next = 3;
                                    break;
                                }

                                this.pageClick();
                                return _context5.abrupt("return");

                            case 3:
                                _context5.prev = 3;
                                _context5.next = 6;
                                return tools_1.openBasePage('app-components-message-messagebox', { itype: 'confirm', title: '退出钱包', content: '退出将清除该钱包密码数据' });

                            case 6:
                                dataCenter_1.dataCenter.setHash(this.props.walletId, undefined);
                                root_1.popNew('app-components-message-message', { itype: 'success', content: '退出成功', center: true });
                                _context5.next = 12;
                                break;

                            case 10:
                                _context5.prev = 10;
                                _context5.t0 = _context5["catch"](3);

                            case 12:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[3, 10]]);
            })
            //
            );
        }
        /**
         * 删除钱包
         */

    }, {
        key: "deleteWalletClick",
        value: function deleteWalletClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!(this.state.isUpdatingWalletName || this.state.isUpdatingPswTips)) {
                                    _context6.next = 3;
                                    break;
                                }

                                this.pageClick();
                                return _context6.abrupt("return");

                            case 3:
                                _context6.prev = 3;

                                if (this.state.mnemonicBackup) {
                                    _context6.next = 10;
                                    break;
                                }

                                _context6.next = 7;
                                return tools_1.openBasePage('app-components-message-messagebox', {
                                    itype: 'alert', title: '备份钱包', content: '您还没有备份助记词，这是找回钱包的重要线索，请先备份'
                                });

                            case 7:
                                this.backupMnemonic();
                                _context6.next = 12;
                                break;

                            case 10:
                                _context6.next = 12;
                                return this.deleteWallet();

                            case 12:
                                _context6.next = 16;
                                break;

                            case 14:
                                _context6.prev = 14;
                                _context6.t0 = _context6["catch"](3);

                            case 16:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[3, 14]]);
            })
            //
            );
        }
        /**
         * 删除钱包
         */

    }, {
        key: "deleteWallet",
        value: function deleteWallet() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var close, wallets, wallet, passwd, isEffective, walletIndex, addrs;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return tools_1.openBasePage('app-components-message-messagebox', { itype: 'confirm', title: '删除钱包', content: '删除后需要重新导入，之前的分享也将失效' });

                            case 2:
                                close = root_1.popNew('pi-components-loading-loading', { text: '删除中...' });
                                _context7.prev = 3;
                                wallets = tools_1.getLocalStorage('wallets');
                                wallet = tools_1.getWalletByWalletId(wallets, this.props.walletId);
                                passwd = void 0;

                                if (dataCenter_1.dataCenter.getHash(wallet.walletId)) {
                                    _context7.next = 11;
                                    break;
                                }

                                _context7.next = 10;
                                return tools_1.openBasePage('app-components-message-messageboxPrompt', {
                                    title: '输入密码', content: '', inputType: 'password'
                                });

                            case 10:
                                passwd = _context7.sent;

                            case 11:
                                _context7.next = 13;
                                return tools_1.VerifyIdentidy(wallet, passwd);

                            case 13:
                                isEffective = _context7.sent;

                                if (!isEffective) {
                                    _context7.next = 28;
                                    break;
                                }

                                walletIndex = tools_1.getCurrentWalletIndex(wallets);
                                // 删除地址

                                addrs = tools_1.getAddrsAll(wallet);

                                this.deleteAddrs(addrs);
                                // 移除当前钱包的交易记录
                                this.deleteTransactions(addrs);
                                // 删除钱包
                                wallets.walletList.splice(walletIndex, 1);
                                wallets.curWalletId = wallets.walletList.length > 0 ? wallets.walletList[0].walletId : '';
                                tools_1.setLocalStorage('wallets', wallets, true);
                                _context7.next = 24;
                                return conMgr_1.openAndGetRandom();

                            case 24:
                                this.ok && this.ok(true);
                                root_1.popNew('app-components-message-message', { itype: 'success', content: '删除成功', center: true });
                                _context7.next = 29;
                                break;

                            case 28:
                                root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });

                            case 29:
                                _context7.next = 35;
                                break;

                            case 31:
                                _context7.prev = 31;
                                _context7.t0 = _context7["catch"](3);

                                console.log(_context7.t0);
                                root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });

                            case 35:
                                close.callback(close.widget);

                            case 36:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[3, 31]]);
            }));
        }
        /**
         * 删除addrs中的所有地址
         * @param addrs all need to deleted addrs
         *
         */

    }, {
        key: "deleteAddrs",
        value: function deleteAddrs(delAddrs) {
            var addrs = tools_1.getLocalStorage('addrs');
            var addrsNew = addrs.filter(function (item) {
                return delAddrs.indexOf(item.addr) < 0;
            });
            tools_1.setLocalStorage('addrs', addrsNew);
        }
        /**
         * 移除交易记录
         */

    }, {
        key: "deleteTransactions",
        value: function deleteTransactions(delAddrs) {
            var transactions = tools_1.getLocalStorage('transactions');
            var transactionsNew = transactions.filter(function (item) {
                return delAddrs.indexOf(item.addr) < 0;
            });
            tools_1.setLocalStorage('transactions', transactionsNew);
        }
    }]);

    return WalletManagement;
}(widget_1.Widget);

exports.WalletManagement = WalletManagement;
})