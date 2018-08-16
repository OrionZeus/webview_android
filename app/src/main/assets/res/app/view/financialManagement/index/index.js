_$define("app/view/financialManagement/index/index", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 理财产品首页
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");

var Index = function (_widget_1$Widget) {
    _inherits(Index, _widget_1$Widget);

    function Index() {
        _classCallCheck(this, Index);

        return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this));
    }

    _createClass(Index, [{
        key: "create",
        value: function create() {
            _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                record: [{
                    title: 'ETH资管第1期',
                    amount: '1',
                    bonus: '0.002',
                    days: '2'
                }, {
                    title: 'ETH资管第1期',
                    amount: '1',
                    bonus: '0.002',
                    days: '2'
                }],
                productList: [{
                    title: '优选理财-随存随取',
                    surplus: '50%',
                    profit: '5%',
                    productName: 'ETH资管第1期',
                    productDescribe: ' 赎回T+0到账 | 0.1 ETH/份',
                    isSoldOut: false
                }, {
                    title: '优选理财-随存随取',
                    surplus: '50%',
                    profit: '5%',
                    productName: 'ETH资管第1期',
                    productDescribe: ' 赎回T+0到账 | 0.1 ETH/份',
                    isSoldOut: true
                }]
            };
        }
    }, {
        key: "toDetail",
        value: function toDetail() {
            root_1.popNew('app-view-financialManagement-productDetail-productDetail');
        }
    }, {
        key: "toRecord",
        value: function toRecord() {
            root_1.popNew('app-view-financialManagement-purchaseRecord-purchaseRecord');
        }
    }]);

    return Index;
}(widget_1.Widget);

exports.Index = Index;
})