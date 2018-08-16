_$define("app/view/currencyExchange/currencyExchange", function (require, exports, module){
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
 * currency exchange
 */
var shapeshift_1 = require("../../../app/exchange/shapeshift/shapeshift");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../../../app/utils/tools");
var root_1 = require("../../../pi/ui/root");
var widget_1 = require("../../../pi/widget/widget");
var api_1 = require("../../core/btc/api");
var api_2 = require("../../core/eth/api");
var tokens_1 = require("../../core/eth/tokens");
var wallet_1 = require("../../core/eth/wallet");
var globalWallet_1 = require("../../core/globalWallet");
var dataCenter_1 = require("../../store/dataCenter");
var constants_1 = require("../../utils/constants");

var CurrencyExchange = function (_widget_1$Widget) {
    _inherits(CurrencyExchange, _widget_1$Widget);

    function CurrencyExchange() {
        _classCallCheck(this, CurrencyExchange);

        return _possibleConstructorReturn(this, (CurrencyExchange.__proto__ || Object.getPrototypeOf(CurrencyExchange)).apply(this, arguments));
    }

    _createClass(CurrencyExchange, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(CurrencyExchange.prototype.__proto__ || Object.getPrototypeOf(CurrencyExchange.prototype), "setProps", this).call(this, props, oldProps);
            var outCurrency = this.props.currencyName;
            var inCurrency = outCurrency === 'BTC' || tokens_1.ERC20Tokens[outCurrency] ? 'ETH' : 'BTC';
            // ZRX   BAT
            this.state = {
                outCurrency: outCurrency,
                inCurrency: inCurrency,
                gasPrice: 5000000000,
                pair: '',
                maxLimit: 0,
                minimum: 0,
                rate: 0,
                timer: 0,
                outBalance: 0,
                outAmount: 0,
                receiveAmount: 0,
                curOutAddr: '',
                curInAddr: ''
            };
            this.init();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            clearTimeout(this.state.timer);
            return _get(CurrencyExchange.prototype.__proto__ || Object.getPrototypeOf(CurrencyExchange.prototype), "destroy", this).call(this);
        }
    }, {
        key: "init",
        value: function init() {
            this.state.outAmount = 0;
            this.state.receiveAmount = 0;
            this.setPair();
            // 获取出币币种的余额和当前使用地址
            this.state.curOutAddr = tools_1.getCurrentAddrByCurrencyName(this.state.outCurrency);
            this.state.outBalance = tools_1.getCurrentAddrBalanceByCurrencyName(this.state.outCurrency);
            // 获取入币币种的当前使用地址
            this.state.curInAddr = tools_1.getCurrentAddrByCurrencyName(this.state.inCurrency);
            this.marketInfoUpdated();
        }
    }, {
        key: "backClick",
        value: function backClick() {
            this.ok && this.ok();
        }
        // 设置币币兑换的pair  如btc_eth

    }, {
        key: "setPair",
        value: function setPair() {
            this.state.pair = this.state.outCurrency.toLowerCase() + "_" + this.state.inCurrency.toLowerCase();
        }
        // 定时获取兑率等信息 30s更新一次

    }, {
        key: "marketInfoUpdated",
        value: function marketInfoUpdated() {
            var _this2 = this;

            shapeshift_1.shapeshift.marketInfo(this.state.pair, function (err, marketInfo) {
                // console.log('marketInfo',marketInfo);
                if (err) {
                    console.log(err);
                    return;
                }
                _this2.state.maxLimit = marketInfo.maxLimit;
                _this2.state.minimum = marketInfo.minimum;
                _this2.state.rate = marketInfo.rate;
                _this2.paint();
            });
            this.state.timer = setTimeout(function () {
                _this2.marketInfoUpdated();
            }, 30 * 1000);
        }
        // 出币数量变化

    }, {
        key: "outAmountChange",
        value: function outAmountChange(e) {
            var outAmount = Number(e.value);
            this.state.outAmount = outAmount;
            this.state.receiveAmount = outAmount * this.state.rate;
            this.paint();
        }
        // 选择出币币种 如果出币币种和入币币种一样时,入币币种顺延一种

    }, {
        key: "outCurrencySelectClick",
        value: function outCurrencySelectClick() {
            var _this3 = this;

            var data = tools_1.currencyExchangeAvailable();
            var dataList = [];
            data.forEach(function (element) {
                dataList.push(element.symbol);
            });
            root_1.popNew('app-components-chooseCurrency-chooseCurrency', { currencyList: dataList }, function (r) {
                var currencyName = dataList[r];
                if (_this3.state.outCurrency === currencyName) return;
                if (_this3.state.inCurrency === currencyName) {
                    var index = dataList.indexOf(currencyName);
                    _this3.state.inCurrency = dataList[(index + 1) % dataList.length];
                }
                _this3.state.outCurrency = dataList[r];
                _this3.state.outAmount = 0;
                _this3.state.receiveAmount = 0;
                _this3.init();
                _this3.paint();
            });
        }
        // 选择入币币种 如果入币币种和出币币种一样时,出币币种顺延一种

    }, {
        key: "inCurrencySelectClick",
        value: function inCurrencySelectClick() {
            var _this4 = this;

            var data = tools_1.currencyExchangeAvailable();
            var dataList = [];
            data.forEach(function (element) {
                dataList.push(element.symbol);
            });
            root_1.popNew('app-components-chooseCurrency-chooseCurrency', { currencyList: dataList }, function (r) {
                var currencyName = dataList[r];
                if (_this4.state.inCurrency === currencyName) return;
                if (_this4.state.outCurrency === currencyName) {
                    var index = dataList.indexOf(currencyName);
                    _this4.state.outCurrency = dataList[(index + 1) % dataList.length];
                }
                _this4.state.inCurrency = dataList[r];
                _this4.state.outAmount = 0;
                _this4.state.receiveAmount = 0;
                _this4.init();
                _this4.paint();
            });
        }
        // 出币币种和入币币种切换

    }, {
        key: "switchInOutClick",
        value: function switchInOutClick() {
            var outCurrency = this.state.outCurrency;
            this.state.outCurrency = this.state.inCurrency;
            this.state.inCurrency = outCurrency;
            this.state.outAmount = 0;
            this.state.receiveAmount = 0;
            this.init();
            this.paint();
        }
    }, {
        key: "exchangeRecordClick",
        value: function exchangeRecordClick() {
            root_1.popNew('app-view-currencyExchange-currencyExchangeRecord', { currencyName: this.state.outCurrency });
        }
    }, {
        key: "rateDescClick",
        value: function rateDescClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var outCurrency, gasLimit, fee;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                outCurrency = this.state.outCurrency;
                                gasLimit = 0;
                                fee = 0;

                                if (!(outCurrency === 'ETH')) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 6;
                                return estimateGasETH(this.state.curOutAddr);

                            case 6:
                                gasLimit = _context.sent;

                                fee = gasLimit * tools_1.wei2Eth(this.state.gasPrice);
                                _context.next = 20;
                                break;

                            case 10:
                                if (!(outCurrency === 'BTC')) {
                                    _context.next = 15;
                                    break;
                                }

                                gasLimit = 0;
                                fee = 0;
                                _context.next = 20;
                                break;

                            case 15:
                                if (!tokens_1.ERC20Tokens[outCurrency]) {
                                    _context.next = 20;
                                    break;
                                }

                                _context.next = 18;
                                return estimateGasERC20(outCurrency, this.state.curOutAddr, this.state.outAmount * this.state.rate);

                            case 18:
                                gasLimit = _context.sent;

                                fee = gasLimit * tools_1.wei2Eth(this.state.gasPrice);

                            case 20:
                                root_1.popNew('app-view-currencyExchange-rateDescription', { fee: fee });

                            case 21:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        // tslint:disable-next-line:max-func-body-length

    }, {
        key: "sureClick",
        value: function sureClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this5 = this;

                var outAmount, outCurrency, loading, gasLimit, fee, wallets, wallet, passwd, close, options, withdrawalAddress;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                outAmount = this.state.outAmount;
                                outCurrency = this.state.outCurrency;

                                if (!(outAmount <= 0)) {
                                    _context3.next = 5;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { itype: 'error', content: '输入发出数量', center: true });
                                return _context3.abrupt("return");

                            case 5:
                                if (!(outAmount >= this.state.outBalance)) {
                                    _context3.next = 8;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { itype: 'error', content: '余额不足', center: true });
                                return _context3.abrupt("return");

                            case 8:
                                if (!(outAmount > this.state.maxLimit || outAmount < this.state.minimum)) {
                                    _context3.next = 11;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { itype: 'error', content: '换币数量必须在最小数量和最大数量之间', center: true });
                                return _context3.abrupt("return");

                            case 11:
                                loading = root_1.popNew('pi-components-loading-loading', { text: '矿工费预估中...' });
                                gasLimit = 0;
                                fee = 0;

                                if (!(outCurrency === 'ETH')) {
                                    _context3.next = 21;
                                    break;
                                }

                                _context3.next = 17;
                                return estimateGasETH(this.state.curOutAddr);

                            case 17:
                                gasLimit = _context3.sent;

                                fee = gasLimit * tools_1.wei2Eth(this.state.gasPrice);
                                _context3.next = 32;
                                break;

                            case 21:
                                if (!(outCurrency === 'BTC')) {
                                    _context3.next = 26;
                                    break;
                                }

                                gasLimit = 0;
                                fee = 0;
                                _context3.next = 32;
                                break;

                            case 26:
                                if (!tokens_1.ERC20Tokens[outCurrency]) {
                                    _context3.next = 32;
                                    break;
                                }

                                _context3.next = 29;
                                return estimateGasERC20(outCurrency, this.state.curOutAddr, this.state.outAmount * this.state.rate);

                            case 29:
                                gasLimit = _context3.sent;

                                // 临时解决方案
                                gasLimit = gasLimit * 2;
                                fee = gasLimit * tools_1.wei2Eth(this.state.gasPrice);

                            case 32:
                                console.log('gasLimit', gasLimit);
                                loading.callback(loading.widget);
                                _context3.next = 36;
                                return tools_1.openBasePage('app-view-currencyExchange-exchangeConfirm', {
                                    outCurrency: outCurrency,
                                    outAmount: outAmount,
                                    inCurrency: this.state.inCurrency,
                                    inAmount: outAmount * this.state.rate,
                                    fee: fee
                                });

                            case 36:
                                wallets = tools_1.getLocalStorage('wallets');
                                wallet = tools_1.getCurrentWallet(wallets);
                                passwd = void 0;

                                if (dataCenter_1.dataCenter.getHash(wallet.walletId)) {
                                    _context3.next = 43;
                                    break;
                                }

                                _context3.next = 42;
                                return tools_1.openBasePage('app-components-message-messageboxPrompt', {
                                    title: '输入密码', inputType: 'password'
                                });

                            case 42:
                                passwd = _context3.sent;

                            case 43:
                                close = root_1.popNew('pi-components-loading-loading', { text: '交易中...' });
                                options = {
                                    returnAddress: this.state.curOutAddr,
                                    apiKey: constants_1.shapeshiftApiPublicKey
                                    // amount: this.state.receiveAmount // <---- must set amount here
                                };
                                // 0x958B0bA923260A91Ffd28e8E9a209240648066C2

                                withdrawalAddress = this.state.curInAddr; // 入账币种的地址

                                shapeshift_1.shapeshift.shift(withdrawalAddress, this.state.pair, options, function (err, returnData) {
                                    return __awaiter(_this5, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                        var depositAddress, hash;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        console.log('returnData', returnData);

                                                        if (!returnData.error) {
                                                            _context2.next = 7;
                                                            break;
                                                        }

                                                        root_1.popNew('app-components-message-message', { itype: 'error', content: '出错啦,请重试！', center: true });
                                                        close.callback(close.widget);
                                                        this.init();
                                                        this.paint();
                                                        return _context2.abrupt("return");

                                                    case 7:
                                                        // ShapeShift owned BTC address that you send your BTC to
                                                        depositAddress = returnData.deposit;
                                                        // NOTE: `depositAmount`, `expiration`, and `quotedRate` are only returned if
                                                        // you set `options.amount`
                                                        // amount to send to ShapeShift (type string)
                                                        // const shiftAmount = returnData.depositAmount;
                                                        // Time before rate expires (type number, time from epoch in seconds)
                                                        // const expiration = new Date(returnData.expiration * 1000);
                                                        // rate of exchange, 1 BTC for ??? LTC (type string)
                                                        // const rate = returnData.quotedRate;
                                                        // you need to actually then send your BTC to ShapeShift
                                                        // you could use module `spend`: https://www.npmjs.com/package/spend
                                                        // CONVERT AMOUNT TO SATOSHIS IF YOU USED `spend`
                                                        // spend(SS_BTC_WIF, depositAddress, shiftAmountSatoshis, function (err, txId) { /.. ../ })
                                                        // later, you can then check the deposit status

                                                        _context2.prev = 8;
                                                        _context2.next = 11;
                                                        return this.transfer(passwd, this.state.curOutAddr, depositAddress, this.state.gasPrice, gasLimit, outAmount, outCurrency);

                                                    case 11:
                                                        hash = _context2.sent;

                                                        if (hash) {
                                                            _context2.next = 14;
                                                            break;
                                                        }

                                                        return _context2.abrupt("return");

                                                    case 14:
                                                        // tslint:disable-next-line:max-line-length
                                                        this.setTemporaryRecord(hash, this.state.curOutAddr, depositAddress, this.state.gasPrice, gasLimit, outAmount, outCurrency, this.state.inCurrency, this.state.rate);
                                                        root_1.popNew('app-view-currencyExchange-currencyExchangeRecord', { currencyName: outCurrency });
                                                        _context2.next = 21;
                                                        break;

                                                    case 18:
                                                        _context2.prev = 18;
                                                        _context2.t0 = _context2["catch"](8);

                                                        console.log(_context2.t0);

                                                    case 21:
                                                        _context2.prev = 21;

                                                        close.callback(close.widget);
                                                        this.init();
                                                        this.paint();
                                                        return _context2.finish(21);

                                                    case 26:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this, [[8, 18, 21, 26]]);
                                    }));
                                });

                            case 47:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
        // tslint:disable-next-line:max-line-length

    }, {
        key: "transfer",
        value: function transfer(psw, fromAddr, toAddr, gasPrice, gasLimit, pay, currencyName, info) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var wallets, wallet, id, addrIndex, wlt;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                // tslint:disable-next-line:no-this-assignment
                                wallets = tools_1.getLocalStorage('wallets');
                                wallet = tools_1.getCurrentWallet(wallets);
                                id = void 0;
                                _context4.prev = 3;
                                addrIndex = globalWallet_1.GlobalWallet.getWltAddrIndex(wallet, fromAddr, currencyName);

                                if (!(addrIndex >= 0)) {
                                    _context4.next = 25;
                                    break;
                                }

                                _context4.next = 8;
                                return globalWallet_1.GlobalWallet.createWlt(currencyName, psw, wallet, addrIndex);

                            case 8:
                                wlt = _context4.sent;

                                if (!(currencyName === 'ETH')) {
                                    _context4.next = 15;
                                    break;
                                }

                                _context4.next = 12;
                                return doEthTransfer(wlt, fromAddr, toAddr, gasPrice, gasLimit, tools_1.eth2Wei(pay), info);

                            case 12:
                                id = _context4.sent;
                                _context4.next = 25;
                                break;

                            case 15:
                                if (!(currencyName === 'BTC')) {
                                    _context4.next = 21;
                                    break;
                                }

                                _context4.next = 18;
                                return doBtcTransfer(wlt, fromAddr, toAddr, gasPrice, gasLimit, pay, info);

                            case 18:
                                id = _context4.sent;
                                _context4.next = 25;
                                break;

                            case 21:
                                if (!tokens_1.ERC20Tokens[currencyName]) {
                                    _context4.next = 25;
                                    break;
                                }

                                _context4.next = 24;
                                return doERC20TokenTransfer(wlt, fromAddr, toAddr, gasPrice, gasLimit, pay, currencyName);

                            case 24:
                                id = _context4.sent;

                            case 25:
                                console.log('transfer hash', id);
                                _context4.next = 32;
                                break;

                            case 28:
                                _context4.prev = 28;
                                _context4.t0 = _context4["catch"](3);

                                console.log(_context4.t0.message);
                                if (_context4.t0.message.indexOf('insufficient funds') >= 0) {
                                    root_1.popNew('app-components-message-message', { itype: 'error', content: '余额不足', center: true });
                                } else {
                                    root_1.popNew('app-components-message-message', { itype: 'error', content: _context4.t0.message, center: true });
                                }

                            case 32:
                                return _context4.abrupt("return", id);

                            case 33:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[3, 28]]);
            }));
        }
        // 临时记录
        // tslint:disable-next-line:max-line-length

    }, {
        key: "setTemporaryRecord",
        value: function setTemporaryRecord(hash, fromAddr, toAddr, gasPrice, gasLimit, pay, outCurrency, inCurrency, rate) {
            var t = new Date();
            // 币币兑换交易记录
            var tx = {
                hasConfirmations: 'false',
                inputAddress: fromAddr,
                inputAmount: pay,
                inputCurrency: outCurrency,
                inputTXID: hash,
                outputAddress: '',
                outputAmount: '',
                outputCurrency: inCurrency,
                outputTXID: '',
                shiftRate: rate,
                status: 'pending',
                timestamp: t.getTime() / 1000
            };
            var currencyExchangeTxs = tools_1.getLocalStorage('currencyExchangeTxs') || {};
            currencyExchangeTxs[this.state.curOutAddr.toLowerCase()].push(tx);
            tools_1.setLocalStorage('currencyExchangeTxs', currencyExchangeTxs);
            // 币币兑换出货币种交易记录
            var record = {
                id: hash,
                type: '转账',
                fromAddr: fromAddr,
                to: toAddr,
                pay: pay,
                time: t.getTime(),
                showTime: tools_1.parseDate(t),
                result: '交易中',
                info: '兑换',
                currencyName: outCurrency,
                tip: gasLimit * tools_1.wei2Eth(gasPrice)
            };
            addRecord(outCurrency, fromAddr, record);
        }
    }]);

    return CurrencyExchange;
}(widget_1.Widget);

exports.CurrencyExchange = CurrencyExchange;
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
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var api, nonce, txObj, tx, id;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        api = new api_2.Api();
                        _context5.next = 3;
                        return api.getTransactionCount(acct1);

                    case 3:
                        nonce = _context5.sent;
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

                        _context5.next = 8;
                        return api.sendRawTransaction(tx);

                    case 8:
                        id = _context5.sent;
                        return _context5.abrupt("return", id);

                    case 10:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));
}
/**
 * 处理转账
 */
// tslint:disable-next-line:only-arrow-functions
function doBtcTransfer(wlt, acct1, acct2, gasPrice, gasLimit, value, info) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var addrs, addr, output, retArr, rawHexString, fee, hash;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
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
                        _context6.next = 6;
                        return wlt.init();

                    case 6:
                        _context6.next = 8;
                        return wlt.buildRawTransaction(output, 'medium');

                    case 8:
                        retArr = _context6.sent;

                        wlt.lock();
                        rawHexString = retArr[0];
                        fee = retArr[1];
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        _context6.next = 14;
                        return api_1.BtcApi.sendRawTransaction(rawHexString);

                    case 14:
                        hash = _context6.sent;
                        return _context6.abrupt("return", hash.txid);

                    case 16:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));
}
/**
 * 处理eth代币转账
 */
// tslint:disable-next-line:only-arrow-functions
function doERC20TokenTransfer(wlt, acct1, acct2, gasPrice, gasLimit, value, currencyName) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var api, nonce, transferCode, txObj, tx, id;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        api = new api_2.Api();
                        _context7.next = 3;
                        return api.getTransactionCount(acct1);

                    case 3:
                        nonce = _context7.sent;

                        console.log('nonce', nonce);
                        transferCode = wallet_1.EthWallet.tokenOperations('transfer', currencyName, acct2, tools_1.ethTokenMultiplyDecimals(value, currencyName));
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

                        _context7.next = 10;
                        return api.sendRawTransaction(tx);

                    case 10:
                        id = _context7.sent;
                        return _context7.abrupt("return", id);

                    case 12:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));
}
// 预估ETH的gas limit
// tslint:disable-next-line:only-arrow-functions
function estimateGasETH(toAddr) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var api, gas;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        api = new api_2.Api();
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        _context8.next = 3;
                        return api.estimateGas({ to: toAddr, data: '' });

                    case 3:
                        gas = _context8.sent;
                        return _context8.abrupt("return", gas);

                    case 5:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));
}
// 预估ETH ERC20Token的gas limit
// tslint:disable-next-line:only-arrow-functions
function estimateGasERC20(currencyName, toAddr, amount) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var api, transferCode, gas;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        api = new api_2.Api();
                        transferCode = wallet_1.EthWallet.tokenOperations('transfer', currencyName, toAddr, tools_1.ethTokenMultiplyDecimals(amount, currencyName));
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        _context9.next = 4;
                        return api.estimateGas({ to: tokens_1.ERC20Tokens[currencyName], data: transferCode });

                    case 4:
                        gas = _context9.sent;
                        return _context9.abrupt("return", gas);

                    case 6:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));
}
})