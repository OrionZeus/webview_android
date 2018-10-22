_$define("app/components1/lockScreenPage/lockScreenPage", function (require, exports, module){
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
 * pasword screen
 */
var exitApp_1 = require("../../../pi/browser/exitApp");
var root_1 = require("../../../pi/ui/root");
var forelet_1 = require("../../../pi/widget/forelet");
var widget_1 = require("../../../pi/widget/widget");
var store_1 = require("../../store/store");
var tools_1 = require("../../utils/tools");
var walletTools_1 = require("../../utils/walletTools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var LockScreenPage = function (_widget_1$Widget) {
    _inherits(LockScreenPage, _widget_1$Widget);

    function LockScreenPage() {
        _classCallCheck(this, LockScreenPage);

        return _possibleConstructorReturn(this, (LockScreenPage.__proto__ || Object.getPrototypeOf(LockScreenPage)).call(this));
    }

    _createClass(LockScreenPage, [{
        key: "setProps",
        value: function setProps(oldProps, props) {
            _get(LockScreenPage.prototype.__proto__ || Object.getPrototypeOf(LockScreenPage.prototype), "setProps", this).call(this, oldProps, props);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var cfg = tools_1.getLanguage(this);
            this.state = {
                cfgData: cfg,
                errorTips: cfg.errorTips,
                lockScreenPsw: '',
                openLockScreen: false,
                loading: false
            };
            if (this.props.firstFg) {
                // true表示设置锁屏密码，首次打开此界面
                this.setLockPsw();
            } else if (this.props.open) {
                this.unLockScreen(0);
            } else {
                this.oldLockPsw(0);
            }
        }
        /**
         * 关闭页面
         */

    }, {
        key: "close",
        value: function close(fg) {
            this.ok && this.ok(fg);
        }
        /**
         * 设置锁屏密码
         */

    }, {
        key: "setLockPsw",
        value: function setLockPsw() {
            var _this2 = this;

            root_1.popNew('app-components1-keyboard-keyboard', { title: this.state.cfgData.keyboardTitle[0] }, function (r) {
                console.error(r);
                _this2.state.lockScreenPsw = r;
                _this2.reSetLockPsw();
            }, function () {
                _this2.close(false);
            });
        }
        /**
         * 重复锁屏密码
         */

    }, {
        key: "reSetLockPsw",
        value: function reSetLockPsw() {
            var _this3 = this;

            root_1.popNew('app-components1-keyboard-keyboard', { title: this.state.cfgData.keyboardTitle[1] }, function (r) {
                if (_this3.state.lockScreenPsw !== r) {
                    root_1.popNew('app-components1-message-message', { content: _this3.state.cfgData.tips[0] });
                    _this3.reSetLockPsw();
                } else {
                    var hash256 = tools_1.lockScreenHash(r);
                    var ls = store_1.find('lockScreen');
                    ls.psw = hash256;
                    ls.open = true;
                    store_1.updateStore('lockScreen', ls);
                    root_1.popNew('app-components1-message-message', { content: _this3.state.cfgData.tips[1] });
                }
                _this3.close(true);
            }, function () {
                _this3.close(false);
            });
        }
        /**
         * 输入原锁屏密码
         */

    }, {
        key: "oldLockPsw",
        value: function oldLockPsw(ind) {
            var _this4 = this;

            if (ind > 2) {
                var close = root_1.popNew('app-components1-loading-loading', { text: this.state.cfgData.loading });
                // tslint:disable-next-line:max-line-length
                root_1.popNew('app-components1-modalBoxInput-modalBoxInput', this.state.cfgData.modalBoxInput1, function (r) {
                    return __awaiter(_this4, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        var wallet, fg;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        wallet = store_1.find('curWallet');
                                        _context.next = 3;
                                        return walletTools_1.VerifyIdentidy(wallet, r);

                                    case 3:
                                        fg = _context.sent;

                                        close.callback(close.widget);
                                        // const fg = true;
                                        if (fg) {
                                            // 三次密码错误但成功验证身份后重新设置密码
                                            this.setLockPsw();
                                        } else {
                                            root_1.popNew('app-components1-message-message', { content: this.state.cfgData.tips[2] });
                                        }

                                    case 6:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));
                }, function () {
                    close.callback(close.widget);
                });
            } else {
                root_1.popNew('app-components1-keyboard-keyboard', { title: this.state.errorTips[ind] }, function (r) {
                    if (tools_1.lockScreenVerify(r)) {
                        // 原密码输入成功后重新设置密码
                        _this4.setLockPsw();
                    } else {
                        _this4.oldLockPsw(++ind);
                    }
                });
            }
        }
        /**
         * 进入APP解锁屏幕
         */

    }, {
        key: "unLockScreen",
        value: function unLockScreen(ind) {
            var _this5 = this;

            if (ind > 2) {
                this.judgeLoading();
                this.verifyPsw();
            } else {
                var title = this.state.errorTips[ind === 0 ? 3 : ind];
                root_1.popNew('app-components1-keyboard-keyboard', { title: title, closePage: 1 }, function (r) {
                    if (tools_1.lockScreenVerify(r)) {
                        // 原密码输入成功后重新设置密码
                        _this5.close(true);
                    } else {
                        _this5.unLockScreen(++ind);
                    }
                });
            }
        }
        /**
         * 进入APP三次解锁屏幕失败后验证身份
         */

    }, {
        key: "verifyPsw",
        value: function verifyPsw() {
            var _this6 = this;

            // tslint:disable-next-line:max-line-length
            root_1.popNew('app-components1-modalBoxInput-modalBoxInput', this.state.cfgData.modalBoxInput2, function (r) {
                return __awaiter(_this6, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var close, wallet, fg;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    close = root_1.popNew('app-components1-loading-loading', { text: this.state.cfgData.loading });

                                    if (!this.state.loading) {
                                        _context2.next = 8;
                                        break;
                                    }

                                    wallet = store_1.find('curWallet');
                                    _context2.next = 5;
                                    return walletTools_1.VerifyIdentidy(wallet, r);

                                case 5:
                                    fg = _context2.sent;

                                    close.callback(close.widget);
                                    if (fg) {
                                        // 三次密码错误但成功验证身份后重新设置密码
                                        this.setLockPsw();
                                    } else {
                                        // 进入APP验证身份失败后再次进入验证身份步骤
                                        root_1.popNew('app-components1-message-message', { content: this.state.cfgData.tips[2] });
                                        this.verifyPsw();
                                    }

                                case 8:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            }, function (fg) {
                if (fg) {
                    var exitApp = new exitApp_1.ExitApp();
                    exitApp.init();
                    exitApp.exitApplication({});
                }
            });
        }
        /**
         * 判断资源加载完成
         */

    }, {
        key: "judgeLoading",
        value: function judgeLoading() {
            var loaded = store_1.find('level_2_page_loaded');
            if (loaded || localStorage.loadingSuccess) {
                this.state.loading = true;
                this.paint();
            }
        }
    }]);

    return LockScreenPage;
}(widget_1.Widget);

exports.LockScreenPage = LockScreenPage;
store_1.register('level_2_page_loaded', function (loaded) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.judgeLoading();
        localStorage.loadingSuccess = true;
    }
});
})