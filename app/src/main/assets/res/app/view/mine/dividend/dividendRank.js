_$define("app/view/mine/dividend/dividendRank", function (require, exports, module){
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
 * 挖矿及矿山排名
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var conMgr_1 = require("../../../store/conMgr");
var tools_1 = require("../../../utils/tools");

var DividendItem = function (_widget_1$Widget) {
    _inherits(DividendItem, _widget_1$Widget);

    function DividendItem() {
        _classCallCheck(this, DividendItem);

        return _possibleConstructorReturn(this, (DividendItem.__proto__ || Object.getPrototypeOf(DividendItem)).call(this));
    }

    _createClass(DividendItem, [{
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "create",
        value: function create() {
            _get(DividendItem.prototype.__proto__ || Object.getPrototypeOf(DividendItem.prototype), "create", this).call(this);
            this.init();
            this.initData();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                mineSecond: false,
                mineThird: false,
                minePage: 1,
                mineMore: false,
                mineList: [],
                mineRank: [{
                    index: 1,
                    name: '昵称未设置',
                    num: '96,554,000.00'
                }],
                miningSecond: false,
                miningThird: false,
                miningPage: 1,
                miningMore: false,
                miningList: [],
                miningRank: [{
                    index: 1,
                    name: '昵称未设置',
                    num: '96,554,000.00'
                }]
            };
        }
        /**
         * 查看排名详情列表
         * @param ind 1 为矿山排名，2 为挖矿排名
         */

    }, {
        key: "gotoMore",
        value: function gotoMore(ind) {
            if (ind === 1) {
                root_1.popNew('app-view-mine-dividend-rankList', { data: this.state.mineList });
            } else {
                root_1.popNew('app-view-mine-dividend-rankList', { data: this.state.miningList });
            }
        }
    }, {
        key: "getMore",
        value: function getMore(ind) {
            if (ind === 1) {
                var msg = this.state.mineList;
                for (var i = this.state.minePage * 10; i < msg.length && i < (this.state.minePage + 1) * 10; i++) {
                    this.state.mineRank.push({
                        index: i + 1,
                        name: msg[i][1] === '' ? '昵称未设置' : msg[i][1],
                        num: tools_1.kpt2kt(msg[i][2])
                    });
                }
            } else {
                var _msg = this.state.miningList;
                for (var _i = this.state.minePage * 10; _i < _msg.length && _i < (this.state.minePage + 1) * 10; _i++) {
                    this.state.miningRank.push({
                        index: _i + 1,
                        name: _msg[_i][1] === '' ? '昵称未设置' : _msg[_i][1],
                        num: tools_1.kpt2kt(_msg[_i][2])
                    });
                }
            }
            this.paint();
        }
    }, {
        key: "initData",
        value: function initData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var msg1, msg2, data1, i, data2, _i2;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return conMgr_1.getMineRank(100);

                            case 2:
                                msg1 = _context.sent;
                                _context.next = 5;
                                return conMgr_1.getMiningRank(100);

                            case 5:
                                msg2 = _context.sent;

                                this.state.mineList = msg1.value;
                                this.state.miningList = msg2.value;
                                if (msg1.value.length > 10) {
                                    this.state.mineMore = true;
                                    this.state.mineSecond = true;
                                    this.state.mineThird = true;
                                } else if (msg1.value.length > 2) {
                                    this.state.mineSecond = true;
                                    this.state.mineThird = true;
                                } else if (msg1.value.length > 1) {
                                    this.state.mineSecond = true;
                                }
                                if (msg2.value.length > 10) {
                                    this.state.miningMore = true;
                                    this.state.miningSecond = true;
                                    this.state.miningThird = true;
                                } else if (msg2.value.length > 2) {
                                    this.state.miningSecond = true;
                                    this.state.miningThird = true;
                                } else if (msg2.value.length > 1) {
                                    this.state.miningSecond = true;
                                }
                                data1 = [];

                                for (i = 0; i < msg1.value.length && i < 10; i++) {
                                    data1.push({
                                        index: i + 1,
                                        name: msg1.value[i][1] === '' ? '昵称未设置' : msg1.value[i][1],
                                        num: tools_1.kpt2kt(msg1.value[i][2])
                                    });
                                }
                                this.state.mineRank = data1;
                                data2 = [];

                                for (_i2 = 0; _i2 < msg2.value.length && _i2 < 10; _i2++) {
                                    data2.push({
                                        index: _i2 + 1,
                                        name: msg2.value[_i2][1] === '' ? '昵称未设置' : msg2.value[_i2][1],
                                        num: tools_1.kpt2kt(msg2.value[_i2][2])
                                    });
                                }
                                this.state.miningRank = data2;
                                this.paint();

                            case 17:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return DividendItem;
}(widget_1.Widget);

exports.DividendItem = DividendItem;
})