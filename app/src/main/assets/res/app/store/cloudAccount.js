_$define("app/store/cloudAccount", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = require("../utils/tools");
var conMgr_1 = require("./conMgr");
var store_1 = require("./store");
/**
 * 云端账号数据中心
 */

var CloudAccount = function () {
    function CloudAccount() {
        _classCallCheck(this, CloudAccount);

        // 云端账户余额
        this.cloudBalance = {
            KT: 0,
            ETH: 0
        };
    }
    /**
     * 初始化
     */


    _createClass(CloudAccount, [{
        key: "init",
        value: function init() {
            this.updateBalance();
        }
    }, {
        key: "updateBalance",
        value: function updateBalance() {
            var _this = this;

            conMgr_1.getAllBalance().then(function (balanceInfo) {
                console.log('balanceInfo', balanceInfo);
                for (var i = 0; i < balanceInfo.value.length; i++) {
                    var each = balanceInfo.value[i];
                    if (each[0] === conMgr_1.CurrencyType.KT) {
                        _this.cloudBalance.KT = tools_1.kpt2kt(each[1]);
                    } else if (each[0] === conMgr_1.CurrencyType.ETH) {
                        _this.cloudBalance.ETH = tools_1.wei2Eth(each[1]);
                    }
                }
                store_1.notify('cloudBalance', _this.cloudBalance);
            }).catch(console.log);
        }
    }]);

    return CloudAccount;
}();

exports.cloudAccount = new CloudAccount();
})