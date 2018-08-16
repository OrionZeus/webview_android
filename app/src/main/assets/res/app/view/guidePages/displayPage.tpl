(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2038532285;_node.attrs["w-class"] = "ga-display-page";_node.attrs["class"] = "swiper-container";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 2633345172;_node2.attrs["w-class"] = "swiper-wrapper";_node2.attrs["class"] = "swiper-wrapper";{
																var _$i = 0;
																for (var _iterator = it1.guidePages, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
																				var index = _$i++;_$temp = _node2;{
																								var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 2722391811;_node3.attrs["w-class"] = "swiper-slide";_node3.attrs["class"] = "swiper-slide";_$temp = _node3;{
																												var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2318779638;_node4.attrs["w-class"] = "ga-display-img-container";_$temp = _node4;{
																																var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 3941518821;{
																																				var attrvalue = "";attrvalue += "background-image:url(../../res/image/";attrvalue += item.imgUrl;attrvalue += ");";_node5.attrs["style"] = attrvalue;
																																}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));_node5.attrs["w-class"] = "ga-display-img";_chFunc(_node5);_$parent5.children.push(_node5);
																												}_chFunc(_node4);_$parent4.children.push(_node4);
																								}_$temp = _node3;{
																												var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "p", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2036368422;_node6.attrs["w-class"] = "ga-intro";_$temp = _node6;{
																																var _$parent7 = _$temp;_addText(item.text, _$parent7);
																												}_chFunc(_node6);_$parent6.children.push(_node6);
																								}_chFunc(_node3);_$parent3.children.push(_node3);
																				}
																}
												}_$temp = _node2;{
																var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.childHash = 2097913530;_node7.attrSize = 2;_node7.attrHash = 2722391811;_node7.attrs["w-class"] = "swiper-slide";_node7.attrs["class"] = "swiper-slide";_$temp = _node7;{
																				var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "app-view-app", "sid": 7 };_node8.hasChild = false;_node8.child = null;_node8.childHash = 2946814719;_node8.attrHash = 0;_$parent9.children.push(_node8);
																}_$parent8.children.push(_node7);
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 8 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3101631392;_node9.attrs["w-class"] = "ga-pagination";{
																var _$i2 = 0;
																for (var _iterator2 = it1.guidePages, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
																				var _ref2;

																				if (_isArray2) {
																								if (_i2 >= _iterator2.length) break;
																								_ref2 = _iterator2[_i2++];
																				} else {
																								_i2 = _iterator2.next();
																								if (_i2.done) break;
																								_ref2 = _i2.value;
																				}

																				var _item = _ref2;
																				var _index = _$i2++;_$temp = _node9;{
																								var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 9 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2255571891;{
																												var _attrvalue = "";_attrvalue += it1.activeIndex === _index ? 'ga-dot ga-dot-active' : 'ga-dot';_attrvalue += "";_node10.attrs["w-class"] = _attrvalue;
																								}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["w-class"]));_chFunc(_node10);_$parent11.children.push(_node10);
																				}
																}
												}_chFunc(_node9);_$parent10.children.push(_node9);
								}_chFunc(_node);return _node;
				}
});