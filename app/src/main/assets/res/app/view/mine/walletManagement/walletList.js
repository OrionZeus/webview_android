_$define("app/view/mine/walletManagement/walletList", function (require, exports, module){
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
 * 钱包列表页面展示所有钱包
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var globalWallet_1 = require("../../../core/globalWallet");
var dataCenter_1 = require("../../../store/dataCenter");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");

var WalletList = function (_widget_1$Widget) {
    _inherits(WalletList, _widget_1$Widget);

    function WalletList() {
        _classCallCheck(this, WalletList);

        var _this = _possibleConstructorReturn(this, (WalletList.__proto__ || Object.getPrototypeOf(WalletList)).call(this));

        _this.registerWalletsFun = function () {
            _this.init();
            _this.paint();
        };
        return _this;
    }

    _createClass(WalletList, [{
        key: "create",
        value: function create() {
            _get(WalletList.prototype.__proto__ || Object.getPrototypeOf(WalletList.prototype), "create", this).call(this);
            store_1.register('wallets', this.registerWalletsFun);
            this.init();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            store_1.unregister('wallets', this.registerWalletsFun);
            return _get(WalletList.prototype.__proto__ || Object.getPrototypeOf(WalletList.prototype), "destroy", this).call(this);
        }
    }, {
        key: "init",
        value: function init() {
            // 获取钱包显示头像
            var wallets = tools_1.getLocalStorage('wallets');
            console.log('-------walletList---------');
            console.log(wallets);
            // const wallet = getCurrentWallet(wallets);
            var fromJSON = globalWallet_1.GlobalWallet.fromJSON;
            this.state = {
                wallets: wallets,
                fromJSON: fromJSON
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "listItemClicked",
        value: function listItemClicked(walletId) {
            root_1.popNew('app-view-mine-walletManagement-walletManagement', { walletId: walletId });
        }
    }, {
        key: "backupClicked",
        value: function backupClicked(walletId) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var close, wallets, wallet, passwd, mnemonic;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                close = root_1.popNew('pi-components-loading-loading', { text: '导出中...' });
                                _context.prev = 1;
                                wallets = tools_1.getLocalStorage('wallets');
                                wallet = tools_1.getWalletByWalletId(wallets, walletId);
                                passwd = void 0;

                                if (dataCenter_1.dataCenter.getHash(wallet.walletId)) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 8;
                                return tools_1.openBasePage('app-components-message-messageboxPrompt', {
                                    title: '输入密码', content: '', inputType: 'password'
                                });

                            case 8:
                                passwd = _context.sent;

                            case 9:
                                _context.next = 11;
                                return tools_1.getMnemonic(wallet, passwd);

                            case 11:
                                mnemonic = _context.sent;

                                if (mnemonic) {
                                    root_1.popNew('app-view-wallet-backupWallet-backupMnemonicWord', { mnemonic: mnemonic, passwd: passwd, walletId: walletId });
                                } else {
                                    root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });
                                }
                                _context.next = 19;
                                break;

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context["catch"](1);

                                console.log(_context.t0);
                                root_1.popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });

                            case 19:
                                close.callback(close.widget);

                            case 20:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 15]]);
            }));
        }
    }]);

    return WalletList;
}(widget_1.Widget);

exports.WalletList = WalletList;
})