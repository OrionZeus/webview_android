_$define("app/view/mine/setting/setting", function (require, exports, module){
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
 * setting
 */
// =============================================导入
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");
var interface_1 = require("../../../store/interface");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var Setting = function (_widget_1$Widget) {
    _inherits(Setting, _widget_1$Widget);

    function Setting() {
        _classCallCheck(this, Setting);

        return _possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).call(this));
    }

    _createClass(Setting, [{
        key: "create",
        value: function create() {
            _get(Setting.prototype.__proto__ || Object.getPrototypeOf(Setting.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var cfg = tools_1.getLanguage(this);
            var lan = store_1.find('languageSet');
            var color = store_1.find('changeColor');
            var currencyUnit = store_1.find('currencyUnit') || interface_1.CurrencyUnit.CNY;
            this.state = {
                lockScreenPsw: '',
                openLockScreen: false,
                lockScreenTitle: '',
                numberOfErrors: 0,
                errorTips: cfg.errorTips,
                itemList: [{ title: cfg.itemTitle[3], list: cfg.languageSet, selected: lan ? lan.selected : 0 }, { title: cfg.itemTitle[4], list: cfg.currencyUnit, selected: currencyUnit }, { title: cfg.itemTitle[5], list: cfg.changeColor, selected: color ? color.selected : 0 }],
                userHead: '../../../res/image/default_avater_big.png',
                userName: cfg.defaultName,
                userInput: false,
                wallet: null,
                phone: cfg.bindPhone,
                cfgData: cfg
            };
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            var userInfo = store_1.find('userInfo');
            if (userInfo) {
                this.state.userHead = userInfo.avatar ? userInfo.avatar : '../../../res/image/default_avater_big.png';
                this.state.userName = userInfo.nickName ? userInfo.nickName : this.state.cfgData.defaultName;
                var bphone = userInfo.bphone;
                if (bphone) {
                    var str = String(bphone).substr(3, 6);
                    this.state.phone = bphone.replace(str, '******');
                }
            }
            var wallet = store_1.find('curWallet');
            if (wallet) {
                this.state.wallet = wallet;
            }
            var ls = store_1.find('lockScreen');
            if (ls) {
                this.state.lockScreenPsw = ls.psw;
                this.state.openLockScreen = ls.psw && ls.open !== false;
            }
            this.paint();
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 判断当前用户是否已经创建钱包
         */

    }, {
        key: "judgeWallet",
        value: function judgeWallet() {
            if (this.state.wallet) {
                return true;
            }
            root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox1, function () {
                root_1.popNew('app-view-wallet-create-home');
            });
            return false;
        }
        /**
         * 处理锁屏开关切换
         */

    }, {
        key: "onSwitchChange",
        value: function onSwitchChange() {
            var _this2 = this;

            if (this.state.openLockScreen) {
                // 如果锁屏开关打开则直接关闭
                var ls = store_1.find('lockScreen');
                ls.open = !ls.open;
                this.state.openLockScreen = false;
                store_1.updateStore('lockScreen', ls);
            } else if (this.state.wallet) {
                root_1.popNew('app-components1-lockScreenPage-lockScreenPage', { firstFg: true }, function (r) {
                    if (!r) {
                        _this2.closeLockPsw();
                        _this2.state.openLockScreen = false;
                    } else {
                        _this2.state.openLockScreen = true;
                    }
                });
            } else {
                // tslint:disable-next-line:max-line-length
                root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox1, function () {
                    root_1.popNew('app-view-wallet-create-home');
                }, function () {
                    _this2.closeLockPsw();
                });
            }
            this.paint(true);
        }
        /**
         * 修改锁屏密码
         */

    }, {
        key: "lockScreen",
        value: function lockScreen() {
            root_1.popNew('app-components1-lockScreenPage-lockScreenPage', { firstFg: false });
        }
        /**
         * 关闭锁屏开关
         */

    }, {
        key: "closeLockPsw",
        value: function closeLockPsw() {
            this.state.openLockScreen = false;
            this.state.lockScreenPsw = '';
            this.paint();
        }
        /**
         * 点击切换基础属性
         */

    }, {
        key: "itemClick",
        value: function itemClick(ind) {
            var _this3 = this;

            if (!this.judgeWallet()) {
                return;
            }
            if (ind === 0) {
                root_1.popNew('app-view-mine-setting-phone');
            } else if (ind === 1) {
                root_1.popNew('app-view-mine-setting-changePsw');
            } else {
                var data = this.state.itemList[ind - 2];
                console.log(data);
                root_1.popNew('app-view-mine-setting-itemList', data, function (index) {
                    _this3.state.itemList[ind - 2].selected = index;
                    if (ind === 2) {
                        // tslint:disable-next-line:max-line-length
                        store_1.updateStore('languageSet', {
                            selected: index === 2 ? 0 : index,
                            languageList: ['simpleChinese', 'tranditionalChinese', 'English']
                        });
                    } else if (ind === 3) {
                        var currencyUnit = void 0;
                        if (index === 0) {
                            currencyUnit = interface_1.CurrencyUnit.CNY;
                        } else {
                            currencyUnit = interface_1.CurrencyUnit.USD;
                        }
                        store_1.updateStore('currencyUnit', currencyUnit);
                    } else if (ind === 4) {
                        // tslint:disable-next-line:max-line-length
                        store_1.updateStore('changeColor', {
                            selected: index,
                            colorList: ['redUp', 'greenUp']
                        });
                    }
                    _this3.paint();
                });
            }
        }
        /**
         * 点击可输入用户名
         */

    }, {
        key: "changeInput",
        value: function changeInput() {
            if (!this.judgeWallet()) {
                return;
            }
            this.state.userInput = true;
            this.paint();
        }
        /**
         * 监听用户名修改
         */

    }, {
        key: "userNameChange",
        value: function userNameChange(e) {
            if (e.value !== this.state.userName) {
                this.state.userName = e.value;
            }
        }
        /**
         * 取消聚焦后更新用户名
         */

    }, {
        key: "userNameConfirm",
        value: function userNameConfirm() {
            var userInfo = store_1.find('userInfo');
            if (userInfo.nickName !== this.state.userName && this.state.userName !== '') {
                userInfo.nickName = this.state.userName;
                store_1.updateStore('userInfo', userInfo);
                pull_1.setUserInfo();
            }
        }
        /**
         * 备份
         */

    }, {
        key: "backUp",
        value: function backUp() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var psw, ret;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return tools_1.popPswBox();

                            case 2:
                                psw = _context.sent;

                                if (psw) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 5:
                                _context.next = 7;
                                return walletTools_1.backupMnemonic(psw);

                            case 7:
                                ret = _context.sent;

                                if (ret) {
                                    root_1.popNew('app-view-wallet-backup-index', Object.assign({}, ret));
                                    this.ok && this.ok();
                                }

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 注销账户
         */

    }, {
        key: "logOut",
        value: function logOut() {
            var _this4 = this;

            if (!this.judgeWallet()) {
                return;
            }
            root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox2, function () {
                _this4.backUp();
                console.log('备份');
            }, function () {
                root_1.popNew('app-components-modalBox-modalBox', { title: '', content: _this4.state.cfgData.tips[2], style: 'color:#F7931A;' }, function () {
                    tools_1.logoutAccountDel();
                    _this4.backPrePage();
                    console.log('注销账户');
                });
            });
        }
    }]);

    return Setting;
}(widget_1.Widget);

exports.Setting = Setting;
// ================================================本地，立即执行
store_1.register('languageSet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.init();
    }
});
store_1.register('userInfo', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
store_1.register('curWallet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
store_1.register('lockScreen', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
})