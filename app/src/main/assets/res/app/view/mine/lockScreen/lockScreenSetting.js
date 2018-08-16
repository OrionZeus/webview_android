_$define("app/view/mine/lockScreen/lockScreenSetting", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * lockScreen settings
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var globalWallet_1 = require("../../../core/globalWallet");
var tools_1 = require("../../../utils/tools");

var DisplayPage = function (_widget_1$Widget) {
    _inherits(DisplayPage, _widget_1$Widget);

    function DisplayPage() {
        _classCallCheck(this, DisplayPage);

        return _possibleConstructorReturn(this, (DisplayPage.__proto__ || Object.getPrototypeOf(DisplayPage)).call(this));
    }

    _createClass(DisplayPage, [{
        key: "create",
        value: function create() {
            _get(DisplayPage.prototype.__proto__ || Object.getPrototypeOf(DisplayPage.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var lockScreenPsw = tools_1.getLocalStorage('lockScreenPsw');
            this.state = {
                lockScreenPsw: lockScreenPsw,
                openLockScreen: lockScreenPsw && tools_1.getLocalStorage('openLockScreen') !== false,
                lockScreenTitle: '',
                showLockScreen: false,
                numberOfErrors: 0,
                errorTips: ['请输入原来的密码', '已错误1次，还有两次机会', '最后1次，否则密码将会重置']
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 处理滑块改变
         */

    }, {
        key: "onSwitchChange",
        value: function onSwitchChange() {
            var _this2 = this;

            if (!this.state.lockScreenPsw) {
                root_1.popNew('app-view-guidePages-setLockScreenScret', {}, function () {
                    _this2.state.lockScreenPsw = tools_1.getLocalStorage('lockScreenPsw');
                });
            }
            this.state.openLockScreen = !this.state.openLockScreen;
            tools_1.setLocalStorage('openLockScreen', this.state.openLockScreen);
            this.paint();
        }
        // 修改锁屏密码

    }, {
        key: "resetLockScreen",
        value: function resetLockScreen() {
            this.state.lockScreenTitle = '请输入原来的密码';
            this.state.showLockScreen = true;
            this.paint();
        }
    }, {
        key: "completedInput",
        value: function completedInput(r) {
            var _this3 = this;

            var psw = r.psw;
            if (tools_1.lockScreenVerify(psw)) {
                root_1.popNew('app-view-guidePages-setLockScreenScret', { title1: '请输入新密码', title2: '请重复新密码' });
                this.ok && this.ok();
                return;
            }
            this.state.numberOfErrors++;
            if (this.state.numberOfErrors >= 3) {
                var wallets = tools_1.getLocalStorage('wallets');
                var wallet = tools_1.getCurrentWallet(wallets);
                var gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
                var messageboxVerifyProps = {
                    title: '重置锁屏密码',
                    content: '错误次数过多，已被锁定，请验证当前钱包长密码后重置',
                    inputType: 'password',
                    tipsTitle: gwlt.nickName,
                    tipsImgUrl: wallet.avatar,
                    placeHolder: '请输入长密码',
                    confirmCallBack: this.verifyLongPsw,
                    confirmErrorText: '密码错误,请重新输入'
                };
                root_1.popNew('app-components-message-messageboxVerify', messageboxVerifyProps, function () {
                    root_1.popNew('app-view-guidePages-setLockScreenScret', { title1: '请输入新密码', title2: '请重复新密码' });
                    _this3.ok && _this3.ok();
                }, function () {
                    _this3.init();
                    _this3.paint();
                });
                return;
            }
            this.state.lockScreenTitle = this.state.errorTips[this.state.numberOfErrors];
            this.paint();
        }
        // 验证密码

    }, {
        key: "verifyLongPsw",
        value: function verifyLongPsw(r) {
            return true;
        }
    }, {
        key: "forgetPasswordClick",
        value: function forgetPasswordClick() {
            var _this4 = this;

            // tslint:disable-next-line:max-line-length
            var wallets = tools_1.getLocalStorage('wallets');
            var wallet = tools_1.getCurrentWallet(wallets);
            var gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
            var messageboxVerifyProps = {
                title: '忘记密码',
                content: '忘记锁屏密码，请验证当前钱包长密码后重置',
                inputType: 'password',
                tipsTitle: gwlt.nickName,
                tipsImgUrl: wallet.avatar,
                placeHolder: '请输入长密码',
                confirmCallBack: this.verifyLongPsw,
                confirmErrorText: '密码错误,请重新输入'
            };
            root_1.popNew('app-components-message-messageboxVerify', messageboxVerifyProps, function () {
                root_1.popNew('app-view-guidePages-setLockScreenScret', { title1: '请输入新密码', title2: '请重复新密码' });
                _this4.ok && _this4.ok();
            }, function () {
                _this4.init();
                _this4.paint();
            });
        }
    }]);

    return DisplayPage;
}(widget_1.Widget);

exports.DisplayPage = DisplayPage;
})