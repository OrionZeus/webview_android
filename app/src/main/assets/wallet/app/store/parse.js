_$define("app/store/parse", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../pi/net/websocket/util");
var config_1 = require("../config");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../utils/tools");
var unitTools_1 = require("../utils/unitTools");
// tslint:disable-next-line:max-line-length
var interface_1 = require("./interface");
var store_1 = require("./store");
/**
 * 解析数据
 */
// ===================================================== 导入
// ===================================================== 导出
/**
 * 解析云端账号余额
 */
exports.parseCloudBalance = function (balanceInfo) {
    var m = new Map();
    for (var i = 0; i < balanceInfo.value.length; i++) {
        var each = balanceInfo.value[i];
        m.set(each[0], unitTools_1.smallUnit2LargeUnit(interface_1.CurrencyTypeReverse[each[0]], each[1]));
    }
    return m;
};
/**
 * 解析云端账号详情
 */
exports.parseCloudAccountDetail = function (coinType, infos) {
    if (!infos) return [];
    var list = [];
    infos.forEach(function (v) {
        var itype = v[0];
        var amount = tools_1.formatBalance(unitTools_1.smallUnit2LargeUnit(coinType, v[1]));
        var behavior = '';
        var behaviorIcon = '';
        switch (itype) {
            case interface_1.TaskSid.mines:
                behavior = '挖矿';
                behaviorIcon = 'behavior1010.png';
                break;
            case interface_1.TaskSid.inviteFriends:
                behavior = '邀请红包';
                behaviorIcon = 'behavior_red_bag.png';
                break;
            case interface_1.TaskSid.redEnvelope:
                behavior = amount > 0 ? '领红包' : '发红包';
                behaviorIcon = 'behavior_red_bag.png';
                break;
            case interface_1.TaskSid.recharge:
                behavior = '充值';
                behaviorIcon = 'cloud_charge_icon.png';
                break;
            case interface_1.TaskSid.withdraw:
                behavior = '提现';
                behaviorIcon = 'cloud_withdraw_icon.png';
                break;
            case interface_1.TaskSid.financialManagement:
                behavior = '理财买入';
                behaviorIcon = 'behavior_manage_money_port.png';
                break;
            default:
                behavior = util_1.isArray(v[2]) ? tools_1.unicodeArray2Str(v[2]) : v[2];
        }
        list.push({
            itype: itype,
            amount: amount,
            behavior: behavior,
            behaviorIcon: behaviorIcon,
            time: v[3]
        });
    });
    return list;
};
/**
 * 处理矿山排名列表
 */
exports.parseMineRank = function (data) {
    var mineData = {
        minePage: 1,
        mineMore: false,
        mineList: data.value,
        mineRank: [],
        myRank: data.me
    };
    if (data.value.length > 10) {
        mineData.mineMore = true;
    }
    var data1 = [];
    for (var i = 0; i < data.value.length && i < 10; i++) {
        var user = tools_1.unicodeArray2Str(data.value[i][1]);
        var userData = user ? JSON.parse(user) : '';
        data1.push({
            index: data.value[i][3],
            name: userData ? userData.nickName : '昵称未设置',
            avater: userData ? userData.avatar : '',
            num: unitTools_1.kpt2kt(data.value[i][2])
        });
    }
    mineData.mineRank = data1;
    return mineData;
};
/**
 * 处理挖矿排名列表
 */
exports.parseMiningRank = function (data) {
    var miningData = {
        miningPage: 1,
        miningMore: false,
        miningList: data.value,
        miningRank: [],
        myRank: data.me
    };
    if (data.value.length > 10) {
        miningData.miningMore = true;
    }
    var data2 = [];
    for (var i = 0; i < data.value.length && i < 10; i++) {
        var user = tools_1.unicodeArray2Str(data.value[i][1]);
        var userData = user ? JSON.parse(user) : '';
        data2.push({
            index: data.value[i][3],
            name: userData ? userData.nickName : '昵称未设置',
            avater: userData ? userData.avatar : '',
            num: unitTools_1.kpt2kt(data.value[i][2])
        });
    }
    miningData.miningRank = data2;
    return miningData;
};
/**
 * 解析矿山增加记录
 */
exports.parseMineDetail = function (detail) {
    var list = [{
        isComplete: false,
        itemNum: 0
    }, {
        isComplete: false,
        itemNum: 0
    }, {
        isComplete: false,
        itemNum: 0
    }, {
        isComplete: false,
        itemNum: 0
    }, {
        isComplete: false,
        itemNum: 0
    }, {
        isComplete: false,
        itemNum: 0
    }];
    if (detail.value.length !== 0) {
        for (var i = 0; i < detail.value.length; i++) {
            if (detail.value[i][0] === interface_1.TaskSid.createWlt) {
                // 创建钱包
                list[0].isComplete = true;
                list[0].itemNum = unitTools_1.kpt2kt(detail.value[i][1]);
            } else if (detail.value[i][0] === interface_1.TaskSid.bindPhone) {
                // 注册手机号
                list[1].isComplete = true;
                list[1].itemNum = unitTools_1.kpt2kt(detail.value[i][1]);
            } else if (detail.value[i][0] === interface_1.TaskSid.chargeEth) {
                // 存币
                list[2].itemNum = unitTools_1.kpt2kt(detail.value[i][1]);
            } else if (detail.value[i][0] === interface_1.TaskSid.inviteFriends) {
                // 与好友分享
                list[3].itemNum = unitTools_1.kpt2kt(detail.value[i][1]);
            } else if (detail.value[i][0] === interface_1.TaskSid.buyFinancial) {
                // 购买理财
                list[4].itemNum = unitTools_1.kpt2kt(detail.value[i][1]);
            } else if (detail.value[i][0] === interface_1.TaskSid.chat) {
                // 聊天
                list[5].isComplete = true;
                list[5].itemNum = unitTools_1.kpt2kt(detail.value[i][1]);
            }
        }
    }
    return list;
};
/**
 * 解析充值提现记录
 */
exports.parseRechargeWithdrawalLog = function (coin, val) {
    var infoList = [];
    if (coin === 'BTC') {
        for (var i = 0; i < val.length; i++) {
            var record = {
                time: val[i][3],
                amount: unitTools_1.sat2Btc(val[i][1]),
                hash: val[i][2][0]
            };
            infoList.push(record);
        }
    } else {
        for (var _i = 0; _i < val.length; _i++) {
            var _record = {
                time: val[_i][0],
                amount: unitTools_1.wei2Eth(val[_i][1]),
                hash: val[_i][3]
            };
            infoList.push(_record);
        }
    }
    return infoList;
};
/**
 * 解析购买记录
 */
var getproductById = function getproductById(id) {
    var productList = store_1.find('productList');
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].id === id) {
            return productList[i];
        }
    }
    return null;
};
exports.parsePurchaseRecord = function (res) {
    var record = [];
    for (var i = 0; i < res.value.length; i++) {
        var item = res.value[i];
        var id = item[0];
        var product = getproductById(id);
        var result = {
            id: id,
            yesterdayIncoming: unitTools_1.wei2Eth(item[2]),
            totalIncoming: unitTools_1.wei2Eth(item[4]),
            profit: product.profit,
            productName: product.productName,
            unitPrice: product.unitPrice,
            amount: item[3],
            coinType: product.coinType,
            days: tools_1.GetDateDiff(new Date(item[1]), new Date()).toString(),
            purchaseDate: product.purchaseDate,
            interestDate: product.interestDate,
            endDate: product.endDate,
            purchaseTimeStamp: item[1],
            productIntroduction: product.productIntroduction,
            lockday: product.lockday,
            state: item[5]
        };
        record.push(result);
    }
    return record;
};
/**
 * 解析理财产品列表数据
 */
exports.parseProductList = function (res) {
    var result = [];
    for (var i = 0; i < res.value.length; i++) {
        var item = res.value[i];
        var id = item[0];
        var product = config_1.financialProductList[id];
        product.coinType = interface_1.CurrencyTypeReverse["" + item[1]];
        product.unitPrice = unitTools_1.wei2Eth(item[2]);
        product.total = item[3];
        product.surplus = item[3] - item[4];
        product.purchaseDate = tools_1.timestampFormatToDate(new Date().getTime());
        if (product.surplus <= 0) {
            product.isSoldOut = true;
        } else {
            product.isSoldOut = false;
        }
        result.push(product);
    }
    return result;
};
/**
 * 解析发送红包历史记录
 */
exports.parseSendRedEnvLog = function (value) {
    var sHisRec = store_1.find('sHisRec');
    var rList = sHisRec && sHisRec.list || [];
    var sendNumber = value[0];
    var start = value[1];
    var recordList = [];
    var r = value[2];
    for (var i = 0; i < r.length; i++) {
        var currencyName = interface_1.CurrencyTypeReverse[r[i][2]];
        var record = {
            rid: r[i][0].toString(),
            rtype: r[i][1],
            ctype: r[i][2],
            ctypeShow: currencyName,
            amount: unitTools_1.smallUnit2LargeUnit(currencyName, r[i][3]),
            time: r[i][4],
            timeShow: tools_1.timestampFormat(r[i][4]),
            codes: r[i][5]
        };
        recordList.push(record);
    }
    return {
        start: start,
        sendNumber: sendNumber,
        list: rList.concat(recordList)
    };
};
/**
 * 解析红包兑换历史记录
 */
exports.parseConvertLog = function (data) {
    var cHisRec = store_1.find('cHisRec');
    var rList = cHisRec && cHisRec.list || [];
    var convertNumber = data.value[0];
    var startNext = data.value[1];
    var recordList = [];
    var r = data.value[2];
    for (var i = 0; i < r.length; i++) {
        var currencyName = interface_1.CurrencyTypeReverse[r[i][3]];
        var record = {
            suid: r[i][0],
            rid: r[i][1],
            rtype: r[i][2],
            rtypeShow: tools_1.parseRtype(r[i][2]),
            ctype: r[i][3],
            ctypeShow: currencyName,
            amount: unitTools_1.smallUnit2LargeUnit(currencyName, r[i][4]),
            time: r[i][5],
            timeShow: tools_1.timestampFormat(r[i][5])
        };
        recordList.push(record);
    }
    return {
        start: startNext,
        convertNumber: convertNumber,
        list: rList.concat(recordList)
    };
};
/**
 * 解析红包兑换详情
 */
exports.parseExchangeDetail = function (value) {
    var data = value[1];
    var redBagList = [];
    var curNum = 0;
    for (var i = 0; i < data.length; i++) {
        var amount = unitTools_1.smallUnit2LargeUnit(interface_1.CurrencyTypeReverse[data[i][3]], data[i][4]);
        if (data[i][1] !== 0 && data[i][5] !== 0) {
            var redBag = {
                suid: data[i][0],
                cuid: data[i][1],
                rtype: data[i][2],
                ctype: data[i][3],
                amount: amount,
                time: data[i][5],
                timeShow: tools_1.timestampFormat(data[i][5])
            };
            redBagList.push(redBag);
            curNum++;
        }
    }
    var message = tools_1.unicodeArray2Str(value[0]);
    return [redBagList, message, curNum, data.length]; // 兑换人员列表，红包留言，已兑换个数，总个数
};
/**
 * 解析我的邀请红包被领取记录
 */
exports.parseMyInviteRedEnv = function (value) {
    if (value) return;
    var data = value[1];
    var redBagList = [];
    var curNum = 0;
    for (var i = 0; i < data.length; i++) {
        var amount = unitTools_1.smallUnit2LargeUnit('ETH', data[i][1][0]);
        if (data[i][1] !== 0 && data[i][5] !== 0) {
            var redBag = {
                suid: 0,
                cuid: data[i][0],
                rtype: 99,
                ctype: 100,
                amount: amount,
                time: 0,
                timeShow: ''
            };
            redBagList.push(redBag);
            curNum++;
        }
    }
    return [redBagList, curNum];
};
// ===================================================== 本地
// ===================================================== 立即执行
})