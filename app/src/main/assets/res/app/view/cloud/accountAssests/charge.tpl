(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "diV", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1779988102;_node.attrs["w-class"] = "chargePage";{
												var _$i = 0;
												for (var _iterator = it1.infoList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
																var i = _$i++;_$temp = _node;{
																				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1312370820;_node2.attrs["w-class"] = "items";_$temp = _node2;{
																								var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 2135949613;{
																												var attrvalue = "";attrvalue += "../../../res/image/";attrvalue += v.behaviorIcon;attrvalue += "";_node3.attrs["src"] = attrvalue;
																								}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));_node3.attrs["w-class"] = "itemIcon";_chFunc(_node3);_$parent3.children.push(_node3);
																				}_$temp = _node2;{
																								var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 1219942747;_node4.attrs["w-class"] = "info";_$temp = _node4;{
																												var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "p", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3148989585;_node5.attrs["w-class"] = "behavior";_$temp = _node5;{
																																var _$parent6 = _$temp;_addText(v.behavior, _$parent6);
																												}_chFunc(_node5);_$parent5.children.push(_node5);
																								}_$temp = _node4;{
																												var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "p", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 4199677935;_node6.attrs["w-class"] = "time";_$temp = _node6;{
																																var _$parent8 = _$temp;_addText(v.time, _$parent8);
																												}_chFunc(_node6);_$parent7.children.push(_node6);
																								}_chFunc(_node4);_$parent4.children.push(_node4);
																				}_$temp = _node2;{
																								var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 1141695757;_node7.attrs["w-class"] = "amount";_$temp = _node7;{
																												var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "p", "sid": 7 };_node8.children = [];_node8.attrHash = 0;_$temp = _node8;{
																																var _$parent11 = _$temp;_addText(v.amount, _$parent11);
																												}_chFunc(_node8);_$parent10.children.push(_node8);
																								}_$temp = _node7;{
																												var _$parent12 = _$temp;var _node9 = { "attrs": {}, "tagName": "p", "sid": 8 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 1097375837;_node9.attrs["w-class"] = "statas";{
																																var _attrvalue = "";_attrvalue += "color: ";_attrvalue += v.status == '完成' ? '#8E96AB' : '';_attrvalue += ";";_node9.attrs["style"] = _attrvalue;
																												}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["style"]));_$temp = _node9;{
																																var _$parent13 = _$temp;_addText(v.status, _$parent13);
																												}_chFunc(_node9);_$parent12.children.push(_node9);
																								}_chFunc(_node7);_$parent9.children.push(_node7);
																				}_chFunc(_node2);_$parent2.children.push(_node2);
																}
												}
								}_chFunc(_node);return _node;
				}
});