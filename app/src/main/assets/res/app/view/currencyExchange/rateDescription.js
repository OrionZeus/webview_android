_$define("app/view/currencyExchange/rateDescription", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rate description
 */
var widget_1 = require("../../../pi/widget/widget");

var RateDescription = function (_widget_1$Widget) {
    _inherits(RateDescription, _widget_1$Widget);

    function RateDescription() {
        _classCallCheck(this, RateDescription);

        return _possibleConstructorReturn(this, (RateDescription.__proto__ || Object.getPrototypeOf(RateDescription)).apply(this, arguments));
    }

    _createClass(RateDescription, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(RateDescription.prototype.__proto__ || Object.getPrototypeOf(RateDescription.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                desc: '换币服务由shapeshift平台提供支持，换币汇率取决于国内外主流交易平台的实时相对价格，另外加上矿工费用及shapeshift平台收取的约0.5%服务费用。换币实际所得数量会因为实时价格有所浮动。换币矿工费会通过计算近期交易中矿工费得出'
            };
        }
    }, {
        key: "cancelClick",
        value: function cancelClick() {
            this.ok && this.ok();
        }
    }]);

    return RateDescription;
}(widget_1.Widget);

exports.RateDescription = RateDescription;
})