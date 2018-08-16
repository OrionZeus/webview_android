_$define("app/view/cloud/accountAssests/others", function (require, exports, module){
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
 * 其他操作记录
 */
var util_1 = require("../../../../pi/net/websocket/util");
var widget_1 = require("../../../../pi/widget/widget");
var conMgr_1 = require("../../../store/conMgr");
var tools_1 = require("../../../utils/tools");

var Others = function (_widget_1$Widget) {
    _inherits(Others, _widget_1$Widget);

    function Others() {
        _classCallCheck(this, Others);

        return _possibleConstructorReturn(this, (Others.__proto__ || Object.getPrototypeOf(Others)).call(this));
    }

    _createClass(Others, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(Others.prototype.__proto__ || Object.getPrototypeOf(Others.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = { infoList: [] };
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var r, list;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return conMgr_1.getAccountDetail(conMgr_1.CurrencyType[this.props.coinType]);

                            case 2:
                                r = _context.sent;

                                console.log('流水', r);
                                if (r.value.length > 0) {
                                    list = [];

                                    r.value.forEach(function (v) {
                                        var itype = v[0];
                                        var amount = tools_1.smallUnit2LargeUnit(_this2.props.coinType, v[1]);
                                        var behavior = '';
                                        if (itype === conMgr_1.TaskSid.redEnvelope) {
                                            if (amount > 0) {
                                                behavior = '领红包';
                                            } else {
                                                behavior = '发红包';
                                            }
                                        } else {
                                            behavior = util_1.isArray(v[2]) ? v[2].map(function (v1) {
                                                return String.fromCharCode(v1);
                                            }).join('') : v[2];
                                        }
                                        list.push({
                                            type: v[0],
                                            amount: amount,
                                            behavior: behavior,
                                            time: tools_1.timestampFormat(v[3]),
                                            behaviorIcon: getIconByType(v[0])
                                        });
                                    });
                                    this.state.infoList = list;
                                    this.paint();
                                }

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return Others;
}(widget_1.Widget);

exports.Others = Others;
/**
 * 通过类型获取图标
 */
var getIconByType = function getIconByType(iType) {
    if (iType === conMgr_1.TaskSid.mines) {
        return 'cloud_others_drag.png';
    } else if (iType === conMgr_1.TaskSid.redEnvelope) {
        return 'cloud_others_pockets.png';
    }
    // '发红包'---cloud_others_pockets.png
    // '分红'---cloud_others_bonus.png
};
})