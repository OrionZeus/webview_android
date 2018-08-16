_$define("app/view/wallet/home", function (require, exports, module){
"use strict";
/**
 * wallet home page
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../pi/ui/root");
var widget_1 = require("../../../pi/widget/widget");
var globalWallet_1 = require("../../core/globalWallet");
var conMgr_1 = require("../../store/conMgr");
var dataCenter_1 = require("../../store/dataCenter");
var store_1 = require("../../store/store");
var constants_1 = require("../../utils/constants");
var tools_1 = require("../../utils/tools");

var Home = function (_widget_1$Widget) {
    _inherits(Home, _widget_1$Widget);

    function Home() {
        _classCallCheck(this, Home);

        var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

        _this.registerWalletsFun = function (wallets) {
            var otherWallets = false;
            if (wallets && wallets.walletList && wallets.walletList.length > 0) {
                otherWallets = true;
            } else {
                otherWallets = false;
            }
            var wallet = tools_1.getCurrentWallet(wallets);
            var gwlt = null;
            if (wallet) {
                gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
            }
            _this.state.gwlt = gwlt;
            _this.state.otherWallets = otherWallets;
            _this.state.wallet = wallet;
            _this.state.currencyList = parseCurrencyList(wallet);
            _this.registerAddrsFun();
            _this.paint();
        };
        /**
         * 余额更新
         */
        _this.registerAddrsFun = function (addrs) {
            console.log('余额更新');
            var wallets = tools_1.getLocalStorage('wallets');
            var wallet = tools_1.getCurrentWallet(wallets);
            if (!wallet) return;
            wallet.currencyRecords.forEach(function (item) {
                var balance = tools_1.fetchBalanceOfCurrency(item.addrs, item.currencyName);
                setCurrencyListBalance(_this.state.currencyList, balance, item.currencyName);
            });
            _this.state.totalAssets = tools_1.formatBalanceValue(tools_1.fetchTotalAssets());
            _this.paint();
        };
        return _this;
    }

    _createClass(Home, [{
        key: "create",
        value: function create() {
            _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var r = _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "destroy", this).call(this);
            store_1.unregister('wallets', this.registerWalletsFun);
            store_1.unregister('addrs', this.registerAddrsFun);
            return r;
        }
    }, {
        key: "init",
        value: function init() {
            var wallets = tools_1.getLocalStorage('wallets');
            store_1.register('wallets', this.registerWalletsFun);
            store_1.register('addrs', this.registerAddrsFun);
            var gwlt = null;
            var wallet = null;
            var otherWallets = false;
            if (wallets && wallets.walletList && wallets.walletList.length > 0) {
                otherWallets = true;
                wallet = tools_1.getCurrentWallet(wallets);
                if (wallet) {
                    gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
                }
            } else {
                otherWallets = false;
            }
            this.state = {
                wallet: wallet,
                gwlt: gwlt,
                otherWallets: otherWallets,
                totalAssets: 0.00,
                currencyList: parseCurrencyList(wallet),
                floatBoxTip: '为了您的资产安全，请及时备份助记词',
                hiddenAssets: false
            };
            this.registerAddrsFun();
            // 登录云端账号
            conMgr_1.openAndGetRandom();
        }
    }, {
        key: "clickCurrencyItemListener",
        value: function clickCurrencyItemListener(e, index) {
            var wallets = tools_1.getLocalStorage('wallets');
            var wallet = tools_1.getCurrentWallet(wallets);
            if (!wallets || wallets.walletList.length === 0) {
                this.createWalletClick();
                return;
            }
            if (!wallet) {
                root_1.popNew('app-view-wallet-switchWallet-switchWallet');
                return;
            }
            var currency = this.state.currencyList[index];
            root_1.popNew('app-view-wallet-transaction-currency_details', {
                currencyName: currency.currencyName, currencyBalance: currency.balance + " " + currency.currencyName,
                currencyBalanceConversion: currency.balanceValue
            });
        }
    }, {
        key: "clickAddCurrencyListener",
        value: function clickAddCurrencyListener() {
            root_1.popNew('app-view-wallet-assets-add_asset');
        }
    }, {
        key: "createWalletClick",
        value: function createWalletClick() {
            if (this.state.otherWallets) {
                root_1.popNew('app-view-wallet-switchWallet-switchWallet');
                return;
            }
            root_1.popNew('app-view-wallet-walletCreate-createWalletEnter');
        }
    }, {
        key: "switchWalletClick",
        value: function switchWalletClick() {
            root_1.popNew('app-view-wallet-switchWallet-switchWallet');
        }
    }, {
        key: "hiddenAssetsClick",
        value: function hiddenAssetsClick() {
            this.state.hiddenAssets = !this.state.hiddenAssets;
            this.paint();
        }
    }]);

    return Home;
}(widget_1.Widget);

exports.Home = Home;
/**
 * 解析钱包货币
 *
 * @param wallet 钱包
 */
var parseCurrencyList = function parseCurrencyList(wallet) {
    var list = [];
    // todo 测试代码  不处理没有的情况
    // if (!wallet.showCurrencys) return list;
    var showCurrencys = wallet && wallet.showCurrencys || constants_1.defalutShowCurrencys;
    // todo  这里需要正确的处理钱包货币
    dataCenter_1.dataCenter.currencyList.forEach(function (v) {
        if (showCurrencys.indexOf(v.name) < 0) return;
        list.push({
            currencyName: v.name,
            currencyFullName: v.description,
            balance: 0,
            balanceValue: 0.00
        });
    });
    return list;
};
var setCurrencyListBalance = function setCurrencyListBalance(currencyList, balance, currencyName) {
    return currencyList.map(function (item) {
        if (item.currencyName === currencyName) {
            var rate = dataCenter_1.dataCenter.getExchangeRate(currencyName);
            item.balance = tools_1.formatBalance(balance);
            item.balanceValue = tools_1.formatBalanceValue(+(balance * rate.CNY));
        }
        return item;
    });
};
})