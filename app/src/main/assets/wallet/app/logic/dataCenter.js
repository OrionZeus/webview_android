_$define("app/logic/dataCenter", function (require, exports, module){
"use strict";

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
var config_1 = require("../config");
var api_1 = require("../core/btc/api");
var wallet_1 = require("../core/btc/wallet");
var api_2 = require("../core/eth/api");
var wallet_2 = require("../core/eth/wallet");
var pullWallet_1 = require("../net/pullWallet");
var interface_1 = require("../store/interface");
var store_1 = require("../store/store");
var constants_1 = require("../utils/constants");
var tools_1 = require("../utils/tools");
var unitTools_1 = require("../utils/unitTools");
var walletTools_1 = require("../utils/walletTools");
var bignumber_1 = require("../res/js/bignumber");
var pull3_1 = require("../net/pull3");
/**
 * 创建事件处理器表
 * @example
 */

var DataCenter = function () {
    function DataCenter() {
        _classCallCheck(this, DataCenter);

        this.timerRef = 0;
        this.timerRef1 = 0;
        this.updateList = [];
        // 交易定时器列表
        this.txTimerList = [];
        // 余额定时器列表
        this.balanceTimerList = [];
    }
    /**
     * 初始化
     */


    _createClass(DataCenter, [{
        key: "init",
        value: function init() {
            //获取shapeshift支持货币
            pullWallet_1.getShapeShiftCoins();
            // 更新人民币美元汇率
            this.updateUSD2CNYRate();
            //更新货币对比USDT的比率
            this.updateCurrency2USDTRate();
            this.refreshAllTx();
            this.initErc20GasLimit();
        }
        /**
         * 刷新本地钱包
         */

    }, {
        key: "refreshAllTx",
        value: function refreshAllTx() {
            var _this = this;

            var neededRefreshCount = 0;
            // 从缓存中获取地址进行初始化
            var addrs = store_1.find('addrs') || [];
            if (addrs) {
                var wallet = store_1.find('curWallet');
                if (!wallet) return;
                var list = [];
                wallet.currencyRecords.forEach(function (v) {
                    if (wallet.showCurrencys.indexOf(v.currencyName) >= 0) {
                        list = list.concat(v.addrs);
                    }
                });
                addrs.forEach(function (v) {
                    if (list.indexOf(v.addr) >= 0 && wallet.showCurrencys.indexOf(v.currencyName) >= 0) {
                        _this.updateAddrInfo(v.addr, v.currencyName);
                        neededRefreshCount++;
                    }
                });
            }
            return neededRefreshCount;
        }
        /**
         * 更新地址相关 交易记录及余额定时更新
         */

    }, {
        key: "updateAddrInfo",
        value: function updateAddrInfo(addr, currencyName) {
            this.parseTransactionDetails(addr, currencyName); //更新交易记录
            this.timerUpdateBalance(addr, currencyName); //定时更新余额
        }
    }, {
        key: "initErc20GasLimit",
        value: function initErc20GasLimit() {
            var _this2 = this;

            var wallet = store_1.find('curWallet');
            if (!wallet) return;
            wallet.showCurrencys.forEach(function (currencyName) {
                if (config_1.ERC20Tokens[currencyName]) {
                    _this2.fetchErc20GasLimit(currencyName);
                }
            });
        }
    }, {
        key: "fetchErc20GasLimit",
        value: function fetchErc20GasLimit(currencyName) {
            var defaultPay = 100;
            pullWallet_1.estimateGasERC20(currencyName, config_1.defaultEthToAddr, defaultPay).then(function (res) {
                var gasLimitMap = store_1.getBorn('gasLimitMap');
                gasLimitMap.set(currencyName, res * 2);
                store_1.updateStore('gasLimitMap', gasLimitMap);
            });
        }
        // 获取币币交易交易记录

    }, {
        key: "fetchCurrencyExchangeTx",
        value: function fetchCurrencyExchangeTx() {
            var wallet = store_1.find('curWallet');
            if (!wallet) return;
            var curAllAddrs = tools_1.getAddrsAll(wallet);
            curAllAddrs.forEach(function (item) {
                pullWallet_1.getTransactionsByAddr(item);
            });
        }
        /****************************************************************************************************
         * 私有函数
         ******************************************************************************************/
        // 币币交易记录定时器

    }, {
        key: "currencyExchangeTimerStart",
        value: function currencyExchangeTimerStart() {
            var _this3 = this;

            this.fetchCurrencyExchangeTx();
            this.currencyExchangeTimer = setTimeout(function () {
                _this3.currencyExchangeTimerStart();
            }, 30 * 1000);
        }
    }, {
        key: "timerCheckAddr",
        value: function timerCheckAddr(needCheckAddr) {
            var _this4 = this;

            if (!store_1.find('curWallet')) return;
            var record = needCheckAddr.shift();
            if (!record) {
                return;
            }
            ;
            console.log('checkAddr', record.currencyName);
            if (record.currencyName === 'ETH') {
                this.checkEthAddr(record).then(function (addAddrs) {
                    if (addAddrs.length > 0) {
                        var addrs = store_1.find('addrs');
                        addrs = addrs.concat(addAddrs);
                        store_1.updateStore('addrs', addrs);
                        addAddrs.forEach(function (item) {
                            _this4.timerUpdateBalance(item.addr, 'ETH');
                        });
                    }
                    var wallet = store_1.find('curWallet');
                    if (!wallet) return;
                    wallet.currencyRecords = wallet.currencyRecords.map(function (item) {
                        if (item.currencyName === record.currencyName) {
                            item.updateAddr = true;
                            addAddrs.forEach(function (addrInfo) {
                                item.addrs.push(addrInfo.addr);
                            });
                        }
                        return item;
                    });
                    store_1.updateStore('curWallet', wallet);
                });
            } else if (record.currencyName === 'BTC') {
                this.checkBtcAddr(record).then(function (addAddrs) {
                    if (addAddrs.length > 0) {
                        var addrs = store_1.find('addrs');
                        addrs = addrs.concat(addAddrs);
                        store_1.updateStore('addrs', addrs);
                        addAddrs.forEach(function (item) {
                            _this4.timerUpdateBalance(item.addr, 'ETH');
                        });
                    }
                    var wallet = store_1.find('curWallet');
                    if (!wallet) return;
                    wallet.currencyRecords = wallet.currencyRecords.map(function (item) {
                        if (item.currencyName === record.currencyName) {
                            item.updateAddr = true;
                            addAddrs.forEach(function (addrInfo) {
                                item.addrs.push(addrInfo.addr);
                            });
                        }
                        return item;
                    });
                    store_1.updateStore('curWallet', wallet);
                });
                ;
            } else if (config_1.ERC20Tokens[record.currencyName]) {
                this.checkEthERC20TokenAddr(record).then(function (addAddrs) {
                    if (addAddrs.length > 0) {
                        var addrs = store_1.find('addrs');
                        addrs = addrs.concat(addAddrs);
                        store_1.updateStore('addrs', addrs);
                        addAddrs.forEach(function (item) {
                            _this4.timerUpdateBalance(item.addr, 'ETH');
                        });
                    }
                    var wallet = store_1.find('curWallet');
                    if (!wallet) return;
                    wallet.currencyRecords = wallet.currencyRecords.map(function (item) {
                        if (item.currencyName === record.currencyName) {
                            item.updateAddr = true;
                            addAddrs.forEach(function (addrInfo) {
                                item.addrs.push(addrInfo.addr);
                            });
                        }
                        return item;
                    });
                    store_1.updateStore('curWallet', wallet);
                });
                ;
            }
            this.checkAddrTimer = setTimeout(function () {
                _this4.timerCheckAddr(needCheckAddr);
            }, 1000);
        }
        //检查地址

    }, {
        key: "checkAddr",
        value: function checkAddr() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var wallet, currencyRecord, needCheckAddr;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wallet = store_1.find('curWallet');

                                if (wallet) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 3:
                                if (store_1.getBorn('hashMap').get(wallet.walletId)) {
                                    currencyRecord = wallet.currencyRecords;
                                    needCheckAddr = [];

                                    currencyRecord.forEach(function (item) {
                                        if (!item.updateAddr) {
                                            needCheckAddr.push(item);
                                        }
                                    });
                                    this.timerCheckAddr(needCheckAddr);
                                }

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 解析交易详情
         */

    }, {
        key: "parseTransactionDetails",
        value: function parseTransactionDetails(addr, currencyName) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.t0 = currencyName;
                                _context2.next = _context2.t0 === 'ETH' ? 3 : _context2.t0 === 'BTC' ? 5 : 7;
                                break;

                            case 3:
                                this.parseEthTransactionDetails(addr);
                                return _context2.abrupt("break", 7);

                            case 5:
                                this.parseBtcTransactionDetails(addr);
                                return _context2.abrupt("break", 7);

                            case 7:
                                if (!config_1.ERC20Tokens[currencyName]) {
                                    _context2.next = 10;
                                    break;
                                }

                                this.parseEthERC20TokenTransactionDetails(addr, currencyName);
                                return _context2.abrupt("return");

                            case 10:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        // 解析eth交易详情

    }, {
        key: "parseEthTransactionDetails",
        value: function parseEthTransactionDetails(addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this5 = this;

                var api, r, ethTrans, localTxList, allTxHash;
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
                                localTxList = walletTools_1.fetchTransactionList(addr, 'ETH');
                                allTxHash = [];

                                localTxList.forEach(function (item) {
                                    allTxHash.push(item.hash);
                                });
                                ethTrans.forEach(function (item) {
                                    if (allTxHash.indexOf(item.hash) < 0) {
                                        allTxHash.push(item.hash);
                                    }
                                });
                                // console.log(`${addr} eth all tx`,allTxHash);
                                allTxHash.forEach(function (hash) {
                                    if (_this5.neededUpdate('ETH', hash, addr)) {
                                        _this5.timerUpdateTx(addr, 'ETH', hash);
                                    }
                                    ;
                                });

                            case 10:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
        // 解析erc20交易详情

    }, {
        key: "parseEthERC20TokenTransactionDetails",
        value: function parseEthERC20TokenTransactionDetails(addr, currencyName) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this6 = this;

                var api, contractAddress, res, erc20Tx, localTxList, allTxHash;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                api = new api_2.Api();
                                contractAddress = config_1.ERC20Tokens[currencyName].contractAddr;
                                _context4.prev = 2;
                                _context4.next = 5;
                                return api.getTokenTransferEvents(contractAddress, addr);

                            case 5:
                                res = _context4.sent;
                                erc20Tx = res.result;
                                localTxList = walletTools_1.fetchTransactionList(addr, currencyName);
                                allTxHash = [];

                                localTxList.forEach(function (item) {
                                    allTxHash.push(item.hash);
                                });
                                erc20Tx.forEach(function (item) {
                                    if (allTxHash.indexOf(item.hash) < 0) {
                                        allTxHash.push(item.hash);
                                    }
                                });
                                // console.log(`${addr} ${currencyName} all tx`,allTxHash);
                                allTxHash.forEach(function (hash) {
                                    if (_this6.neededUpdate(currencyName, hash, addr)) {
                                        _this6.timerUpdateTx(addr, currencyName, hash);
                                    }
                                });
                                _context4.next = 17;
                                break;

                            case 14:
                                _context4.prev = 14;
                                _context4.t0 = _context4["catch"](2);

                                console.log('parseEthERC20TokenTransactionDetails------', _context4.t0);

                            case 17:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[2, 14]]);
            }));
        }
        // 解析btc交易详情

    }, {
        key: "parseBtcTransactionDetails",
        value: function parseBtcTransactionDetails(addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this7 = this;

                var info, btcTxList, localTxList, allTxHash;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return api_1.BtcApi.getAddrTxHistory(addr);

                            case 2:
                                info = _context5.sent;

                                if (info) {
                                    _context5.next = 5;
                                    break;
                                }

                                return _context5.abrupt("return");

                            case 5:
                                if (info.txs) {
                                    btcTxList = info.txs;
                                    localTxList = walletTools_1.fetchTransactionList(addr, 'BTC');
                                    allTxHash = [];

                                    localTxList.forEach(function (item) {
                                        allTxHash.push(item.hash);
                                    });
                                    btcTxList.forEach(function (item) {
                                        if (allTxHash.indexOf(item.txid) < 0) {
                                            allTxHash.push(item.txid);
                                        }
                                    });
                                    // console.log(`${addr} btc all tx`,allTxHash);
                                    allTxHash.forEach(function (hash) {
                                        if (_this7.neededUpdate('BTC', hash, addr)) {
                                            _this7.timerUpdateTx(addr, 'BTC', hash);
                                        }
                                        ;
                                    });
                                }

                            case 6:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: "neededUpdate",
        value: function neededUpdate(currencyName, hash, addr) {
            var txList = walletTools_1.fetchTransactionList(addr, currencyName);
            for (var i = 0; i < txList.length; i++) {
                if (txList[i].hash === hash && txList[i].currencyName === currencyName && txList[i].status === interface_1.TxStatus.SUCCESS) {
                    return false;
                }
            }
            return true;
        }
        //更新本地交易记录

    }, {
        key: "updateTransactionLocalStorage",
        value: function updateTransactionLocalStorage(tx) {
            var trans = store_1.find('transactions') || [];
            var index = -1;
            for (var i = 0; i < trans.length; i++) {
                if (trans[i].hash === tx.hash && trans[i].currencyName === tx.currencyName) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                trans.splice(index, 1, tx);
            } else {
                trans.push(tx);
            }
            store_1.updateStore('transactions', trans);
        }
        //获取eth交易详情

    }, {
        key: "getEthTransactionByHash",
        value: function getEthTransactionByHash(hash, addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var api, res1, res2, blockHash, res3, blockHeight, confirmedBlockNumber, pay, needConfirmedBlockNumber, status, gasPrice, fee, localTx, record;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (hash) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt("return");

                            case 2:
                                api = new api_2.Api();
                                _context6.next = 5;
                                return api.getTransactionReceipt(hash);

                            case 5:
                                res1 = _context6.sent;

                                if (res1) {
                                    _context6.next = 8;
                                    break;
                                }

                                return _context6.abrupt("return");

                            case 8:
                                _context6.next = 10;
                                return api.getTransaction(hash);

                            case 10:
                                res2 = _context6.sent;
                                blockHash = res1.blockHash;
                                _context6.next = 14;
                                return api.getBlock(blockHash);

                            case 14:
                                res3 = _context6.sent;
                                _context6.t0 = Number;
                                _context6.next = 18;
                                return api.getBlockNumber();

                            case 18:
                                _context6.t1 = _context6.sent;
                                blockHeight = (0, _context6.t0)(_context6.t1);
                                confirmedBlockNumber = blockHeight - res1.blockNumber + 1;
                                pay = unitTools_1.wei2Eth(res2.value);
                                needConfirmedBlockNumber = tools_1.getConfirmBlockNumber('ETH', pay);
                                status = parseInt(res1.status) === 1 ? confirmedBlockNumber >= needConfirmedBlockNumber ? interface_1.TxStatus.SUCCESS : interface_1.TxStatus.CONFIRMED : interface_1.TxStatus.FAILED;
                                gasPrice = new bignumber_1.BigNumber(res2.gasPrice);
                                fee = unitTools_1.wei2Eth(gasPrice.times(res1.gasUsed));
                                localTx = walletTools_1.fetchLocalTxByHash(addr, 'BTC', hash);
                                record = Object.assign({}, localTx, { hash: hash, txType: addr.toLowerCase() === res1.from.toLowerCase() ? localTx ? localTx.txType : interface_1.TxType.TRANSFER : interface_1.TxType.RECEIPT, fromAddr: res1.from, toAddr: res1.to, pay: pay,
                                    fee: fee, time: res3.timestamp * 1000, info: res2.input, currencyName: 'ETH', status: status,
                                    confirmedBlockNumber: confirmedBlockNumber,
                                    needConfirmedBlockNumber: needConfirmedBlockNumber, nonce: res2.nonce, addr: addr });

                                this.updateTransactionLocalStorage(record);

                            case 29:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
        //获取erc20交易详情

    }, {
        key: "getERC20TransactionByHash",
        value: function getERC20TransactionByHash(currencyName, hash, addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var api, res1, res2, blockHash, res3, blockHeight, confirmedBlockNumber, obj, pay, toAddr, needConfirmedBlockNumber, status, gasPrice, fee, localTx, record;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (hash) {
                                    _context7.next = 2;
                                    break;
                                }

                                return _context7.abrupt("return");

                            case 2:
                                api = new api_2.Api();
                                _context7.next = 5;
                                return api.getTransactionReceipt(hash);

                            case 5:
                                res1 = _context7.sent;

                                if (res1) {
                                    _context7.next = 8;
                                    break;
                                }

                                return _context7.abrupt("return");

                            case 8:
                                _context7.next = 10;
                                return api.getTransaction(hash);

                            case 10:
                                res2 = _context7.sent;
                                blockHash = res1.blockHash;
                                _context7.next = 14;
                                return api.getBlock(blockHash);

                            case 14:
                                res3 = _context7.sent;
                                _context7.t0 = Number;
                                _context7.next = 18;
                                return api.getBlockNumber();

                            case 18:
                                _context7.t1 = _context7.sent;
                                blockHeight = (0, _context7.t0)(_context7.t1);
                                confirmedBlockNumber = blockHeight - res1.blockNumber + 1;
                                obj = this.parseErc20Input(res2.input);
                                pay = unitTools_1.smallUnit2LargeUnit(currencyName, obj.pay);
                                toAddr = obj.toAddr;
                                needConfirmedBlockNumber = tools_1.getConfirmBlockNumber(currencyName, pay);
                                status = parseInt(res1.status) === 1 ? confirmedBlockNumber >= needConfirmedBlockNumber ? interface_1.TxStatus.SUCCESS : interface_1.TxStatus.CONFIRMED : interface_1.TxStatus.FAILED;
                                gasPrice = new bignumber_1.BigNumber(res2.gasPrice);
                                fee = unitTools_1.wei2Eth(gasPrice.times(res1.gasUsed));
                                localTx = walletTools_1.fetchLocalTxByHash(addr, 'BTC', hash);
                                record = Object.assign({}, localTx, { hash: hash, txType: addr.toLowerCase() === res1.from.toLowerCase() ? localTx ? localTx.txType : interface_1.TxType.TRANSFER : interface_1.TxType.RECEIPT, fromAddr: res1.from, toAddr: toAddr,
                                    pay: pay,
                                    fee: fee, time: res3.timestamp * 1000, info: '', currencyName: currencyName,
                                    status: status,
                                    confirmedBlockNumber: confirmedBlockNumber,
                                    needConfirmedBlockNumber: needConfirmedBlockNumber, nonce: res2.nonce, addr: addr });

                                this.updateTransactionLocalStorage(record);

                            case 31:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));
        }
        // 获取btc交易详情

    }, {
        key: "getBTCTransactionByHash",
        value: function getBTCTransactionByHash(hash, addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var v;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (hash) {
                                    _context8.next = 2;
                                    break;
                                }

                                return _context8.abrupt("return");

                            case 2:
                                _context8.next = 4;
                                return api_1.BtcApi.getTxInfo(hash);

                            case 4:
                                v = _context8.sent;

                                this.parseBtcTransactionTxRecord(addr, v);

                            case 6:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));
        }
        //解析erc20 input

    }, {
        key: "parseErc20Input",
        value: function parseErc20Input(input) {
            var toAddr = "0x" + input.slice(34, 74);
            var pay = Number("0x" + input.slice(74));
            return {
                toAddr: toAddr,
                pay: pay
            };
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
        /**
         * 解析btc交易详情记录
         */

    }, {
        key: "parseBtcTransactionTxRecord",
        value: function parseBtcTransactionTxRecord(addr, tx) {
            if (!tx) return;
            var vin = tx.vin;
            var fromIndex = 0;
            for (var i = 0; i < vin.length; i++) {
                if (vin[i].addr === addr) {
                    fromIndex = i;
                    break;
                }
            }
            var fromAddr = vin[fromIndex].addr || '未知';
            var vout = tx.vout;
            var toIndex = 0;
            for (var _i = 0; _i < vout.length; _i++) {
                if (fromAddr === addr) {
                    if (vout[_i].scriptPubKey.addresses) {
                        toIndex = _i;
                        break;
                    }
                } else {
                    if (vout[_i].scriptPubKey.addresses && vout[_i].scriptPubKey.addresses[0] === addr) {
                        toIndex = _i;
                        break;
                    }
                }
            }
            var toAddr = vout[toIndex].scriptPubKey.addresses;
            var value = tools_1.formatBalance(Number(vout[toIndex].value));
            var pay = value;
            var needConfirmedBlockNumber = tools_1.getConfirmBlockNumber('BTC', pay);
            var status = tx.confirmations > 0 ? tx.confirmations >= needConfirmedBlockNumber ? interface_1.TxStatus.SUCCESS : interface_1.TxStatus.CONFIRMED : interface_1.TxStatus.PENDING;
            var hash = tx.txid;
            var localTx = walletTools_1.fetchLocalTxByHash(addr, 'BTC', hash);
            var record = Object.assign({}, localTx, { hash: tx.txid, addr: addr, txType: addr === fromAddr ? localTx ? localTx.txType : interface_1.TxType.TRANSFER : interface_1.TxType.RECEIPT, fromAddr: fromAddr,
                toAddr: toAddr,
                pay: pay, time: tx.time * 1000, status: status, confirmedBlockNumber: tx.confirmations, needConfirmedBlockNumber: needConfirmedBlockNumber, info: "", currencyName: 'BTC', fee: tx.fees, nonce: -1 });
            this.updateTransactionLocalStorage(record);
        }
        // ===============================余额更新相关=======================================================
        //定时器更新余额

    }, {
        key: "timerUpdateBalance",
        value: function timerUpdateBalance(addr, currencyName) {
            var _this8 = this;

            this.updateBalance(addr, currencyName);
            var delay = this.getBalanceUpdateDelay(addr, currencyName);
            this.clearBalanceTimer(addr, currencyName);
            var timer = setTimeout(function () {
                _this8.timerUpdateBalance(addr, currencyName);
            }, delay);
            this.resetBalanceTimerList(addr, currencyName, timer, delay);
            console.log('定时更新余额', {
                delay: delay,
                addr: addr,
                currencyName: currencyName,
                time: new Date().getTime(),
                timer: timer
            });
        }
        //通过hash清楚定时器

    }, {
        key: "clearBalanceTimer",
        value: function clearBalanceTimer(addr, currencyName) {
            var timerItem = void 0;
            for (var i = 0; i < this.balanceTimerList.length; i++) {
                if (this.balanceTimerList[i].addr === addr && this.balanceTimerList[i].currencyName === currencyName) {
                    timerItem = this.balanceTimerList[i];
                    clearTimeout(timerItem.timer);
                    this.balanceTimerList.splice(i, 1);
                    return;
                }
            }
        }
        //获取余额更新间隔

    }, {
        key: "getBalanceUpdateDelay",
        value: function getBalanceUpdateDelay(addr, currencyName) {
            var second = 1000;
            var minute = 60 * second;
            // const minute = 1 * second;
            var txList = walletTools_1.fetchTransactionList(addr, currencyName);
            var now = new Date().getTime();
            var delay = 5 * minute; //默认5分钟更新
            if (currencyName === 'BTC') {
                delay = 30 * minute;
            }
            for (var i = 0; i < txList.length; i++) {
                if (txList[i].status === interface_1.TxStatus.PENDING && now - txList[i].time < 10 * minute) {
                    delay = 10 * second;
                    if (currencyName === 'BTC') {
                        delay = 10 * minute;
                    }
                    break;
                }
            }
            return delay;
        }
        /**
         * 更新余额
         */

    }, {
        key: "updateBalance",
        value: function updateBalance(addr, currencyName) {
            var _this9 = this;

            if (config_1.ERC20Tokens[currencyName]) {
                var balanceOfCode = wallet_2.EthWallet.tokenOperations('balanceof', currencyName, addr);
                var api = new api_2.Api();
                return api.ethCall(config_1.ERC20Tokens[currencyName].contractAddr, balanceOfCode).then(function (r) {
                    var num = unitTools_1.ethTokenDivideDecimals(Number(r), currencyName);
                    _this9.setBalance(addr, currencyName, num);
                });
            }
            switch (currencyName) {
                case 'ETH':
                    var _api = new api_2.Api();
                    return _api.getBalance(addr).then(function (r) {
                        var num = unitTools_1.wei2Eth(r.result);
                        _this9.setBalance(addr, currencyName, num);
                    });
                case 'BTC':
                    return api_1.BtcApi.getBalance(addr).then(function (r) {
                        _this9.setBalance(addr, currencyName, unitTools_1.sat2Btc(r));
                    });
                default:
            }
        }
        //重置余额定时器列表

    }, {
        key: "resetBalanceTimerList",
        value: function resetBalanceTimerList(addr, currencyName, timer, delay) {
            var index = -1;
            for (var i = 0; i < this.balanceTimerList.length; i++) {
                if (this.balanceTimerList[i].addr === addr && this.balanceTimerList[i].currencyName === currencyName) {
                    index = i;
                    break;
                }
            }
            var timerObj = {
                addr: addr,
                currencyName: currencyName,
                timer: timer,
                delay: delay
            };
            if (index >= 0) {
                this.balanceTimerList.splice(index, 1, timerObj);
            } else {
                this.balanceTimerList.push(timerObj);
            }
        }
        /**
         * 设置余额
         */

    }, {
        key: "setBalance",
        value: function setBalance(addr, currencyName, num) {
            var addrs = store_1.find('addrs') || [];
            var isUpdate = false;
            addrs = addrs.map(function (v) {
                if (v.addr === addr && v.currencyName === currencyName && v.balance !== num) {
                    v.balance = num;
                    isUpdate = true;
                }
                return v;
            });
            if (isUpdate) {
                store_1.updateStore('addrs', addrs);
            }
        }
        // ===============================余额更新相关=======================================================
        /**
         * 检查eth地址
         */

    }, {
        key: "checkEthAddr",
        value: function checkEthAddr(currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var wallet, mnemonic, ethWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                wallet = store_1.find('curWallet');

                                if (wallet) {
                                    _context9.next = 3;
                                    break;
                                }

                                return _context9.abrupt("return", []);

                            case 3:
                                mnemonic = walletTools_1.getMnemonicByHash(store_1.getBorn('hashMap').get(wallet.walletId));
                                ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                                _context9.next = 7;
                                return ethWallet.scanUsedAddress();

                            case 7:
                                cnt = _context9.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = ethWallet.selectAddress(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(tools_1.initAddr(address, 'ETH'));
                                }
                                return _context9.abrupt("return", addrs);

                            case 11:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));
        }
        /**
         * 检查btc地址
         */

    }, {
        key: "checkBtcAddr",
        value: function checkBtcAddr(currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var wallet, mnemonic, btcWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                wallet = store_1.find('curWallet');

                                if (wallet) {
                                    _context10.next = 3;
                                    break;
                                }

                                return _context10.abrupt("return", []);

                            case 3:
                                mnemonic = walletTools_1.getMnemonicByHash(store_1.getBorn('hashMap').get(wallet.walletId));
                                btcWallet = wallet_1.BTCWallet.fromMnemonic(mnemonic, constants_1.btcNetwork, constants_1.lang);

                                btcWallet.unlock();
                                _context10.next = 8;
                                return btcWallet.scanUsedAddress();

                            case 8:
                                cnt = _context10.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = btcWallet.derive(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(tools_1.initAddr(address, 'BTC'));
                                }
                                btcWallet.lock();
                                return _context10.abrupt("return", addrs);

                            case 13:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));
        }
        /**
         * 检查eth erc20 token地址
         */

    }, {
        key: "checkEthERC20TokenAddr",
        value: function checkEthERC20TokenAddr(currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var wallet, mnemonic, ethWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                wallet = store_1.find('curWallet');

                                if (wallet) {
                                    _context11.next = 3;
                                    break;
                                }

                                return _context11.abrupt("return", []);

                            case 3:
                                mnemonic = walletTools_1.getMnemonicByHash(store_1.getBorn('hashMap').get(wallet.walletId));
                                ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                                _context11.next = 7;
                                return ethWallet.scanTokenUsedAddress(config_1.ERC20Tokens[currencyRecord.currencyName].contractAddr);

                            case 7:
                                cnt = _context11.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = ethWallet.selectAddress(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(tools_1.initAddr(address, currencyRecord.currencyName));
                                }
                                return _context11.abrupt("return", addrs);

                            case 11:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));
        }
        //定时更新交易

    }, {
        key: "timerUpdateTx",
        value: function timerUpdateTx(addr, currencyName, hash) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var _this10 = this;

                var tx, delay, status, timer;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                tx = walletTools_1.fetchLocalTxByHash(addr, currencyName, hash);
                                delay = this.calTxDelay(tx, currencyName);
                                status = tx && tx.status;

                                if (!(status === interface_1.TxStatus.SUCCESS)) {
                                    _context12.next = 5;
                                    break;
                                }

                                return _context12.abrupt("return", tx);

                            case 5:
                                if (delay) {
                                    _context12.next = 7;
                                    break;
                                }

                                return _context12.abrupt("return");

                            case 7:
                                this.updateTxStatus(hash, currencyName, addr);
                                timer = setTimeout(function () {
                                    _this10.timerUpdateTx(addr, currencyName, hash);
                                }, delay);

                                this.resetTxTimer(hash, timer);
                                console.log('定时更新交易记录', {
                                    currencyName: currencyName,
                                    hash: hash,
                                    delay: delay,
                                    timer: timer,
                                    time: new Date().getTime()
                                });

                            case 11:
                            case "end":
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));
        }
        // 更新交易状态

    }, {
        key: "updateTxStatus",
        value: function updateTxStatus(hash, currencyName, addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                if (currencyName === 'ETH') {
                                    this.getEthTransactionByHash(hash, addr);
                                } else if (currencyName === 'BTC') {
                                    this.getBTCTransactionByHash(hash, addr);
                                } else {
                                    this.getERC20TransactionByHash(currencyName, hash, addr);
                                }

                            case 1:
                            case "end":
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));
        }
        //定时更新交易

    }, {
        key: "timerUpdateTxWithdraw",
        value: function timerUpdateTxWithdraw(tx) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                var _this11 = this;

                var addr, currencyName, hash, newTx, delay, status, timer;
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                addr = tx.addr;
                                currencyName = tx.currencyName;
                                hash = tx.hash;
                                newTx = walletTools_1.fetchLocalTxByHash(addr, currencyName, hash);
                                delay = this.calTxDelay(tx, tx.currencyName);
                                status = tx.status;

                                if (!(status === interface_1.TxStatus.SUCCESS)) {
                                    _context14.next = 8;
                                    break;
                                }

                                return _context14.abrupt("return");

                            case 8:
                                this.updateTxStatus(tx && tx.hash, currencyName, addr);

                                if (delay) {
                                    _context14.next = 11;
                                    break;
                                }

                                return _context14.abrupt("return");

                            case 11:
                                timer = setTimeout(function () {
                                    _this11.timerUpdateTxWithdraw(newTx || tx);
                                }, delay);

                                this.resetTxTimer(tx.hash, timer);

                            case 13:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));
        }
        //通过hash获取timer item

    }, {
        key: "fetchTxTimer",
        value: function fetchTxTimer(hash) {
            var timerItem = void 0;
            for (var i = 0; i < this.txTimerList.length; i++) {
                if (this.txTimerList[i].hash === hash) {
                    timerItem = this.txTimerList[i];
                    return timerItem;
                }
            }
        }
        //通过hash清楚定时器

    }, {
        key: "clearTxTimer",
        value: function clearTxTimer(hash) {
            var timerItem = void 0;
            for (var i = 0; i < this.txTimerList.length; i++) {
                if (this.txTimerList[i].hash === hash) {
                    timerItem = this.txTimerList[i];
                    clearTimeout(timerItem.timer);
                    this.txTimerList.splice(i, 1);
                    return;
                }
            }
        }
        //修改timer

    }, {
        key: "resetTxTimer",
        value: function resetTxTimer(hash, timer) {
            var index = -1;
            for (var i = 0; i < this.txTimerList.length; i++) {
                if (this.txTimerList[i].hash === hash) {
                    index = i;
                    break;
                }
            }
            var timerObj = {
                hash: hash,
                timer: timer
            };
            if (index >= 0) {
                this.txTimerList.splice(index, 1, timerObj);
            } else {
                this.txTimerList.push(timerObj);
            }
        }
        // 计算更新eth delay

    }, {
        key: "calTxDelay",
        value: function calTxDelay(tx, currencyName) {
            var second = 1000;
            var minute = 60 * second;
            // const minute = 1 * second;
            var hour = 60 * minute;
            if (!tx) {
                if (currencyName === 'BTC') {
                    return 10 * minute;
                } else {
                    return 10 * second;
                }
            }
            var curTime = new Date().getTime();
            var interval = curTime - tx.time;
            if (tx.status === interface_1.TxStatus.PENDING) {
                if (currencyName === 'BTC') {
                    if (interval < 4 * hour) {
                        //4小时以内
                        return 10 * minute;
                    } else {
                        return 30 * minute;
                    }
                } else {
                    if (interval < 10 * minute) {
                        //10分钟以内
                        return 10 * second;
                    } else {
                        //超过7天
                        return 5 * minute;
                    }
                }
            } else if (tx.status === interface_1.TxStatus.CONFIRMED) {
                if (currencyName === 'BTC') {
                    return 10 * minute;
                } else {
                    return 10 * second;
                }
            }
        }
        /**
         * 整点更新人民币美元汇率
         */

    }, {
        key: "updateUSD2CNYRate",
        value: function updateUSD2CNYRate() {
            var _this12 = this;

            var nextPoint = new Date();
            nextPoint.setHours(nextPoint.getHours() + 1);
            nextPoint.setMinutes(0);
            nextPoint.setSeconds(0);
            // nextPoint.setSeconds(nextPoint.getSeconds() + 10);
            var delay = nextPoint.getTime() - new Date().getTime();
            console.log('updateUSD2CNYRate nextPoint-------', nextPoint);
            console.log('updateUSD2CNYRate delay-------', delay);
            pull3_1.fetchUSD2CNYRate().then(function (res) {
                if (res.success == '1') {
                    console.log('updateUSD2CNYRate', res);
                    var rate = Number(res.result.rate);
                    store_1.updateStore('USD2CNYRate', rate);
                }
            });
            setTimeout(function () {
                _this12.updateUSD2CNYRate();
            }, delay);
        }
        /**
         * 整点更新货币对比USDT的比率
         */

    }, {
        key: "updateCurrency2USDTRate",
        value: function updateCurrency2USDTRate() {
            var _this13 = this;

            var nextPoint = new Date();
            var seconds = nextPoint.getSeconds();
            var delaySeconds = seconds < 30 ? 30 - seconds : 60 - seconds;
            var delay = delaySeconds * 1000;
            // console.log('updateCurrency2USDTRate',nextPoint);
            var currencyList = [];
            for (var k in config_1.MainChainCoin) {
                currencyList.push(k);
            }
            for (var _k in config_1.ERC20Tokens) {
                currencyList.push(_k);
            }
            currencyList.forEach(function (currencyName) {
                pull3_1.fetchCurrency2USDTRate(currencyName).then(function (res) {
                    console.log('fetchCurrency2USDTRate====', res);
                    if (res.status === 'ok') {
                        var currency2USDTMap = store_1.getBorn('currency2USDTMap');
                        var close = res.data[0].close;
                        var open = res.data[0].open;
                        currency2USDTMap.set(currencyName, {
                            open: open,
                            close: close
                        });
                        store_1.updateStore('currency2USDTMap', currency2USDTMap);
                    }
                }).catch(function (res) {
                    console.log('fetchCurrency2USDTRate err');
                });
            });
            setTimeout(function () {
                _this13.updateCurrency2USDTRate();
            }, delay);
        }
    }]);

    return DataCenter;
}();

exports.DataCenter = DataCenter;
// ============================================ 立即执行
/**
 * 消息处理列表
 */
exports.dataCenter = new DataCenter();
//检查地址
store_1.register('hashMap', function () {
    setTimeout(function () {
        exports.dataCenter.checkAddr();
    }, 200);
});
})