(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 1686796296;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["on-tap"] = "doClose";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1913054642;_node2.attrs["w-class"] = "main";_$temp = _node2;{
																var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 3880216523;_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";_$temp = _node3;{
																				var _$parent4 = _$temp;var _node4 = _installText("矿工费", 2445841764);;
																				_$parent4.children.push(_node4);
																}_$parent3.children.push(_node3);
												}_$temp = _node2;{
																var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 222693721;_node5.attrs["w-class"] = "list-container";{
																				var _$i = 0;
																				for (var _iterator = it1.minerFeeList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
																								var _ref;

																								if (_isArray) {
																												if (_i >= _iterator.length) break;
																												_ref = _iterator[_i++];
																								} else {
																												_i = _iterator.next();
																												if (_i.done) break;
																												_ref = _i.value;
																								}

																								var v = _ref;
																								var i = _$i++;_$temp = _node5;{
																												var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 2940749050;_node6.attrs["w-class"] = "list-item";{
																																var attrvalue = "";attrvalue += "chooseMinerLevel(e,";attrvalue += i;attrvalue += ")";_node6.attrs["on-tap"] = attrvalue;
																												}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["on-tap"]));_$temp = _node6;{
																																var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3363340039;_node7.attrs["w-class"] = "item-left";_$temp = _node7;{
																																				var _$parent8 = _$temp;_addText(v.time, _$parent8);
																																}_$temp = _node7;{
																																				var _$parent9 = _$temp;var _node8 = _installText("：", 3359304705);;
																																				_$parent9.children.push(_node8);
																																}_$temp = _node7;{
																																				var _$parent10 = _$temp;_addText(v.minerFee, _$parent10);
																																}_$temp = _node7;{
																																				var _$parent11 = _$temp;var _node9 = _installText("&nbsp;", 1553561131);;
																																				_$parent11.children.push(_node9);
																																}_$temp = _node7;{
																																				var _$parent12 = _$temp;_addText(it.currencyName, _$parent12);
																																}_chFunc(_node7);_$parent7.children.push(_node7);
																												}_$temp = _node6;{
																																var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 6 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2897355810;_node10.attrs["w-class"] = "item-right";_$temp = _node10;{
																																				var _$parent14 = _$temp;_addText(v.text, _$parent14);
																																}_chFunc(_node10);_$parent13.children.push(_node10);
																												}if (v.level === it1.level) {
																																_$temp = _node6;{
																																				var _$parent15 = _$temp;var _node11 = { "attrs": {}, "tagName": "img", "sid": 7 };_node11.children = [];_node11.childHash = 0;_node11.attrSize = 2;_node11.attrHash = 3433071047;_node11.attrs["src"] = "../../res/image/right.png";_node11.attrs["w-class"] = "choosed";_$parent15.children.push(_node11);
																																}
																												}_chFunc(_node6);_$parent6.children.push(_node6);
																								}
																				}
																}_chFunc(_node5);_$parent5.children.push(_node5);
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_chFunc(_node);return _node;
				}
});