_$define("app/view/mine/dividend/dividendHistory", function (require, exports, module){
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
var widget_1 = require("../../../../pi/widget/widget");
var tools_1 = require("../../../shareView/utils/tools");
var conMgr_1 = require("../../../store/conMgr");
var tools_2 = require("../../../utils/tools");

var Dividend = function (_widget_1$Widget) {
    _inherits(Dividend, _widget_1$Widget);

    function Dividend() {
        _classCallCheck(this, Dividend);

        return _possibleConstructorReturn(this, (Dividend.__proto__ || Object.getPrototypeOf(Dividend)).call(this));
    }

    _createClass(Dividend, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(Dividend.prototype.__proto__ || Object.getPrototypeOf(Dividend.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
            this.initData();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                refresh: true,
                data: [{
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }, {
                    num: 0.02,
                    time: '04-30 14:32:00',
                    total: 10.2
                }]
            };
        }
    }, {
        key: "initData",
        value: function initData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var msg, data, i, _msg, _data, _i;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(this.props === 2)) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 3;
                                return conMgr_1.getMiningHistory();

                            case 3:
                                msg = _context.sent;
                                data = [];

                                for (i = 0; i < msg.value.length; i++) {
                                    data.push({
                                        num: tools_2.kpt2kt(msg.value[i][0]),
                                        total: tools_2.kpt2kt(msg.value[i][1]),
                                        time: tools_2.transDate(new Date(msg.value[i][2]))
                                    });
                                }
                                this.state.data = data;
                                _context.next = 15;
                                break;

                            case 9:
                                _context.next = 11;
                                return conMgr_1.getDividHistory();

                            case 11:
                                _msg = _context.sent;
                                _data = [];

                                for (_i = 0; _i < _msg.value.length; _i++) {
                                    _data.push({
                                        num: tools_1.wei2Eth(_msg.value[_i][1][0]),
                                        total: tools_1.wei2Eth(_msg.value[_i][1][1]),
                                        time: tools_2.transDate(new Date(_msg.value[_i][0]))
                                    });
                                }
                                this.state.data = _data;

                            case 15:
                                this.paint();

                            case 16:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }]);

    return Dividend;
}(widget_1.Widget);

exports.Dividend = Dividend;
})