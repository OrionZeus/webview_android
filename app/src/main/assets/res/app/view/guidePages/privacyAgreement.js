_$define("app/view/guidePages/privacyAgreement", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * privacy agreement
 */
var root_1 = require("../../../pi/ui/root");
var widget_1 = require("../../../pi/widget/widget");
var tools_1 = require("../../utils/tools");

var PrivacyAgreement = function (_widget_1$Widget) {
    _inherits(PrivacyAgreement, _widget_1$Widget);

    function PrivacyAgreement() {
        _classCallCheck(this, PrivacyAgreement);

        return _possibleConstructorReturn(this, (PrivacyAgreement.__proto__ || Object.getPrototypeOf(PrivacyAgreement)).call(this));
    }

    _createClass(PrivacyAgreement, [{
        key: "create",
        value: function create() {
            _get(PrivacyAgreement.prototype.__proto__ || Object.getPrototypeOf(PrivacyAgreement.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                userProtocolReaded: false,
                // tslint:disable-next-line:max-line-length
                agreement: '尊敬的用户：某某（以下简称“我们”）尊重并保护用户（以下简称“您”）的隐私，您使用FairBlock时，某某将按照本隐私政策（以下简称“本政策”）收集、使用您的个人信息。某某建议您在使用本产品（以下简称“FairBlock”）之前仔细阅读并理解本政策全部内容, 针对免责声明等条款在内的重要信息将以加粗的形式体现。本政策有关关键词定义与某某《FairBlock服务协议》保持一致。本政策可由某某在线随时更新，更新后的政策一旦公布即代替原来的政策，如果您不接受修改后的条款，请立即停止使用FairBlock，您继续使用FairBlock将被视为接受修改后的政策。经修改的政策一经在FairBlock上公布，立即自动生效。您知悉本政策及其他有关规定适用于FairBlock及FairBlock上某某所自主拥有的DApp。一、 我们收集您的哪些信息请您知悉，我们收集您的以下信息是出于满足您在FairBlock服务需要的目的，且我们十分重视对您隐私的保护。在我们收集您的信息时，将严格遵守“合法、正当、必要”的原则。且您知悉，若您不提供我们服务所需的相关信息，您在FairBlock的服务体验可能因此而受到'
            };
        }
    }, {
        key: "checkBoxClick",
        value: function checkBoxClick(e) {
            this.state.userProtocolReaded = e.newType === 'true' ? true : false;
            this.paint();
        }
    }, {
        key: "readedClick",
        value: function readedClick() {
            if (!this.state.userProtocolReaded) {
                return;
            }
            tools_1.setLocalStorage('hasReadedPrivacyAgreement', true);
            root_1.popNew('app-view-guidePages-displayPage');
            this.ok && this.ok();
        }
    }]);

    return PrivacyAgreement;
}(widget_1.Widget);

exports.PrivacyAgreement = PrivacyAgreement;
})