_$define("app/view/mine/setting/setting", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * setting
 */
// =============================================导入
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");
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
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            var cfg = this.config.value.simpleChinese;
            var lan = store_1.find('languageSet');
            if (lan) {
                cfg = this.config.value[lan.languageList[lan.selected]];
            }
            this.state = {
                lockScreenPsw: '',
                openLockScreen: false,
                lockScreenTitle: '',
                numberOfErrors: 0,
                errorTips: cfg.errorTips,
                itemList: [{ title: cfg.itemTitle[3], list: cfg.languageSet, selected: 0 }, { title: cfg.itemTitle[4], list: ['CNY', 'USD'], selected: 0 }, { title: cfg.itemTitle[5], list: cfg.changeColor, selected: 0 }],
                userHead: '../../../res/image/default_avater_big.png',
                userName: cfg.defaultName,
                userInput: false,
                wallet: null,
                cfgData: cfg
            };
            var wallet = store_1.find('curWallet');
            if (wallet) {
                // gwlt = GlobalWallet.fromJSON(wallet.gwlt);
                var gwlt = JSON.parse(wallet.gwlt);
                this.state.userHead = wallet.avatar ? wallet.avatar : '../../../res/image/default_avater_big.png';
                this.state.userName = gwlt.nickName;
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
            // tslint:disable-next-line:max-line-length
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
                ls.open = !this.state.openLockScreen;
                store_1.updateStore('lockScreen', ls);
            } else if (this.state.wallet) {
                root_1.popNew('app-components-keyboard-keyboard', { title: this.state.cfgData.keyboardTitle[0] }, function (r) {
                    console.error(r);
                    _this2.state.lockScreenPsw = r;
                    _this2.reSetLockPsw();
                }, function () {
                    _this2.closeLockPsw();
                    return false;
                });
            } else {
                // tslint:disable-next-line:max-line-length
                root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox1, function () {
                    root_1.popNew('app-view-wallet-create-home');
                }, function () {
                    _this2.closeLockPsw();
                });
            }
            this.state.openLockScreen = !this.state.openLockScreen;
            this.paint();
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
         * 重复锁屏密码
         */

    }, {
        key: "reSetLockPsw",
        value: function reSetLockPsw() {
            var _this3 = this;

            root_1.popNew('app-components-keyboard-keyboard', { title: this.state.cfgData.keyboardTitle[1] }, function (r) {
                console.error(r);
                if (_this3.state.lockScreenPsw !== r) {
                    root_1.popNew('app-components-message-message', { content: _this3.state.cfgData.tips[0] });
                    _this3.reSetLockPsw();
                } else {
                    var hash256 = tools_1.lockScreenHash(r);
                    var ls = store_1.find('lockScreen');
                    ls.psw = hash256;
                    ls.open = true;
                    store_1.updateStore('lockScreen', ls);
                    root_1.popNew('app-components-message-message', { content: _this3.state.cfgData.tips[1] });
                }
            }, function () {
                _this3.closeLockPsw();
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
                // tslint:disable-next-line:max-line-length
                root_1.popNew('app-components-modalBoxInput-modalBoxInput', this.state.cfgData.modalBoxInput, function (r) {
                    var wallet = store_1.find('curWallet');
                    var fg = walletTools_1.VerifyIdentidy(wallet, r);
                    // const fg = true;
                    if (fg) {
                        root_1.popNew('app-components-keyboard-keyboard', { title: _this4.state.cfg.keyboardTitle[0] }, function (r) {
                            console.error(r);
                            _this4.state.lockScreenPsw = r;
                            _this4.reSetLockPsw();
                        }, function () {
                            _this4.closeLockPsw();
                            return false;
                        });
                    }
                });
            } else {
                root_1.popNew('app-components-keyboard-keyboard', { title: this.state.errorTips[ind] }, function (r) {
                    if (tools_1.lockScreenVerify(r)) {
                        root_1.popNew('app-components-keyboard-keyboard', { title: _this4.state.cfg.keyboardTitle[0] }, function (r) {
                            _this4.state.lockScreenPsw = r;
                            _this4.reSetLockPsw();
                        }, function () {
                            _this4.closeLockPsw();
                            return false;
                        });
                    } else {
                        _this4.oldLockPsw(++ind);
                    }
                });
            }
        }
        /**
         * 点击切换基础属性
         */

    }, {
        key: "itemClick",
        value: function itemClick(ind) {
            var _this5 = this;

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
                    _this5.state.itemList[ind - 2].selected = index;
                    // if (ind === 2) {
                    //     updateStore('languageSet',{ selected:index,languageList:this.state.cfgData.languageSet });  // 更新语言设置
                    // }
                    _this5.paint();
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
         * 用户名修改
         */

    }, {
        key: "userNameChange",
        value: function userNameChange(e) {
            if (e.value !== this.state.userName) {
                this.state.userName = e.value;
                var walletList = store_1.find('walletList');
                var gwlt = this.state.wallet.gwlt;
                gwlt.nickName = e.value;
                this.state.wallet.gwlt = JSON.parse(gwlt);
                store_1.updateStore('walletList', walletList);
                store_1.updateStore('curWallet', this.state.wallet);
            }
        }
        /**
         * 注销账户
         */

    }, {
        key: "logOut",
        value: function logOut() {
            var _this6 = this;

            if (!this.judgeWallet()) {
                return;
            }
            root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox2, function () {
                // popNew('');
                console.log('备份');
            }, function () {
                root_1.popNew('app-components-modalBox-modalBox', { title: '', content: _this6.state.cfgData.tips[2], style: 'color:#F7931A;' }, function () {
                    console.log('注销账户');
                });
            });
        }
    }]);

    return Setting;
}(widget_1.Widget);

exports.Setting = Setting;
store_1.register('languageSet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
})