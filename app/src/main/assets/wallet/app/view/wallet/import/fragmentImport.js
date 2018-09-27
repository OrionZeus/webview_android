_$define("app/view/wallet/import/fragmentImport", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * image import
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var native_1 = require("../../../logic/native");
var interface_1 = require("../../../store/interface");
var home_1 = require("./home");

var FragmentImport = function (_widget_1$Widget) {
    _inherits(FragmentImport, _widget_1$Widget);

    function FragmentImport() {
        _classCallCheck(this, FragmentImport);

        return _possibleConstructorReturn(this, (FragmentImport.__proto__ || Object.getPrototypeOf(FragmentImport)).apply(this, arguments));
    }

    _createClass(FragmentImport, [{
        key: "create",
        value: function create() {
            _get(FragmentImport.prototype.__proto__ || Object.getPrototypeOf(FragmentImport.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                fragment1: '',
                fragment2: ''
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "fragment1Change",
        value: function fragment1Change(e) {
            this.state.fragment1 = e.value;
            this.paint();
        }
    }, {
        key: "fragment2Change",
        value: function fragment2Change(e) {
            this.state.fragment2 = e.value;
            this.paint();
        }
    }, {
        key: "doScanQRCode",
        value: function doScanQRCode(e, num) {
            var _this2 = this;

            native_1.doScanQrCode(function (fragment) {
                _this2.state["fragment" + num] = fragment;
                _this2.paint();
            });
            console.log(num);
        }
    }, {
        key: "nextClick",
        value: function nextClick() {
            if (!this.state.fragment1) {
                root_1.popNew('app-components-message-message', { content: '请输入片段1' });
                return;
            }
            if (!this.state.fragment2) {
                root_1.popNew('app-components-message-message', { content: '请输入片段2' });
                return;
            }
            // tslint:disable-next-line:max-line-length
            root_1.popNew('app-view-wallet-create-createWallet', { itype: interface_1.CreateWalletType.FragmentImport, fragment1: this.state.fragment1, fragment2: this.state.fragment2 });
            var w = home_1.forelet.getWidget(home_1.WIDGET_NAME);
            if (w) {
                w.ok && w.ok();
            }
        }
    }]);

    return FragmentImport;
}(widget_1.Widget);

exports.FragmentImport = FragmentImport;
})