_$define("app/view/earn/exchange/exchangeDetail", function (require, exports, module){
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
var pull_1 = require("../../../net/pull");
var store_1 = require("../../../store/store");

var ExchangeDetail = function (_widget_1$Widget) {
    _inherits(ExchangeDetail, _widget_1$Widget);

    function ExchangeDetail() {
        _classCallCheck(this, ExchangeDetail);

        return _possibleConstructorReturn(this, (ExchangeDetail.__proto__ || Object.getPrototypeOf(ExchangeDetail)).apply(this, arguments));
    }

    _createClass(ExchangeDetail, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(ExchangeDetail.prototype.__proto__ || Object.getPrototypeOf(ExchangeDetail.prototype), "setProps", this).call(this, props, oldProps);
            this.state = {
                message: this.props.message ? this.props.message : this.config.value.simpleChinese.defaultMess,
                redBagList: [
                    // { cuid:111,amount:1,timeShow:'04-30 14:32:00' },
                    // { cuid:111,amount:1,timeShow:'04-30 14:32:00' },
                    // { cuid:111,amount:1,timeShow:'04-30 14:32:00' }                    
                ],
                scroll: false,
                showPin: this.props.rtype === 1,
                cfgData: this.config.value.simpleChinese
            };
            var lan = store_1.find('languageSet');
            if (lan) {
                this.state.cfgData = this.config.value[lan.languageList[lan.selected]];
                this.state.message = this.props.message ? this.props.message : this.state.cfgData.defaultMess;
            }
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 页面滑动
         */

    }, {
        key: "pageScroll",
        value: function pageScroll() {
            if (document.getElementById('exchangeDetail').scrollTop > 0) {
                this.state.scroll = true;
                if (this.state.scroll) {
                    this.paint();
                }
            } else {
                this.state.scroll = false;
                this.paint();
            }
        }
    }, {
        key: "initData",
        value: function initData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var value;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return pull_1.queryDetailLog(this.props.rid);

                            case 2:
                                value = _context.sent;

                                if (value) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 5:
                                this.state.redBagList = value[0];
                                this.state.message = value[1];
                                this.paint();

                            case 8:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return ExchangeDetail;
}(widget_1.Widget);

exports.ExchangeDetail = ExchangeDetail;
})