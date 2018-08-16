(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2013204807;_node.attrs["style"] = "height: 100%;";_node.attrs["ev-change-tab"] = "tabChangeTo";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "widget", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 2721375664;{
																var attrvalue = "";attrvalue += it1.tabBarList[it1.isActive].components;attrvalue += "";_node2.attrs["w-tag"] = attrvalue;
												}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["w-tag"]));_node2.tagName = _node2.attrs["w-tag"];_chFunc(_node2);_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2762162298;_node3.attrs["w-class"] = "ga-bottom-tab-bar-container";{
																var _$i = 0;
																for (var _iterator = it1.tabBarList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
																				var _ref;

																				if (_isArray) {
																								if (_i >= _iterator.length) break;
																								_ref = _iterator[_i++];
																				} else {
																								_i = _iterator.next();
																								if (_i.done) break;
																								_ref = _i.value;
																				}

																				var item = _ref;
																				var index = _$i++;_$temp = _node3;{
																								var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 2332173457;{
																												var _attrvalue = "";_attrvalue += "ga-tab-bar-item ";_attrvalue += it1.isActive == index ? 'ga-tab-bar-item-active' : '';_attrvalue += "";_node4.attrs["w-class"] = _attrvalue;
																								}_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["w-class"]));{
																												var _attrvalue2 = "";_attrvalue2 += "tabBarChangeListener(e,";_attrvalue2 += index;_attrvalue2 += ")";_node4.attrs["on-tap"] = _attrvalue2;
																								}_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["on-tap"]));_$temp = _node4;{
																												var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 104968541;{
																																var _attrvalue3 = "";_attrvalue3 += "../res/image/";_attrvalue3 += it1.isActive == index ? item.iconActive : item.icon;_attrvalue3 += "";_node5.attrs["src"] = _attrvalue3;
																												}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["src"]));{
																																var _attrvalue4 = "";_attrvalue4 += "ga-tab-bar-icon ";_attrvalue4 += index === 2 ? 'iconCenter' : '';_attrvalue4 += "";_node5.attrs["w-class"] = _attrvalue4;
																												}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["w-class"]));_chFunc(_node5);_$parent5.children.push(_node5);
																								}_$temp = _node4;{
																												var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 1456402504;_node6.attrs["w-class"] = "ga-tab-bar-text";_$temp = _node6;{
																																var _$parent7 = _$temp;_addText(item.text, _$parent7);
																												}_chFunc(_node6);_$parent6.children.push(_node6);
																								}_chFunc(_node4);_$parent4.children.push(_node4);
																				}
																}
												}_chFunc(_node3);_$parent3.children.push(_node3);
								}_chFunc(_node);return _node;
				}
});