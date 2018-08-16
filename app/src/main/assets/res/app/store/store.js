_$define("app/store/store", function (require, exports, module){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", { value: true });
// ============================================ 导入
var event_1 = require("../../pi/util/event");
// ============================================ 导出
/**
 * 根据keyName返回相应的数据，map数据会被转换为数组
 * 若传入id参数,则会取相应map的值
 */
// tslint:disable-next-line:no-any
exports.find = function (keyname, id) {
    var value = JSON.parse(localStorage.getItem(keyname));
    if (!id) {
        if (!(value instanceof Map)) {
            return value instanceof Object ? copy(value) : value;
        }
        var arr = [];
        for (var _iterator = value, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var _ref2 = _ref,
                _ref3 = _slicedToArray(_ref2, 2),
                v = _ref3[1];

            arr.push(v);
        }
        return copy(arr);
    }
    if (id && value instanceof Map) {
        var result = value.get(id);
        return result && copy(result);
    }
};
/**
 * 更新store并通知
 */
// tslint:disable-next-line:no-any
exports.updateStore = function (keyName, data, notified) {
    localStorage.setItem(keyName, JSON.stringify(data));
    if (notified) {
        handlerMap.notify(keyName, [exports.find(keyName)]);
    }
};
/**
 * 更新store
 */
exports.notify = function (keyName, data) {
    handlerMap.notify(keyName, [data]);
};
/**
 * 消息处理器
 */
exports.register = function (keyName, cb) {
    handlerMap.add(keyName, cb);
};
exports.unregister = function (keyName, cb) {
    handlerMap.remove(keyName, cb);
};
// ============================================ 本地
// tslint:disable-next-line:no-any
var copy = function copy(v) {
    return JSON.parse(JSON.stringify(v));
};
// ============================================ 立即执行
/**
 * 消息处理列表
 */
var handlerMap = new event_1.HandlerMap();
})