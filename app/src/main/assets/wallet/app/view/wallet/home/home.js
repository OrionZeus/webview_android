_$define("app/view/wallet/home/home", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * wallet home
 */
// ==============================导入
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");
var pull_1 = require("../../../net/pull");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var Home = function (_widget_1$Widget) {
    _inherits(Home, _widget_1$Widget);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: "create",
        value: function create() {
            _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var userInfo = tools_1.getUserInfo();
            var cfg = tools_1.getLanguage(this);
            this.state = {
                tabs: [{
                    tab: cfg.tabs[0],
                    components: 'app-view-wallet-home-cloudHome'
                }, {
                    tab: cfg.tabs[1],
                    components: 'app-view-wallet-home-walletHome'
                }],
                activeNum: 1,
                avatar: userInfo && userInfo.avatar,
                totalAsset: tools_1.formatBalanceValue(tools_1.fetchTotalAssets() + tools_1.fetchCloudTotalAssets()),
                cfgData: cfg,
                refreshing: false,
                currencyUnitSymbol: tools_1.getCurrencyUnitSymbol()
            };
            this.paint();
        }
    }, {
        key: "tabsChangeClick",
        value: function tabsChangeClick(event, value) {
            this.state.activeNum = value;
            this.paint();
        }
    }, {
        key: "userInfoChange",
        value: function userInfoChange() {
            var userInfo = tools_1.getUserInfo();
            this.state.avatar = userInfo.avatar || '';
            this.paint();
        }
    }, {
        key: "updateTotalAsset",
        value: function updateTotalAsset() {
            this.state.totalAsset = tools_1.formatBalanceValue(tools_1.fetchTotalAssets() + tools_1.fetchCloudTotalAssets());
            this.paint();
        }
    }, {
        key: "currencyUnitChange",
        value: function currencyUnitChange() {
            this.state.totalAsset = tools_1.formatBalanceValue(tools_1.fetchTotalAssets() + tools_1.fetchCloudTotalAssets());
            this.state.currencyUnitSymbol = tools_1.getCurrencyUnitSymbol();
            this.paint();
        }
        /**
         * 打开我的设置
         */

    }, {
        key: "showMine",
        value: function showMine() {
            root_1.popNew('app-view-mine-home-home');
        }
    }, {
        key: "refreshClick",
        value: function refreshClick() {
            var _this2 = this;

            if (this.state.refreshing) {
                return;
            }
            this.state.refreshing = true;
            this.paint();
            var neededRefreshCount = 1;
            pull_1.getCloudBalance().then(function () {
                neededRefreshCount--;
                if (neededRefreshCount === 0) {
                    _this2.state.refreshing = false;
                    _this2.paint();
                }
            }).catch(function () {
                neededRefreshCount--;
                if (neededRefreshCount === 0) {
                    _this2.state.refreshing = false;
                    _this2.paint();
                }
            });
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
                var dataCenter = pi_modules.commonjs.exports.relativeGet('app/logic/dataCenter').exports.dataCenter;
                addrs.forEach(function (v) {
                    if (list.indexOf(v.addr) >= 0 && wallet.showCurrencys.indexOf(v.currencyName) >= 0) {
                        neededRefreshCount++;
                        dataCenter.updateBalance(v.addr, v.currencyName).then(function () {
                            neededRefreshCount--;
                            if (neededRefreshCount === 0) {
                                _this2.state.refreshing = false;
                                _this2.paint();
                            }
                        });
                    }
                });
            }
        }
    }]);

    return Home;
}(widget_1.Widget);

exports.Home = Home;
// ==========================本地
store_1.register('userInfo', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.userInfoChange();
    }
});
// 云端余额变化
store_1.register('cloudBalance', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateTotalAsset();
    }
});
store_1.register('languageSet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.init();
    }
});
// 货币涨跌幅度变化
store_1.register('currency2USDTMap', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateTotalAsset();
    }
});
// 货币单位变化
store_1.register('currencyUnit', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.currencyUnitChange();
    }
});
})