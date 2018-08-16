_$define("app/components/message/messageboxVerify", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 确认提示框--验证
 */
var root_1 = require("../../../pi/ui/root");
var widget_1 = require("../../../pi/widget/widget");

var MessageBoxVerify = function (_widget_1$Widget) {
    _inherits(MessageBoxVerify, _widget_1$Widget);

    function MessageBoxVerify() {
        _classCallCheck(this, MessageBoxVerify);

        return _possibleConstructorReturn(this, (MessageBoxVerify.__proto__ || Object.getPrototypeOf(MessageBoxVerify)).call(this));
    }

    _createClass(MessageBoxVerify, [{
        key: "create",
        value: function create() {
            _get(MessageBoxVerify.prototype.__proto__ || Object.getPrototypeOf(MessageBoxVerify.prototype), "create", this).call(this);
            this.config = { value: { group: 'top' } };
            this.state = {
                input: ''
            };
        }
        /**
         * 点击确认
         */

    }, {
        key: "doClickSure",
        value: function doClickSure() {
            var _this2 = this;

            var close = root_1.popNew('pi-components-loading-loading', { text: '验证中...' });
            setTimeout(function () {
                close.callback(close.widget);
                if (_this2.props.confirmCallBack(_this2.state.input)) {
                    _this2.ok && _this2.ok(_this2.state.input);
                } else {
                    _this2.state.input = '';
                    root_1.popNew('app-components-message-message', { itype: 'error', content: _this2.props.confirmErrorText, center: true });
                    _this2.paint();
                }
            }, 1000);
        }
        /**
         * 点击取消
         */

    }, {
        key: "doClickCancel",
        value: function doClickCancel() {
            this.cancel && this.cancel();
        }
        /**
         * 提示框数据改变
         */

    }, {
        key: "inputChange",
        value: function inputChange(e) {
            this.state.input = e.value;
        }
    }]);

    return MessageBoxVerify;
}(widget_1.Widget);

exports.MessageBoxVerify = MessageBoxVerify;
})