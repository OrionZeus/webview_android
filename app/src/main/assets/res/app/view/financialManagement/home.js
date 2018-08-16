_$define("app/view/financialManagement/home", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * financial management home page
 */
var root_1 = require("../../../pi/ui/root");
var widget_1 = require("../../../pi/widget/widget");
var swiper_min_1 = require("../../res/js/swiper.min");

var FinancialManagementHome = function (_widget_1$Widget) {
    _inherits(FinancialManagementHome, _widget_1$Widget);

    function FinancialManagementHome() {
        _classCallCheck(this, FinancialManagementHome);

        return _possibleConstructorReturn(this, (FinancialManagementHome.__proto__ || Object.getPrototypeOf(FinancialManagementHome)).call(this));
    }

    _createClass(FinancialManagementHome, [{
        key: "create",
        value: function create() {
            _get(FinancialManagementHome.prototype.__proto__ || Object.getPrototypeOf(FinancialManagementHome.prototype), "create", this).call(this);
            this.init();
            // 测试理财产品详情页面
            root_1.popNew('app-view-financialManagement-index-index');
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                bannerList: ['banner1.png', 'banner2.png', 'banner3.png'],
                newsList: [{
                    title: '2018巴菲特股东大会，说了些什么？',
                    time: '2小时前'
                }, {
                    title: '现在的年轻人消费已经开始降级了',
                    time: '3小时前'
                }, {
                    title: '以太坊Casper FFG发布v0.1.0代码',
                    time: '5小时前'
                }, {
                    title: '区块链加物联网等于空气',
                    time: '5小时前'
                }],
                preferredFunds: [{
                    name: '生物/医疗健康',
                    number: '501009',
                    per: 27.24,
                    MinInvestment: '1,000',
                    date: '近一年'
                }, {
                    name: '基础链',
                    number: '501019',
                    per: 25.76,
                    MinInvestment: '10',
                    date: '近一年'
                }],
                popularFunds: [{
                    name: '社交通讯',
                    number: '511109',
                    per: 37.98,
                    MinInvestment: '100',
                    date: '近一年'
                }, {
                    name: '物联网/DAG',
                    number: '501229',
                    per: 12.18,
                    MinInvestment: '10',
                    date: '近一年'
                }]
            };
        }
    }, {
        key: "attach",
        value: function attach() {
            _get(FinancialManagementHome.prototype.__proto__ || Object.getPrototypeOf(FinancialManagementHome.prototype), "attach", this).call(this);
            var mySwiper = new swiper_min_1.Swiper('.swiper-container', {
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    bulletClass: 'ga-pagination-bullet',
                    bulletActiveClass: 'ga-pagination-bullet-active'
                }
            });
        }
    }, {
        key: "balanceManagementClick",
        value: function balanceManagementClick() {
            root_1.popNew('app-view-financialManagement-balanceManagement-home');
        }
    }, {
        key: "loanClick",
        value: function loanClick() {
            root_1.popNew('app-view-financialManagement-loan-home');
        }
    }, {
        key: "preferredFundItemClick",
        value: function preferredFundItemClick(e, index) {
            root_1.popNew('app-view-financialManagement-fund-home', { fund: this.state.preferredFunds[index] });
        }
    }, {
        key: "popularFundItemClick",
        value: function popularFundItemClick(e, index) {
            root_1.popNew('app-view-financialManagement-fund-home', { fund: this.state.popularFunds[index] });
        }
    }]);

    return FinancialManagementHome;
}(widget_1.Widget);

exports.FinancialManagementHome = FinancialManagementHome;
})