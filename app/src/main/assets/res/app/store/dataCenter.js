_$define("app/store/dataCenter", function (require, exports, module){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var math_1 = require("../../pi/util/math");
var api_1 = require("../core/btc/api");
var wallet_1 = require("../core/btc/wallet");
var api_2 = require("../core/eth/api");
var tokens_1 = require("../core/eth/tokens");
var wallet_2 = require("../core/eth/wallet");
var shapeshift_1 = require("../exchange/shapeshift/shapeshift");
// tslint:disable-next-line:max-line-length
var constants_1 = require("../utils/constants");
var tools_1 = require("../utils/tools");
/**
 * 创建事件处理器表
 * @example
 */

var DataCenter = function () {
    function DataCenter() {
        _classCallCheck(this, DataCenter);

        this.addrInfos = [];
        this.addrs = [];
        this.timerRef = 0;
        this.transactions = [];
        this.updateList = [];
        this.exchangeRateJson = constants_1.defaultExchangeRateJson;
        this.currencyList = constants_1.supportCurrencyList;
        this.shapeShiftCoins = []; // shapeShift 支持的币种
        this.hashMap = {};
        // 连接用户
        this.conUser = '';
        // 连接用户公钥
        this.conUserPublicKey = '';
        // 连接随机数
        this.conRandom = '';
        // 连接uid
        this.conUid = 0;
    }

    _createClass(DataCenter, [{
        key: "init",

        /**
         * 初始化
         */
        value: function init() {
            var _this = this;

            this.updateList.push(['shapeShiftCoins']);
            this.updateList.push(['exchangeRate', 'ETH']);
            this.updateList.push(['exchangeRate', 'BTC']);
            // 从缓存中获取地址进行初始化
            var addrs = tools_1.getLocalStorage('addrs');
            if (addrs) {
                var wallets = tools_1.getLocalStorage('wallets');
                this.iSalt = wallets.salt;
                var wallet = tools_1.getCurrentWallet(wallets);
                if (!wallet) return;
                var list = [];
                wallet.currencyRecords.forEach(function (v) {
                    list = list.concat(v.addrs);
                });
                addrs.forEach(function (v) {
                    if (list.indexOf(v.addr) >= 0) {
                        _this.addAddr(v.addr, v.addrName, v.currencyName);
                    }
                });
            }
            // 启动定时器更新
            if (!this.timerRef) this.openCheck();
            if (!this.currencyExchangeTimer) this.currencyExchangeTimerStart();
        }
        /**
         * 初始化地址对象
         */

    }, {
        key: "initAddr",
        value: function initAddr(address, currencyName, addrName) {
            return {
                addr: address,
                addrName: addrName || tools_1.getDefaultAddr(address),
                record: [],
                balance: 0,
                currencyName: currencyName
            };
        }
        /**
         * addAddr
         */

    }, {
        key: "addAddr",
        value: function addAddr(addr, addrName, currencyName) {
            this.updatetTransaction(addr, currencyName);
        }
        /**
         * 通过货币类型获取当前钱包地址详情
         */

    }, {
        key: "getAddrInfosByCurrencyName",
        value: function getAddrInfosByCurrencyName(currencyName) {
            var wallets = tools_1.getLocalStorage('wallets');
            var wallet = tools_1.getCurrentWallet(wallets);
            if (!wallet) return;
            var retAddrs = tools_1.getAddrsByCurrencyName(wallet, currencyName);
            var addrs = tools_1.getLocalStorage('addrs') || [];
            return addrs.filter(function (v) {
                return retAddrs.indexOf(v.addr) !== -1 && v.currencyName === currencyName;
            });
        }
        /**
         * 通过地址获取地址余额
         */

    }, {
        key: "getAddrInfoByAddr",
        value: function getAddrInfoByAddr(addr, currencyName) {
            var addrs = tools_1.getLocalStorage('addrs') || [];
            return addrs.filter(function (v) {
                return v.addr === addr && v.currencyName === currencyName;
            })[0];
        }
        /**
         * 通过地址获取所有的交易记录
         */

    }, {
        key: "getAllTransactionsByAddr",
        value: function getAllTransactionsByAddr(addr, currencyName) {
            // 从缓存中取出对应地址的交易记录
            var transactions = tools_1.getLocalStorage('transactions') || [];
            // return transactions.filter(v => v.addr === addr);
            var list = [];
            if (currencyName === 'ETH' || tokens_1.ERC20Tokens[currencyName]) {
                list = transactions.filter(function (v) {
                    return v.addr === addr && v.currencyName === currencyName;
                });
            } else if (currencyName === 'BTC') {
                list = transactions.filter(function (v) {
                    return v.addr === addr && v.currencyName === currencyName;
                }).map(function (v) {
                    if (v.inputs.indexOf(addr) >= 0) {
                        v.from = addr;
                        v.to = v.outputs[0];
                    } else {
                        v.from = v.inputs[0];
                        v.to = addr;
                    }
                    return v;
                });
            }
            return list;
        }
        /**
         * 获取汇率
         */

    }, {
        key: "getExchangeRate",
        value: function getExchangeRate(currencyName) {
            return this.exchangeRateJson[currencyName];
        }
        /**
         * 更新记录
         */

    }, {
        key: "updatetTransaction",
        value: function updatetTransaction(addr, currencyName) {
            // if (currencyName !== 'BTC') {
            //     this.updateList.push(['balance', addr, currencyName]);   
            // }
            this.updateList.push(['balance', addr, currencyName]);
            this.updateList.push(['transaction', addr, currencyName]);
        }
        /**
         * 添加常用联系人地址
         */

    }, {
        key: "addTopContacts",
        value: function addTopContacts(currencyName, addresse, tags) {
            var topContacts = tools_1.getLocalStorage('topContacts');
            if (!topContacts) {
                topContacts = [];
            }
            var item = {
                currencyName: currencyName,
                tags: tags,
                addresse: addresse
            };
            topContacts.push(item);
            tools_1.setLocalStorage('topContacts', topContacts);
        }
        /**
         * 获取常用联系人地址
         */

    }, {
        key: "getTopContacts",
        value: function getTopContacts(currencyName) {
            var topContacts = tools_1.getLocalStorage('topContacts');
            if (!topContacts) {
                topContacts = [];
            }
            topContacts = topContacts.filter(function (v) {
                return v.currencyName === currencyName;
            });
            return topContacts;
        }
        /**
         * 设置缓存hash
         */

    }, {
        key: "setHash",
        value: function setHash(key, hash) {
            if (!key) return;
            this.hashMap[key] = hash;
        }
        /**
         * 获取缓存hash
         */

    }, {
        key: "getHash",
        value: function getHash(id) {
            return this.hashMap[id];
        }
        // 获取币币交易交易记录

    }, {
        key: "fetchCurrencyExchangeTx",
        value: function fetchCurrencyExchangeTx() {
            var _this2 = this;

            var wallets = tools_1.getLocalStorage('wallets');
            var wallet = tools_1.getCurrentWallet(wallets);
            if (!wallet) return;
            var curAllAddrs = tools_1.getAddrsAll(wallet);
            curAllAddrs.forEach(function (item) {
                _this2.getTransactionsByAddr(item);
            });
        }
        /**
         * 设置连接用户
         */

    }, {
        key: "getUser",
        value: function getUser() {
            return this.conUser;
        }
        /**
         * 获取连接用户
         */

    }, {
        key: "setUser",
        value: function setUser(user) {
            this.conUser = user;
        }
        /**
         * 设置连接用户
         */

    }, {
        key: "getUserPublicKey",
        value: function getUserPublicKey() {
            return this.conUserPublicKey;
        }
        /**
         * 获取连接用户
         */

    }, {
        key: "setUserPublicKey",
        value: function setUserPublicKey(publicKey) {
            this.conUserPublicKey = publicKey;
        }
        /**
         * 设置连接随机数
         */

    }, {
        key: "getConRandom",
        value: function getConRandom() {
            return this.conRandom;
        }
        /**
         * 获取连接随机数
         */

    }, {
        key: "setConRandom",
        value: function setConRandom(random) {
            this.conRandom = random;
        }
        /**
         * 设置连接随机数
         */

    }, {
        key: "getConUid",
        value: function getConUid() {
            return this.conUid;
        }
        /**
         * 获取连接随机数
         */

    }, {
        key: "setConUid",
        value: function setConUid(uid) {
            this.conUid = uid;
        }
        /****************************************************************************************************
         * 私有函数
         ******************************************************************************************/

    }, {
        key: "openCheck",
        value: function openCheck() {
            var _this3 = this;

            this.timerRef = setTimeout(function () {
                _this3.timerRef = 0;
                _this3.openCheck();
            }, 5 * 1000);
            if (this.updateList.length > 0) {
                var update = this.updateList.shift();
                console.log('openCheck updateList', update);
                switch (update[0]) {
                    case 'transaction':
                        this.parseTransactionDetails(update[1], update[2]);
                        break;
                    // case 'BtcTransactionTxref': this.parseBtcTransactionTxrefDetails(update[1], update[2]); break;
                    case 'balance':
                        this.updateBalance(update[1], update[2]);
                        break;
                    case 'exchangeRate':
                        this.exchangeRate(update[1]);
                        break;
                    case 'shapeShiftCoins':
                        this.getShapeShiftCoins();
                    default:
                }
                return;
            }
            // 检查地址--放于最后一步
            this.checkAddr();
        }
        // 币币交易记录定时器

    }, {
        key: "currencyExchangeTimerStart",
        value: function currencyExchangeTimerStart() {
            var _this4 = this;

            this.fetchCurrencyExchangeTx();
            this.currencyExchangeTimer = setTimeout(function () {
                _this4.currencyExchangeTimerStart();
            }, 10 * 60 * 1000);
        }
    }, {
        key: "checkAddr",
        value: function checkAddr() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var wallets, list, addrs, wallet, currencyRecord, addAddrs;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wallets = tools_1.getLocalStorage('wallets');

                                if (wallets) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 3:
                                list = [];

                                wallets.walletList.forEach(function (v, i) {
                                    if (exports.dataCenter.getHash(v.walletId)) {
                                        v.currencyRecords.forEach(function (v1, i1) {
                                            if (!v1.updateAddr) list.push([i, i1]);
                                        });
                                    }
                                });

                                if (!list[0]) {
                                    _context.next = 30;
                                    break;
                                }

                                addrs = tools_1.getLocalStorage('addrs');
                                wallet = wallets.walletList[list[0][0]];
                                currencyRecord = wallet.currencyRecords[list[0][1]];

                                console.log('checkAddr', currencyRecord.currencyName);
                                addAddrs = void 0;

                                if (!(currencyRecord.currencyName === 'ETH')) {
                                    _context.next = 17;
                                    break;
                                }

                                _context.next = 14;
                                return this.checkEthAddr(wallet, currencyRecord);

                            case 14:
                                addAddrs = _context.sent;
                                _context.next = 27;
                                break;

                            case 17:
                                if (!(currencyRecord.currencyName === 'BTC')) {
                                    _context.next = 23;
                                    break;
                                }

                                _context.next = 20;
                                return this.checkBtcAddr(wallet, currencyRecord);

                            case 20:
                                addAddrs = _context.sent;
                                _context.next = 27;
                                break;

                            case 23:
                                if (!tokens_1.ERC20Tokens[currencyRecord.currencyName]) {
                                    _context.next = 27;
                                    break;
                                }

                                _context.next = 26;
                                return this.checkEthERC20TokenAddr(wallet, currencyRecord);

                            case 26:
                                addAddrs = _context.sent;

                            case 27:
                                if (addAddrs.length > 0) {
                                    addrs = addrs.concat(addAddrs);
                                    tools_1.setLocalStorage('addrs', addrs, false);
                                }
                                currencyRecord.updateAddr = true;
                                tools_1.setLocalStorage('wallets', wallets, true);

                            case 30:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "getShapeShiftCoins",
        value: function getShapeShiftCoins() {
            var _this5 = this;

            shapeshift_1.shapeshift.coins(function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                for (var k in data) {
                    _this5.shapeShiftCoins.push(data[k]);
                }
                // console.log(this.shapeShiftCoins);
            });
        }
        /**
         * 解析交易详情
         */

    }, {
        key: "parseTransactionDetails",
        value: function parseTransactionDetails(addr, currencyName) {
            if (tokens_1.ERC20Tokens[currencyName]) {
                this.parseEthERC20TokenTransactionDetails(addr, currencyName);
                return;
            }
            switch (currencyName) {
                case 'ETH':
                    this.parseEthTransactionDetails(addr);
                    break;
                case 'BTC':
                    this.parseBtcTransactionDetails(addr);
                    break;
                default:
            }
        }
    }, {
        key: "parseEthERC20TokenTransactionDetails",
        value: function parseEthERC20TokenTransactionDetails(addr, currencyName) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this6 = this;

                var api, contractAddress, res, list, transactions;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                api = new api_2.Api();
                                contractAddress = tokens_1.ERC20Tokens[currencyName];
                                _context2.next = 4;
                                return api.getTokenTransferEvents(contractAddress, addr);

                            case 4:
                                res = _context2.sent;
                                list = [];
                                transactions = tools_1.getLocalStorage('transactions') || [];

                                res.result.forEach(function (v) {
                                    if (transactions.some(function (v1) {
                                        return v1.hash === v.hash && v1.addr === addr && v1.currencyName === currencyName;
                                    })) return;
                                    // 移除缓存记录
                                    _this6.removeRecordAtAddr(addr, v.hash);
                                    // info--input  0x636573--ces
                                    var record = {
                                        hash: v.hash,
                                        from: v.from,
                                        to: v.to,
                                        value: parseFloat(v.value),
                                        fees: parseFloat(v.gasUsed) * parseFloat(v.gasPrice),
                                        time: parseInt(v.timeStamp, 10) * 1000,
                                        info: '无',
                                        currencyName: currencyName,
                                        addr: addr
                                    };
                                    list.push(record);
                                });
                                if (list.length > 0) {
                                    this.setTransactionLocalStorage(transactions.concat(list));
                                    // setLocalStorage('transactions', transactions.concat(list), false);
                                }

                            case 9:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "parseEthTransactionDetails",
        value: function parseEthTransactionDetails(addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this7 = this;

                var api, r, ethTrans, list, transactions;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                api = new api_2.Api();
                                _context3.next = 3;
                                return api.getAllTransactionsOf(addr);

                            case 3:
                                r = _context3.sent;
                                ethTrans = this.filterEthTrans(r.result);
                                list = [];
                                // const hashList = [];

                                transactions = tools_1.getLocalStorage('transactions') || [];

                                ethTrans.forEach(function (v) {
                                    if (transactions.some(function (v1) {
                                        return v1.hash === v.hash && v1.addr === addr;
                                    })) return;
                                    // 移除缓存记录
                                    _this7.removeRecordAtAddr(addr, v.hash);
                                    // info--input  0x636573--ces
                                    var record = {
                                        hash: v.hash,
                                        from: v.from,
                                        to: v.to,
                                        value: parseFloat(v.value),
                                        fees: parseFloat(v.gasUsed) * parseFloat(v.gasPrice),
                                        time: parseInt(v.timeStamp, 10) * 1000,
                                        info: '无',
                                        currencyName: 'ETH',
                                        addr: addr
                                    };
                                    list.push(record);
                                    // hashList.push(v.hash);
                                });
                                if (list.length > 0) {
                                    this.setTransactionLocalStorage(transactions.concat(list));
                                    // setLocalStorage('transactions', transactions.concat(list), false);
                                }

                            case 9:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
        // 过滤eth交易记录，过滤掉token的交易记录

    }, {
        key: "filterEthTrans",
        value: function filterEthTrans(trans) {
            return trans.filter(function (item) {
                if (item.to.length === 0) return false;
                if (item.input.indexOf(constants_1.ethTokenTransferCode) === 0) return false;
                return true;
            });
        }
    }, {
        key: "parseBtcTransactionDetails",
        value: function parseBtcTransactionDetails(addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this8 = this;

                var info, transactions, list;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return api_1.BtcApi.getAddrTxHistory(addr);

                            case 2:
                                info = _context4.sent;

                                if (info) {
                                    _context4.next = 5;
                                    break;
                                }

                                return _context4.abrupt("return");

                            case 5:
                                // const num = sat2Btc(info.balance);
                                // this.setBalance(addr, 'BTC',num);
                                // console.log('getAddrInfo', info);
                                if (info.txs) {
                                    transactions = tools_1.getLocalStorage('transactions') || [];
                                    list = [];

                                    info.txs.forEach(function (v) {
                                        if (transactions.some(function (v1) {
                                            return v1.hash === v.txid && v1.addr === addr;
                                        })) return;
                                        if (v.confirmations < DataCenter.LIMIT_CONFIRMATIONS) return;
                                        _this8.removeRecordAtAddr(addr, v.txid);
                                        list.push(_this8.parseBtcTransactionTxRecord(addr, v));
                                    });
                                    if (list.length > 0) {
                                        this.setTransactionLocalStorage(transactions.concat(list));
                                    }
                                }

                            case 6:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
        /**
         * 解析btc交易详情记录
         */

    }, {
        key: "parseBtcTransactionTxRecord",
        value: function parseBtcTransactionTxRecord(addr, tx) {
            console.log('parseBtcTransactionTxRecord', tx);
            var value = 0;
            var inputs = tx.vin.map(function (v) {
                return v.addr;
            });
            var outputs = tx.vout.map(function (v) {
                if (!value) {
                    if (inputs.indexOf(addr) >= 0) {
                        value = parseFloat(v.value);
                    } else if (addr === v.scriptPubKey.addresses[0]) {
                        value = parseFloat(v.value);
                    }
                }
                return v.scriptPubKey.addresses[0];
            });
            return {
                addr: addr,
                currencyName: 'BTC',
                hash: tx.txid,
                time: tx.time * 1000,
                info: '无',
                fees: tools_1.btc2Sat(tx.fees),
                value: tools_1.btc2Sat(value),
                inputs: inputs,
                outputs: outputs
            };
        }
    }, {
        key: "removeRecordAtAddr",
        value: function removeRecordAtAddr(addr, hashStr) {
            var addrs = tools_1.getLocalStorage('addrs') || [];
            var isUpdate = false;
            addrs = addrs.map(function (v) {
                if (v.addr !== addr) return v;
                var t = v.record.filter(function (v1) {
                    return v1.id !== hashStr;
                });
                if (v.record.length !== t.length) {
                    isUpdate = true;
                    v.record = t;
                }
                return v;
            });
            if (isUpdate) {
                tools_1.setLocalStorage('addrs', addrs, false);
            }
        }
        /**
         * 更新余额
         */

    }, {
        key: "updateBalance",
        value: function updateBalance(addr, currencyName) {
            var _this9 = this;

            if (tokens_1.ERC20Tokens[currencyName]) {
                var balanceOfCode = wallet_2.EthWallet.tokenOperations('balanceof', currencyName, addr);
                // console.log('balanceOfCode',balanceOfCode);
                var api = new api_2.Api();
                api.ethCall(tokens_1.ERC20Tokens[currencyName], balanceOfCode).then(function (r) {
                    // tslint:disable-next-line:radix
                    var num = tools_1.ethTokenDivideDecimals(Number(r), currencyName);
                    // console.log(currencyName,num);
                    _this9.setBalance(addr, currencyName, num);
                });
                return;
            }
            switch (currencyName) {
                case 'ETH':
                    var _api = new api_2.Api();
                    _api.getBalance(addr).then(function (r) {
                        var num = tools_1.wei2Eth(r.toNumber());
                        _this9.setBalance(addr, currencyName, num);
                    });
                    break;
                case 'BTC':
                    api_1.BtcApi.getBalance(addr).then(function (r) {
                        _this9.setBalance(addr, currencyName, tools_1.sat2Btc(r));
                    });
                    break;
                default:
            }
        }
        /**
         * 设置余额
         */

    }, {
        key: "setBalance",
        value: function setBalance(addr, currencyName, num) {
            var addrs = tools_1.getLocalStorage('addrs') || [];
            var isUpdate = false;
            addrs = addrs.map(function (v) {
                if (v.addr === addr && v.currencyName === currencyName && v.balance !== num) {
                    v.balance = num;
                    isUpdate = true;
                }
                return v;
            });
            if (isUpdate) {
                tools_1.setLocalStorage('addrs', addrs, true);
            }
        }
    }, {
        key: "exchangeRate",
        value: function exchangeRate(currencyName) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var ethApi;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.t0 = currencyName;
                                _context5.next = _context5.t0 === 'ETH' ? 3 : _context5.t0 === 'BTC' ? 8 : 12;
                                break;

                            case 3:
                                ethApi = new api_2.Api();
                                _context5.next = 6;
                                return ethApi.getExchangeRate();

                            case 6:
                                this.exchangeRateJson.ETH = _context5.sent;
                                return _context5.abrupt("break", 12);

                            case 8:
                                _context5.next = 10;
                                return api_1.BtcApi.getExchangeRate();

                            case 10:
                                this.exchangeRateJson.BTC = _context5.sent;
                                return _context5.abrupt("break", 12);

                            case 12:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: "setTransactionLocalStorage",
        value: function setTransactionLocalStorage(transactions) {
            var notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var addrs = tools_1.getLocalStorage('addrs');
            var existedAddrs = [];
            addrs.forEach(function (addr) {
                return existedAddrs.push(addr.addr);
            });
            var trans = transactions.filter(function (trans) {
                return existedAddrs.indexOf(trans.addr) >= 0;
            });
            tools_1.setLocalStorage('transactions', trans, notify);
        }
        /**
         * 检查eth地址
         */

    }, {
        key: "checkEthAddr",
        value: function checkEthAddr(wallet, currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var mnemonic, ethWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return tools_1.getMnemonic(wallet, '');

                            case 2:
                                mnemonic = _context6.sent;
                                ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                                _context6.next = 6;
                                return ethWallet.scanUsedAddress();

                            case 6:
                                cnt = _context6.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = ethWallet.selectAddress(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(this.initAddr(address, 'ETH'));
                                }
                                return _context6.abrupt("return", addrs);

                            case 10:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
        /**
         * 检查btc地址
         */

    }, {
        key: "checkBtcAddr",
        value: function checkBtcAddr(wallet, currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var mnemonic, btcWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return tools_1.getMnemonic(wallet, '');

                            case 2:
                                mnemonic = _context7.sent;
                                btcWallet = wallet_1.BTCWallet.fromMnemonic(mnemonic, constants_1.btcNetwork, constants_1.lang);

                                btcWallet.unlock();
                                _context7.next = 7;
                                return btcWallet.scanUsedAddress();

                            case 7:
                                cnt = _context7.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = btcWallet.derive(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(this.initAddr(address, 'BTC'));
                                }
                                btcWallet.lock();
                                return _context7.abrupt("return", addrs);

                            case 12:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));
        }
        /**
         * 检查eth erc20 token地址
         */

    }, {
        key: "checkEthERC20TokenAddr",
        value: function checkEthERC20TokenAddr(wallet, currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var mnemonic, ethWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return tools_1.getMnemonic(wallet, '');

                            case 2:
                                mnemonic = _context8.sent;
                                ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                                _context8.next = 6;
                                return ethWallet.scanTokenUsedAddress(tokens_1.ERC20Tokens[currencyRecord.currencyName]);

                            case 6:
                                cnt = _context8.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = ethWallet.selectAddress(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(this.initAddr(address, currencyRecord.currencyName));
                                }
                                return _context8.abrupt("return", addrs);

                            case 10:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));
        }
    }, {
        key: "getTransactionsByAddr",
        value: function getTransactionsByAddr(addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var _this10 = this;

                var addrLowerCase, transactions, count, txs, _ret;

                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                addrLowerCase = addr.toLowerCase();

                                transactions = function transactions(addr) {
                                    return new Promise(function (resolve, reject) {
                                        shapeshift_1.shapeshift.transactions(constants_1.shapeshiftApiPrivateKey, addr, function (err, transactions) {
                                            if (err || transactions.length === 0) {
                                                reject(err || new Error('null array'));
                                            }
                                            resolve(transactions);
                                        });
                                    });
                                };

                                count = constants_1.shapeshiftTransactionRequestNumber;

                            case 3:
                                if (!(count >= 0)) {
                                    _context9.next = 20;
                                    break;
                                }

                                txs = void 0;
                                _context9.prev = 5;
                                _context9.next = 8;
                                return transactions(addrLowerCase);

                            case 8:
                                txs = _context9.sent;
                                _context9.next = 13;
                                break;

                            case 11:
                                _context9.prev = 11;
                                _context9.t0 = _context9["catch"](5);

                            case 13:
                                if (!txs) {
                                    _context9.next = 17;
                                    break;
                                }

                                _ret = function () {
                                    var currencyExchangeTxs = tools_1.getLocalStorage('currencyExchangeTxs') || {};
                                    var oldTxs = currencyExchangeTxs[addrLowerCase] || [];
                                    txs.forEach(function (tx) {
                                        var index = _this10.getTxByHash(oldTxs, tx.inputTXID);
                                        if (index >= 0) {
                                            oldTxs[index] = tx;
                                        } else {
                                            oldTxs.push(tx);
                                        }
                                    });
                                    currencyExchangeTxs[addrLowerCase] = oldTxs;
                                    tools_1.setLocalStorage('currencyExchangeTxs', currencyExchangeTxs);
                                    return {
                                        v: void 0
                                    };
                                }();

                                if (!((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object")) {
                                    _context9.next = 17;
                                    break;
                                }

                                return _context9.abrupt("return", _ret.v);

                            case 17:
                                count--;
                                _context9.next = 3;
                                break;

                            case 20:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[5, 11]]);
            }));
        }
    }, {
        key: "getTxByHash",
        value: function getTxByHash(txs, hash) {
            for (var i = 0; i < txs.length; i++) {
                // tslint:disable-next-line:possible-timing-attack
                if (txs[i].inputTXID === hash) {
                    return i;
                }
            }
            return -1;
        }
    }, {
        key: "salt",
        get: function get() {
            if (!this.iSalt) {
                this.iSalt = math_1.cryptoRandomInt().toString();
            }
            return this.iSalt;
        }
    }]);

    return DataCenter;
}();

DataCenter.MAX_ADDRNAME_LEN = 9; // 最长地址名
DataCenter.MAX_SHARE_LEN = 3;
DataCenter.MIN_SHARE_LEN = 2;
DataCenter.SHARE_SPLIT = '&&&&';
DataCenter.MNEMONIC_SPLIT = ' ';
DataCenter.LIMIT_CONFIRMATIONS = 1;
exports.DataCenter = DataCenter;
// ============================================ 立即执行
/**
 * 消息处理列表
 */
exports.dataCenter = new DataCenter();
})