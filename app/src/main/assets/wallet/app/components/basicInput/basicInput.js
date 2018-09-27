_$define("app/components/basicInput/basicInput", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 基础输入框组件
 * {prepend:"红包个数",placeholder:"0",itype:"number",append:"个",style:"",isShowPin:false}
 * prepend:前置标题
 * placeholder:输入框提示语
 * append:后置单位
 * itype:输入数据类型，text，number，password
 * style:额外的CSS样式
 * isShowPin:拼字样是否需要显示，默认false
 * input:输入框填充数据
 */
var widget_1 = require("../../../pi/widget/widget");

var BasicInput = function (_widget_1$Widget) {
    _inherits(BasicInput, _widget_1$Widget);

    function BasicInput() {
        _classCallCheck(this, BasicInput);

        return _possibleConstructorReturn(this, (BasicInput.__proto__ || Object.getPrototypeOf(BasicInput)).call(this));
    }

    return BasicInput;
}(widget_1.Widget);

exports.BasicInput = BasicInput;
})