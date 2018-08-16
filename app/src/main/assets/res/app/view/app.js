_$define("app/view/app", function (require, exports, module){
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
 *
 */
var sendMessage_1 = require("../../pi/browser/sendMessage");
var root_1 = require("../../pi/ui/root");
var widget_1 = require("../../pi/widget/widget");
var conMgr_1 = require("../store/conMgr");
var tools_1 = require("../utils/tools");

var App = function (_widget_1$Widget) {
    _inherits(App, _widget_1$Widget);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));
    }

    _createClass(App, [{
        key: "create",
        value: function create() {
            _get(App.prototype.__proto__ || Object.getPrototypeOf(App.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                tabBarList: [{
                    text: '钱包',
                    icon: 'wallet_icon.png',
                    iconActive: 'wallet_icon_active.png',
                    components: 'app-view-wallet-home'
                }, {
                    text: '云端',
                    name: 'cloud',
                    icon: 'remote_icon.png',
                    iconActive: 'remote_icon_active.png',
                    components: 'app-view-cloud-home-home'
                }, {
                    text: '',
                    name: 'chat',
                    icon: 'chatIcon.png',
                    iconActive: 'chatIcon.png',
                    components: ''
                    // components: 'app-view-financialManagement-home'
                }, {
                    text: '理财',
                    icon: 'financialManagement_icon.png',
                    iconActive: 'financialManagement_icon_active.png',
                    components: 'app-view-financialManagement-index-index'
                    // components: 'app-view-financialManagement-home'
                },
                // {
                //     text: '交易所',
                //     icon: 'exchange_icon.png',
                //     iconActive: 'exchange_icon_active.png',
                //     components: 'app-view-exchange-home'
                // }, {
                //     text: '应用',
                //     icon: 'application_icon.png',
                //     iconActive: 'application_icon_active.png',
                //     components: 'app-view-application-home'
                // }, 
                {
                    text: '我的',
                    icon: 'mine_icon.png',
                    iconActive: 'mine_icon_active.png',
                    components: 'app-view-mine-home'
                }],
                isActive: 0
            };
        }
    }, {
        key: "tabBarChangeListener",
        value: function tabBarChangeListener(event, index) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var wallets;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(this.state.isActive === index)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 2:
                                if (!(this.state.tabBarList[index].name === 'chat')) {
                                    _context.next = 5;
                                    break;
                                }

                                this.setProxy().then(this.sendMessage);
                                return _context.abrupt("return");

                            case 5:
                                if (!(this.state.tabBarList[index].name === 'cloud')) {
                                    _context.next = 10;
                                    break;
                                }

                                wallets = tools_1.getLocalStorage('wallets');

                                if (!(!wallets || wallets.walletList.length === 0)) {
                                    _context.next = 10;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { itype: 'error', content: '请创建钱包', center: true });
                                return _context.abrupt("return");

                            case 10:
                                this.state.isActive = index;
                                this.paint();

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "tabChangeTo",
        value: function tabChangeTo(e) {
            var index = e.index;
            if (this.state.isActive === index) return;
            this.state.isActive = index;
            this.paint();
        }
        /**
         * 打开聊天界面
         */

    }, {
        key: "sendMessage",
        value: function sendMessage() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var chat;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return conMgr_1.doChat();

                            case 2:
                                chat = new sendMessage_1.SendChatMessage();

                                chat.init();
                                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                                    chat.prepareChat({
                                        success: function success(result) {
                                            resolve(result);
                                        },
                                        fail: function fail(result) {
                                            reject(result);
                                        }
                                    });
                                }));

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        /**
         * 设置代理
         */

    }, {
        key: "setProxy",
        value: function setProxy() {
            var chat = new sendMessage_1.SendChatMessage();
            chat.init();
            // todo 这里需要向服务器通信获取代理地址，且区分国内外的情况
            return new Promise(function (resolve, reject) {
                conMgr_1.getProxy().then(function (r) {
                    if (r.result !== 1) {
                        reject(r.result);
                        return;
                    }
                    var proxy = JSON.parse(r.proxy);
                    if (proxy.protocol === 'socks5') {
                        chat.setProxy({
                            success: function success(result) {
                                resolve(result);
                            },
                            fail: function fail(result) {
                                reject(result);
                            },
                            proxyIp: proxy.ip, proxyPort: proxy.prot, userName: '', password: ''
                        });
                    } else {
                        reject('no support');
                    }
                });
            });
        }
    }]);

    return App;
}(widget_1.Widget);

exports.App = App;
})