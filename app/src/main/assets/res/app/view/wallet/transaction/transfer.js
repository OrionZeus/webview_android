_$define("app/view/wallet/transaction/transfer", function (require, exports, module){
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
 * 处理转账逻辑
 */
var qrcode_1 = require("../../../../pi/browser/qrcode");
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var api_1 = require("../../../core/btc/api");
var wallet_1 = require("../../../core/btc/wallet");
var api_2 = require("../../../core/eth/api");
var tokens_1 = require("../../../core/eth/tokens");
var wallet_2 = require("../../../core/eth/wallet");
var globalWallet_1 = require("../../../core/globalWallet");
var dataCenter_1 = require("../../../store/dataCenter");
var tools_1 = require("../../../utils/tools");

var AddAsset = function (_widget_1$Widget) {
    _inherits(AddAsset, _widget_1$Widget);

    function AddAsset() {
        _classCallCheck(this, AddAsset);

        return _possibleConstructorReturn(this, (AddAsset.__proto__ || Object.getPrototypeOf(AddAsset)).call(this));
    }

    _createClass(AddAsset, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(AddAsset.prototype.__proto__ || Object.getPrototypeOf(AddAsset.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                title: '转账',
                to: '',
                pay: 0,
                payConversion: "0.00",
                gasPrice: 4000000000,
                gasLimit: 21000,
                fees: 0,
                feesConversion: '',
                info: '',
                showNote: tokens_1.ERC20Tokens[this.props.currencyName] ? false : true
            };
            // todo 这是测试地址
            if (this.props.currencyName === 'ETH') {
                // this.state.to = '0xa6e83b630BF8AF41A9278427b6F2A35dbC5f20e3';
            } else if (this.props.currencyName === 'BTC') {
                // this.state.to = 'mw8VtNKY81RjLz52BqxUkJx57pcsQe4eNB';
                this.state.gasPrice = 10;
                // const defaultToAddr = 'mw8VtNKY81RjLz52BqxUkJx57pcsQe4eNB';
                // const defaultAmount = 0.001;
                // this.getBtcTransactionFee(defaultToAddr, defaultAmount).then(fee => {
                //     this.state.gasPrice = fee;
                //     this.state.gasLimit = 1;
                //     this.resetFees();
                // });
            } else if (tokens_1.ERC20Tokens[this.props.currencyName]) {
                this.state.gasLimit = 81000;
            }
            this.resetFees();
        }
        /**
         * 处理关闭
         */

    }, {
        key: "doClose",
        value: function doClose() {
            this.ok && this.ok();
        }
        /**
         * 处理下一步
         */

    }, {
        key: "doNext",
        value: function doNext() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var loading, fromAddr, toAddr, gasPrice, gasLimit, pay, info, currencyName, wallets, wallet, passwd, addrIndex, id, wlt;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.state.to) {
                                    _context.next = 3;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { itype: 'warn', content: '请输入收款地址', center: true });
                                return _context.abrupt("return");

                            case 3:
                                if (this.state.pay) {
                                    _context.next = 6;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { itype: 'warn', content: '请输入转账金额', center: true });
                                return _context.abrupt("return");

                            case 6:
                                loading = root_1.popNew('pi-components-loading-loading', { text: '交易中...' });
                                _context.prev = 7;
                                fromAddr = this.props.fromAddr;
                                toAddr = this.state.to;
                                gasPrice = this.state.gasPrice;
                                gasLimit = this.state.gasLimit;
                                pay = this.state.pay;
                                info = this.state.info;
                                currencyName = this.props.currencyName;
                                wallets = tools_1.getLocalStorage('wallets');
                                wallet = tools_1.getCurrentWallet(wallets);
                                passwd = void 0;

                                if (dataCenter_1.dataCenter.getHash(wallet.walletId)) {
                                    _context.next = 22;
                                    break;
                                }

                                _context.next = 21;
                                return tools_1.openBasePage('app-components-message-messageboxPrompt', {
                                    title: '输入密码', content: '', inputType: 'password'
                                });

                            case 21:
                                passwd = _context.sent;

                            case 22:
                                addrIndex = globalWallet_1.GlobalWallet.getWltAddrIndex(wallet, fromAddr, currencyName);

                                if (!(addrIndex >= 0)) {
                                    _context.next = 47;
                                    break;
                                }

                                id = void 0;
                                _context.next = 27;
                                return globalWallet_1.GlobalWallet.createWlt(currencyName, passwd, wallet, addrIndex);

                            case 27:
                                wlt = _context.sent;

                                if (!(currencyName === 'ETH')) {
                                    _context.next = 34;
                                    break;
                                }

                                _context.next = 31;
                                return doEthTransfer(wlt, fromAddr, toAddr, gasPrice, gasLimit, tools_1.eth2Wei(pay), info);

                            case 31:
                                id = _context.sent;
                                _context.next = 44;
                                break;

                            case 34:
                                if (!(currencyName === 'BTC')) {
                                    _context.next = 40;
                                    break;
                                }

                                _context.next = 37;
                                return doBtcTransfer(wlt, fromAddr, toAddr, gasPrice, gasLimit, pay, info);

                            case 37:
                                id = _context.sent;
                                _context.next = 44;
                                break;

                            case 40:
                                if (!tokens_1.ERC20Tokens[currencyName]) {
                                    _context.next = 44;
                                    break;
                                }

                                _context.next = 43;
                                return doERC20TokenTransfer(wlt, fromAddr, toAddr, gasPrice, gasLimit, pay, currencyName);

                            case 43:
                                id = _context.sent;

                            case 44:
                                // 打开交易详情界面
                                this.showTransactionDetails(id);
                                this.doClose();
                                this.topContactAdd(toAddr, currencyName);

                            case 47:
                                _context.next = 53;
                                break;

                            case 49:
                                _context.prev = 49;
                                _context.t0 = _context["catch"](7);

                                console.log(_context.t0.message);
                                if (_context.t0.message.indexOf('insufficient funds') >= 0) {
                                    root_1.popNew('app-components-message-message', { itype: 'error', content: '余额不足', center: true });
                                } else {
                                    root_1.popNew('app-components-message-message', { itype: 'error', content: _context.t0.message, center: true });
                                }

                            case 53:
                                loading.callback(loading.widget);

                            case 54:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[7, 49]]);
            }));
        }
        /**
         * 收款地址改变
         */

    }, {
        key: "onToChange",
        value: function onToChange(e) {
            this.state.to = e.value;
        }
        /**
         * 收款金额改变
         */

    }, {
        key: "onPayChange",
        value: function onPayChange(e) {
            var num = parseFloat(e.value) || 0;
            this.state.pay = num;
            // tslint:disable-next-line:max-line-length
            var r = tools_1.effectiveCurrencyStableConversion(num, tokens_1.ERC20Tokens[this.props.currencyName] ? 'ETH' : this.props.currencyName, 'CNY', false);
            this.state.payConversion = r.conversionShow;
            this.paint();
        }
        /**
         * 备注信息改变
         */

    }, {
        key: "onInfoChange",
        value: function onInfoChange(e) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var api, gas;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.state.info = e.value;
                                api = new api_2.Api();
                                _context2.next = 4;
                                return api.estimateGas({ to: '0x9cd1a1031dd7125a80c7d121ae5b17bc39a77ef7', data: '0x123456' });

                            case 4:
                                gas = _context2.sent;

                                console.log(gas);

                            case 6:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        /**
         * gas费用改变
         */

    }, {
        key: "onGasFeeChange",
        value: function onGasFeeChange(e) {
            var val = Number(e.value);
            this.state.fees = val;
            // tslint:disable-next-line:max-line-length
            var r = tools_1.effectiveCurrencyStableConversion(val, tokens_1.ERC20Tokens[this.props.currencyName] ? 'ETH' : this.props.currencyName, 'CNY', false);
            this.state.feesConversion = r.conversionShow;
            this.paint();
        }
        /**
         * 显示交易详情
         */

    }, {
        key: "showTransactionDetails",
        value: function showTransactionDetails(id) {
            var t = new Date();
            var record = {
                id: id,
                type: '转账',
                fromAddr: this.props.fromAddr,
                to: this.state.to,
                pay: this.state.pay,
                time: t.getTime(),
                showTime: tools_1.parseDate(t),
                result: '交易中',
                info: this.state.info || '无',
                currencyName: this.props.currencyName,
                tip: this.state.fees
            };
            root_1.popNew('app-view-wallet-transaction-transaction_details', record);
            addRecord(this.props.currencyName, this.props.fromAddr, record);
        }
        /**
         * 处理扫描
         */

    }, {
        key: "doScan",
        value: function doScan() {
            var _this2 = this;

            var qrcode = new qrcode_1.QRCode();
            qrcode.init();
            qrcode.scan({
                success: function success(addr) {
                    var r = tools_1.effectiveAddr(_this2.props.currencyName, addr);
                    if (r[0]) {
                        var amount = tools_1.urlParams(addr, 'amount');
                        if (amount) {
                            var num = parseFloat(amount);
                            _this2.state.pay = num;
                            // tslint:disable-next-line:max-line-length
                            var t = tools_1.effectiveCurrencyStableConversion(num, tokens_1.ERC20Tokens[_this2.props.currencyName] ? 'ETH' : _this2.props.currencyName, 'CNY', false);
                            _this2.state.payConversion = t.conversionShow;
                        }
                        _this2.state.to = r[1];
                        _this2.paint();
                    } else {
                        root_1.popNew('app-components-message-message', { itype: 'error', content: '无效的地址', center: true });
                    }
                    // alert(`scan result:${r}`);
                },
                fail: function fail(r) {
                    // alert(`scan fail:${r}`);
                    console.log("scan fail:" + r);
                }
            });
            qrcode.close({
                success: function success(r) {
                    // alert(`close result:${r}`);
                    console.log("close result:" + r);
                }
            });
        }
        /**
         * 判断收款地址是否为常用联系人,不是则提示加入常用联系人
         */

    }, {
        key: "topContactAdd",
        value: function topContactAdd(addresse, currencyName) {
            if (!currencyName) {
                return;
            }
            var isExist = false;
            var topContacts = dataCenter_1.dataCenter.getTopContacts(this.props.currencyName);
            for (var i = 0; i < topContacts.length; i++) {
                var v = topContacts[i];
                if (v.addresse === addresse && v.currencyName === currencyName) {
                    isExist = true;
                    break;
                } else {
                    isExist = false;
                }
            }
            if (isExist) {
                return;
            } else {
                // 不存在常用联系人，提示是否添加
                root_1.popNew('app-view-mine-addressManage-messagebox', {
                    mType: 'confirm', title: '是否添加联系人', text: '是否将此收币地址添加为常用地址', input1DefaultValue: addresse
                }, function (data) {
                    var addresse = data.addresse;
                    var tags = data.tags;
                    if (!tags) {
                        tags = '默认地址';
                    }
                    dataCenter_1.dataCenter.addTopContacts(currencyName, addresse, tags);
                    root_1.popNew('app-components-message-message', { itype: 'success', content: '添加常用联系人成功！', center: true });
                });
            }
        }
    }, {
        key: "resetFees",
        value: function resetFees() {
            var price = this.state.gasPrice;
            // tslint:disable-next-line:max-line-length
            var r = tools_1.effectiveCurrencyStableConversion(price * this.state.gasLimit, tokens_1.ERC20Tokens[this.props.currencyName] ? 'ETH' : this.props.currencyName, 'CNY', true);
            this.state.fees = r.num;
            this.state.feesConversion = r.conversionShow;
            this.paint();
        }
        // tslint:disable-next-line:only-arrow-functions

    }, {
        key: "getBtcTransactionFee",
        value: function getBtcTransactionFee(toAddr, amount) {
            var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'medium';

            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var addrInfo, output, wlt, retArr;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                addrInfo = tools_1.getCurrentAddrInfo('BTC');
                                output = {
                                    toAddr: toAddr,
                                    amount: amount,
                                    chgAddr: addrInfo.addr
                                };
                                wlt = wallet_1.BTCWallet.fromJSON(addrInfo.wlt);

                                wlt.unlock();
                                _context3.next = 6;
                                return wlt.init();

                            case 6:
                                _context3.next = 8;
                                return wlt.buildRawTransaction(output, priority);

                            case 8:
                                retArr = _context3.sent;

                                wlt.lock();
                                return _context3.abrupt("return", retArr[1]);

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);

    return AddAsset;
}(widget_1.Widget);

exports.AddAsset = AddAsset;
/**
 * 添加记录
 */
var addRecord = function addRecord(currencyName, currentAddr, record) {
    var addr = tools_1.getAddrById(currentAddr, currencyName);
    if (!addr) return;
    addr.record.push(record);
    tools_1.resetAddrById(currentAddr, currencyName, addr, true);
};
/**
 * 处理转账
 */
// tslint:disable-next-line:only-arrow-functions
function doEthTransfer(wlt, acct1, acct2, gasPrice, gasLimit, value, info) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var api, nonce, txObj, tx, id;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        api = new api_2.Api();
                        _context4.next = 3;
                        return api.getTransactionCount(acct1);

                    case 3:
                        nonce = _context4.sent;
                        txObj = {
                            to: acct2,
                            nonce: nonce,
                            gasPrice: gasPrice,
                            gasLimit: gasLimit,
                            value: value,
                            data: info
                        };
                        // const currentAddr = getAddrById(acct1, 'ETH');
                        // if (!currentAddr) return;
                        // const wlt = EthWallet.fromJSON(currentAddr.wlt);

                        tx = wlt.signRawTransaction(txObj);
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        _context4.next = 8;
                        return api.sendRawTransaction(tx);

                    case 8:
                        id = _context4.sent;
                        return _context4.abrupt("return", id);

                    case 10:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
}
/**
 * 处理转账
 */
// tslint:disable-next-line:only-arrow-functions
function doBtcTransfer(wlt, acct1, acct2, gasPrice, gasLimit, value, info) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var addrs, addr, output, retArr, rawHexString, fee, hash;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        addrs = tools_1.getLocalStorage('addrs');
                        addr = addrs.filter(function (v) {
                            return v.addr === acct1;
                        })[0];
                        output = {
                            toAddr: acct2,
                            amount: value,
                            chgAddr: acct1
                        };

                        wlt.unlock();
                        _context5.next = 6;
                        return wlt.init();

                    case 6:
                        _context5.next = 8;
                        return wlt.buildRawTransaction(output, 'medium');

                    case 8:
                        retArr = _context5.sent;

                        wlt.lock();
                        rawHexString = retArr[0];
                        fee = retArr[1];
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        _context5.next = 14;
                        return api_1.BtcApi.sendRawTransaction(rawHexString);

                    case 14:
                        hash = _context5.sent;
                        return _context5.abrupt("return", hash.txid);

                    case 16:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));
}
/**
 * 处理eth代币转账
 */
// tslint:disable-next-line:only-arrow-functions
function doERC20TokenTransfer(wlt, acct1, acct2, gasPrice, gasLimit, value, currencyName) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var api, nonce, transferCode, txObj, tx, id;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        api = new api_2.Api();
                        _context6.next = 3;
                        return api.getTransactionCount(acct1);

                    case 3:
                        nonce = _context6.sent;

                        console.log('nonce', nonce);
                        transferCode = wallet_2.EthWallet.tokenOperations('transfer', currencyName, acct2, tools_1.ethTokenMultiplyDecimals(value, currencyName));
                        txObj = {
                            to: tokens_1.ERC20Tokens[currencyName],
                            nonce: nonce,
                            gasPrice: gasPrice,
                            gasLimit: gasLimit,
                            value: 0,
                            data: transferCode
                        };
                        // const currentAddr = getAddrById(acct1, currencyName);
                        // if (!currentAddr) return;
                        // const wlt = EthWallet.fromJSON(currentAddr.wlt);

                        tx = wlt.signRawTransaction(txObj);
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        _context6.next = 10;
                        return api.sendRawTransaction(tx);

                    case 10:
                        id = _context6.sent;
                        return _context6.abrupt("return", id);

                    case 12:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));
}
})