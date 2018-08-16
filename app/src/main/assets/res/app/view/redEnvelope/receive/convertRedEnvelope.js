_$define("app/view/redEnvelope/receive/convertRedEnvelope", function (require, exports, module){
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
 * convert red-envelope
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var cloudAccount_1 = require("../../../store/cloudAccount");
var conMgr_1 = require("../../../store/conMgr");
var toolMessages_1 = require("../../../utils/toolMessages");
var tools_1 = require("../../../utils/tools");

var ConvertRedEnvelope = function (_widget_1$Widget) {
    _inherits(ConvertRedEnvelope, _widget_1$Widget);

    function ConvertRedEnvelope() {
        _classCallCheck(this, ConvertRedEnvelope);

        return _possibleConstructorReturn(this, (ConvertRedEnvelope.__proto__ || Object.getPrototypeOf(ConvertRedEnvelope)).apply(this, arguments));
    }

    _createClass(ConvertRedEnvelope, [{
        key: "create",
        value: function create() {
            _get(ConvertRedEnvelope.prototype.__proto__ || Object.getPrototypeOf(ConvertRedEnvelope.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                cid: '',
                placeHolder: '输入兑换码，领取红包'
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "redemptionCodeChange",
        value: function redemptionCodeChange(e) {
            this.state.cid = e.value;
            this.paint();
        }
        // 兑换

    }, {
        key: "convertClick",
        value: function convertClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var code, close, res, r, redEnvelope;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                code = this.state.cid.trim();

                                if (!(code.length <= 0)) {
                                    _context.next = 4;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { itype: 'error', content: '请输入兑换码', center: true });
                                return _context.abrupt("return");

                            case 4:
                                close = root_1.popNew('pi-components-loading-loading', { text: '兑换中...' });
                                _context.prev = 5;
                                _context.next = 8;
                                return this.convertRedEnvelope(code);

                            case 8:
                                res = _context.sent;

                                if (!(res.result !== 1)) {
                                    _context.next = 13;
                                    break;
                                }

                                toolMessages_1.showError(res.result);
                                close.callback(close.widget);
                                return _context.abrupt("return");

                            case 13:
                                tools_1.removeLocalStorage('convertRedEnvelopeHistoryRecord');
                                cloudAccount_1.cloudAccount.updateBalance();
                                _context.next = 17;
                                return this.queryDesc(code);

                            case 17:
                                r = _context.sent;
                                redEnvelope = {
                                    leaveMessage: r.value,
                                    ctype: res.value[0],
                                    amount: tools_1.formatBalance(tools_1.smallUnit2LargeUnit(conMgr_1.CurrencyTypeReverse[res.value[0]], res.value[1]))
                                };

                                root_1.popNew('app-view-redEnvelope-receive-openRedEnvelope', Object.assign({}, redEnvelope, { rtype: code.slice(0, 2) }));
                                _context.next = 25;
                                break;

                            case 22:
                                _context.prev = 22;
                                _context.t0 = _context["catch"](5);

                                console.log(_context.t0);

                            case 25:
                                close.callback(close.widget);
                                this.state.cid = '';
                                this.paint();

                            case 28:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[5, 22]]);
            }));
        }
    }, {
        key: "redEnvelopeRecordsClick",
        value: function redEnvelopeRecordsClick() {
            root_1.popNew('app-view-redEnvelope-receive-redEnvelopeRecord');
        }
    }, {
        key: "convertRedEnvelope",
        value: function convertRedEnvelope(code) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var perCode, validCode, res, data;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                perCode = code.slice(0, 2);
                                validCode = code.slice(2);
                                res = { result: -1, value: [] };

                                if (!(perCode === conMgr_1.RedEnvelopeType.Normal)) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 6;
                                return conMgr_1.convertRedBag(validCode);

                            case 6:
                                res = _context2.sent;
                                _context2.next = 23;
                                break;

                            case 9:
                                if (!(perCode === conMgr_1.RedEnvelopeType.Invite)) {
                                    _context2.next = 23;
                                    break;
                                }

                                _context2.next = 12;
                                return conMgr_1.getData('convertRedEnvelope');

                            case 12:
                                data = _context2.sent;

                                if (!data.value) {
                                    _context2.next = 16;
                                    break;
                                }

                                res.result = -2;
                                return _context2.abrupt("return", res);

                            case 16:
                                _context2.next = 18;
                                return conMgr_1.inputInviteCdKey(validCode);

                            case 18:
                                res = _context2.sent;

                                res.value = [conMgr_1.CurrencyType.ETH, tools_1.eth2Wei(0.015)];
                                _context2.next = 22;
                                return conMgr_1.setData({ key: 'convertRedEnvelope', value: new Date().getTime() });

                            case 22:
                                console.log('兑换成功', data);

                            case 23:
                                console.log('convert_red_bag', res);
                                return _context2.abrupt("return", res);

                            case 25:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "queryDesc",
        value: function queryDesc(code) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var perCode, validCode, res;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                perCode = code.slice(0, 2);
                                validCode = code.slice(2);
                                res = { result: -1, value: '' };

                                if (!(perCode === conMgr_1.RedEnvelopeType.Normal)) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 6;
                                return conMgr_1.queryRedBagDesc(validCode);

                            case 6:
                                res = _context3.sent;
                                _context3.next = 10;
                                break;

                            case 9:
                                if (perCode === conMgr_1.RedEnvelopeType.Invite) {
                                    res.result = 1;
                                    res.value = 'KuPay大礼包';
                                }

                            case 10:
                                return _context3.abrupt("return", res);

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);

    return ConvertRedEnvelope;
}(widget_1.Widget);

exports.ConvertRedEnvelope = ConvertRedEnvelope;
})