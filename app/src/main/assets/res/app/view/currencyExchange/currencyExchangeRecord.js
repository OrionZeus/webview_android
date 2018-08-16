_$define("app/view/currencyExchange/currencyExchangeRecord", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * currency exchange records
 */
var root_1 = require("../../../pi/ui/root");
var widget_1 = require("../../../pi/widget/widget");
var tools_1 = require("../../utils/tools");

var CurrencyExchangeRecord = function (_widget_1$Widget) {
    _inherits(CurrencyExchangeRecord, _widget_1$Widget);

    function CurrencyExchangeRecord() {
        _classCallCheck(this, CurrencyExchangeRecord);

        return _possibleConstructorReturn(this, (CurrencyExchangeRecord.__proto__ || Object.getPrototypeOf(CurrencyExchangeRecord)).apply(this, arguments));
    }

    _createClass(CurrencyExchangeRecord, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(CurrencyExchangeRecord.prototype.__proto__ || Object.getPrototypeOf(CurrencyExchangeRecord.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var txs = this.getSortedCurrencyExchangeTxs();
            var txList = [];
            txs.forEach(function (tx) {
                // tslint:disable-next-line:variable-name
                var status_show = '';
                // tslint:disable-next-line:variable-name
                var status_class = '';
                if (tx.status === 'complete') {
                    status_show = '兑换成功';
                    status_class = 'ga-status-success';
                } else if (tx.status === 'failed') {
                    status_show = '兑换失败';
                    status_class = 'ga-status-failed';
                } else {
                    status_show = '兑换中';
                    status_class = 'ga-status-pending';
                }
                txList.push(Object.assign({}, tx, { inputTXID_show: tools_1.parseAccount(tx.inputTXID), outputTXID_show: tx.status === 'complete' && tools_1.parseAccount(tx.outputTXID), timestamp_show: tools_1.timestampFormat(tx.timestamp * 1000), status_show: status_show,
                    status_class: status_class }));
            });
            this.state = {
                txList: txList
            };
        }
    }, {
        key: "backClick",
        value: function backClick() {
            this.ok && this.ok();
        }
    }, {
        key: "getSortedCurrencyExchangeTxs",
        value: function getSortedCurrencyExchangeTxs() {
            var outAddr = tools_1.getCurrentAddrByCurrencyName(this.props.currencyName).toLowerCase();
            var currencyExchangeTxs = tools_1.getLocalStorage('currencyExchangeTxs') || {};
            var txs = currencyExchangeTxs[outAddr] || [];
            txs.sort(function (tx1, tx2) {
                return tx2.timestamp - tx1.timestamp;
            });
            return txs;
        }
    }, {
        key: "inHashClick",
        value: function inHashClick(e, index) {
            var tx = this.state.txList[index];
            var inHash = tx.inputTXID;
            var transactions = tools_1.getLocalStorage('transactions');
            var record = null;
            transactions.forEach(function (item) {
                if (item.hash === inHash) {
                    record = {
                        pay: tools_1.wei2Eth(item.value),
                        result: '已完成',
                        to: item.to,
                        tip: tools_1.wei2Eth(item.fees),
                        info: item.info,
                        fromAddr: item.from,
                        showTime: tools_1.timestampFormat(item.time),
                        id: item.hash,
                        currencyName: tx.inputCurrency
                    };
                }
            });
            if (!record) {
                var curAddrInfo = tools_1.getCurrentAddrInfo(tx.inputCurrency);
                curAddrInfo.record.forEach(function (item) {
                    if (item.id === inHash) {
                        record = Object.assign({}, item);
                    }
                });
            }
            root_1.popNew('app-view-wallet-transaction-transaction_details', Object.assign({}, record));
        }
    }, {
        key: "outHashClick",
        value: function outHashClick(e, index) {
            var tx = this.state.txList[index];
            if (tx.status !== 'complete') return;
            var outHash = tx.outputTXID;
            var transactions = tools_1.getLocalStorage('transactions');
            var record = null;
            transactions.forEach(function (item) {
                if (item.hash === outHash) {
                    record = {
                        pay: tools_1.wei2Eth(item.value),
                        result: '已完成',
                        to: item.to,
                        tip: tools_1.wei2Eth(item.fees),
                        info: item.info,
                        fromAddr: item.from,
                        showTime: tools_1.timestampFormat(item.time),
                        id: item.hash,
                        currencyName: tx.outputCurrency
                    };
                }
            });
            if (!record) return;
            root_1.popNew('app-view-wallet-transaction-transaction_details', Object.assign({}, record));
        }
    }]);

    return CurrencyExchangeRecord;
}(widget_1.Widget);

exports.CurrencyExchangeRecord = CurrencyExchangeRecord;
})