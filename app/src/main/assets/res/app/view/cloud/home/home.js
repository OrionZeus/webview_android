_$define("app/view/cloud/home/home", function (require, exports, module){
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
 * 云端首页
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var cloudAccount_1 = require("../../../store/cloudAccount");
var conMgr_1 = require("../../../store/conMgr");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");

var Home = function (_widget_1$Widget) {
    _inherits(Home, _widget_1$Widget);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));
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
            this.state = {
                ktBalance: 0.00,
                ethBalance: 0.00,
                bonus: 0.00,
                mines: 0,
                isAbleBtn: true // 挖矿按钮是否可点击
            };
            this.initDate();
        }
        /**
         * 点击云端账户
         */

    }, {
        key: "cloudAccountClicked",
        value: function cloudAccountClicked() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                root_1.popNew('app-view-cloud-cloudAccount-cloudAccount', { ktBalance: this.state.ktBalance, ethBalance: this.state.ethBalance });

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 点击发红包
         */

    }, {
        key: "packetsClicked",
        value: function packetsClicked() {
            // TODO
            root_1.popNew('app-view-redEnvelope-send-sendRedEnvelope');
        }
        /**
         * 点击兑换领奖
         */

    }, {
        key: "awardsClicked",
        value: function awardsClicked() {
            // TODO
            root_1.popNew('app-view-redEnvelope-receive-convertRedEnvelope');
        }
        /**
         * 领分红
         */

    }, {
        key: "bonusClicked",
        value: function bonusClicked() {
            // TODO
            root_1.popNew('app-view-mine-dividend-dividend', this.state.ktBalance);
        }
        /**
         * 点击邀请好友
         */

    }, {
        key: "friendsClicked",
        value: function friendsClicked() {
            // TODO
        }
    }, {
        key: "toTradingPlaces",
        value: function toTradingPlaces() {}
        // TODO

        /**
         * 显示挖矿详情
         */

    }, {
        key: "mining",
        value: function mining() {
            root_1.popNew('app-view-mine-dividend-mining');
        }
        /**
         * 挖矿
         */

    }, {
        key: "doPadding",
        value: function doPadding() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var r;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return conMgr_1.getAward();

                            case 2:
                                r = _context2.sent;

                                if (!(r.result !== 1)) {
                                    _context2.next = 6;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { itype: 'outer', center: true, content: "\u6316\u77FF\u5931\u8D25(" + r.result + ")" });
                                return _context2.abrupt("return");

                            case 6:
                                cloudAccount_1.cloudAccount.updateBalance();
                                root_1.popNew('app-components-message-message', { itype: 'outer', center: true, content: '挖矿成功' });

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        /**
         * 邀请红包
         */

    }, {
        key: "inviteRedEnvelopeClick",
        value: function inviteRedEnvelopeClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var inviteCodeInfo, inviteCodeDetailInfo;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return conMgr_1.getInviteCode();

                            case 2:
                                inviteCodeInfo = _context3.sent;
                                _context3.next = 5;
                                return conMgr_1.getInviteCodeDetail();

                            case 5:
                                inviteCodeDetailInfo = _context3.sent;

                                if (!(inviteCodeInfo.result !== 1 || inviteCodeDetailInfo.result !== 1)) {
                                    _context3.next = 8;
                                    break;
                                }

                                return _context3.abrupt("return");

                            case 8:
                                root_1.popNew('app-view-redEnvelope-send-inviteRedEnvelope', {
                                    inviteCode: inviteCodeInfo.cid, inviteCodeDetailInfo: inviteCodeDetailInfo.value
                                });

                            case 9:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "destroy",
        value: function destroy() {
            store_1.unregister('cloudBalance', null);
            return _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "destroy", this).call(this);
        }
    }, {
        key: "initDate",
        value: function initDate() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this2 = this;

                var cloudBalance, msg, totalNum, holdNum, today, nowNum, divid;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                cloudBalance = cloudAccount_1.cloudAccount.cloudBalance;

                                this.state.ktBalance = tools_1.formatBalance(cloudBalance.KT);
                                this.state.ethBalance = tools_1.formatBalance(cloudBalance.ETH);
                                store_1.register('cloudBalance', function (cloudBalance) {
                                    _this2.state.ktBalance = tools_1.formatBalance(cloudBalance.KT);
                                    _this2.state.ethBalance = tools_1.formatBalance(cloudBalance.ETH);
                                    _this2.paint();
                                });
                                _context4.next = 6;
                                return conMgr_1.getMining();

                            case 6:
                                msg = _context4.sent;
                                totalNum = tools_1.kpt2kt(msg.mine_total);
                                holdNum = tools_1.kpt2kt(msg.mines);
                                today = tools_1.kpt2kt(msg.today);
                                nowNum = (totalNum - holdNum + today) * 0.25 - today; // 本次可挖数量为矿山剩余量的0.25减去今日已挖

                                if (nowNum <= 0) {
                                    nowNum = 0; // 如果本次可挖小于等于0，表示现在不能挖
                                    this.state.isAbleBtn = false;
                                } else if (totalNum - holdNum > 100) {
                                    nowNum = nowNum < 100 && totalNum - holdNum > 100 ? 100 : nowNum; // 如果本次可挖小于100，且矿山剩余量大于100，则本次可挖100
                                } else {
                                    nowNum = totalNum - holdNum; // 如果矿山剩余量小于100，则本次挖完所有剩余量
                                }
                                this.state.mines = nowNum;
                                _context4.next = 15;
                                return conMgr_1.getDividend();

                            case 15:
                                divid = _context4.sent;

                                this.state.bonus = tools_1.wei2Eth(divid.value[0]);
                                this.paint();

                            case 18:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }]);

    return Home;
}(widget_1.Widget);

exports.Home = Home;
})