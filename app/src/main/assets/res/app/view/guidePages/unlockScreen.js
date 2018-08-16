_$define("app/view/guidePages/unlockScreen", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * unlock screen
 */
var root_1 = require("../../../pi/ui/root");
var widget_1 = require("../../../pi/widget/widget");
var globalWallet_1 = require("../../core/globalWallet");
var tools_1 = require("../../utils/tools");

var UnlockScreen = function (_widget_1$Widget) {
    _inherits(UnlockScreen, _widget_1$Widget);

    function UnlockScreen() {
        _classCallCheck(this, UnlockScreen);

        return _possibleConstructorReturn(this, (UnlockScreen.__proto__ || Object.getPrototypeOf(UnlockScreen)).call(this));
    }

    _createClass(UnlockScreen, [{
        key: "create",
        value: function create() {
            _get(UnlockScreen.prototype.__proto__ || Object.getPrototypeOf(UnlockScreen.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                passwordScreenTitle: '解锁屏幕',
                numberOfErrors: 0,
                errorTips: ['解锁屏幕', '已错误1次，还有两次机会', '最后1次，否则密码将会重置']
            };
        }
    }, {
        key: "completedInput",
        value: function completedInput(r) {
            var _this2 = this;

            var psw = r.psw;
            if (tools_1.lockScreenVerify(psw)) {
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
                    _this2.ok && _this2.ok();
                }, function () {
                    _this2.init();
                    _this2.paint();
                });
                return;
            }
            this.state.passwordScreenTitle = this.state.errorTips[this.state.numberOfErrors];
            this.paint();
        }
        // 验证密码

    }, {
        key: "verifyLongPsw",
        value: function verifyLongPsw(r) {
            return false;
        }
    }, {
        key: "forgetPasswordClick",
        value: function forgetPasswordClick() {
            var _this3 = this;

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
                _this3.ok && _this3.ok();
            }, function () {
                _this3.init();
                _this3.paint();
            });
        }
    }]);

    return UnlockScreen;
}(widget_1.Widget);

exports.UnlockScreen = UnlockScreen;
})