(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 4285755435;_node.attrs["class"] = "ga-new-page";_node.attrs["style"] = "background-color: #f9f9f9;";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 3584035190;_node2.attrs["w-class"] = "ga-top-banner";_node2.attrs["on-tap"] = "walletManagementClick";_$temp = _node2;{
																var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 1237790919;{
																				var attrvalue = "";attrvalue += "../../res/image/";attrvalue += it1.avatar;attrvalue += "";_node3.attrs["src"] = attrvalue;
																}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));_node3.attrs["w-class"] = "avatar";_chFunc(_node3);_$parent3.children.push(_node3);
												}_$temp = _node2;{
																var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 3072105167;_node4.attrs["w-class"] = "ga-banner-title";_$temp = _node4;{
																				var _$parent5 = _$temp;_addText(it1.walletName ? it1.walletName : "请先创建钱包", _$parent5);
																}_chFunc(_node4);_$parent4.children.push(_node4);
												}if (!it1.mnemonicBackup) {
																_$temp = _node2;{
																				var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.childHash = 4158244149;_node5.attrSize = 2;_node5.attrHash = 1764441726;_node5.attrs["w-class"] = "ga-banner-btn";_node5.attrs["on-tap"] = "backupClick";_$temp = _node5;{
																								var _$parent7 = _$temp;var _node6 = _installText("请备份", 3171296422);;
																								_$parent7.children.push(_node6);
																				}_$parent6.children.push(_node5);
																}
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2805348740;_node7.attrs["style"] = "background-color: #fff;";{
																var _$i = 0;
																for (var _iterator = it1.mineList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
																				var index = _$i++;if (index < 3) {
																								_$temp = _node7;{
																												var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 3;_node8.attrHash = 1567402254;_node8.attrs["w-class"] = "ga-item";{
																																var _attrvalue = "";_attrvalue += "itemClick(e,";_attrvalue += index;_attrvalue += ")";_node8.attrs["on-tap"] = _attrvalue;
																												}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["on-tap"]));{
																																var _attrvalue2 = "";_attrvalue2 += index == 2 ? 'border-bottom:none' : '';_attrvalue2 += "";_node8.attrs["style"] = _attrvalue2;
																												}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["style"]));_$temp = _node8;{
																																var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 7 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 3940682448;{
																																				var _attrvalue3 = "";_attrvalue3 += "../../res/image/";_attrvalue3 += item.icon;_attrvalue3 += "";_node9.attrs["src"] = _attrvalue3;
																																}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["src"]));_node9.attrs["w-class"] = "ga-item-icon";_chFunc(_node9);_$parent10.children.push(_node9);
																												}_$temp = _node8;{
																																var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 651827725;_node10.attrs["w-class"] = "ga-item-text";_$temp = _node10;{
																																				var _$parent12 = _$temp;_addText(item.text, _$parent12);
																																}_chFunc(_node10);_$parent11.children.push(_node10);
																												}_$temp = _node8;{
																																var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "img", "sid": 9 };_node11.children = [];_node11.childHash = 0;_node11.attrSize = 2;_node11.attrHash = 2936348839;_node11.attrs["src"] = "../../res/image/btn_right_arrow.png";_node11.attrs["w-class"] = "ga-item-arrow";_$parent13.children.push(_node11);
																												}_chFunc(_node8);_$parent9.children.push(_node8);
																								}
																				}
																}
												}_chFunc(_node7);_$parent8.children.push(_node7);
								}_$temp = _node;{
												var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 2805348740;_node12.attrs["style"] = "background-color: #fff;";{
																var _$i2 = 0;
																for (var _iterator2 = it1.mineList, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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
																				var _index = _$i2++;if (_index > 2 && _index < 5) {
																								_$temp = _node12;{
																												var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 11 };_node13.children = [];_node13.attrSize = 3;_node13.attrHash = 1567402254;_node13.attrs["w-class"] = "ga-item";{
																																var _attrvalue4 = "";_attrvalue4 += "itemClick(e,";_attrvalue4 += _index;_attrvalue4 += ")";_node13.attrs["on-tap"] = _attrvalue4;
																												}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["on-tap"]));{
																																var _attrvalue5 = "";_attrvalue5 += _index == 4 ? 'border-bottom:none' : '';_attrvalue5 += "";_node13.attrs["style"] = _attrvalue5;
																												}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["style"]));_$temp = _node13;{
																																var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "img", "sid": 12 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 3940682448;{
																																				var _attrvalue6 = "";_attrvalue6 += "../../res/image/";_attrvalue6 += _item.icon;_attrvalue6 += "";_node14.attrs["src"] = _attrvalue6;
																																}_node14.attrHash = _hash.nextHash(_node14.attrHash, _calTextHash(_node14.attrs["src"]));_node14.attrs["w-class"] = "ga-item-icon";_chFunc(_node14);_$parent16.children.push(_node14);
																												}_$temp = _node13;{
																																var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "span", "sid": 13 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 651827725;_node15.attrs["w-class"] = "ga-item-text";_$temp = _node15;{
																																				var _$parent18 = _$temp;_addText(_item.text, _$parent18);
																																}_chFunc(_node15);_$parent17.children.push(_node15);
																												}_$temp = _node13;{
																																var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "img", "sid": 14 };_node16.children = [];_node16.childHash = 0;_node16.attrSize = 2;_node16.attrHash = 2936348839;_node16.attrs["src"] = "../../res/image/btn_right_arrow.png";_node16.attrs["w-class"] = "ga-item-arrow";_$parent19.children.push(_node16);
																												}_chFunc(_node13);_$parent15.children.push(_node13);
																								}
																				}
																}
												}_chFunc(_node12);_$parent14.children.push(_node12);
								}_$temp = _node;{
												var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 15 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 2805348740;_node17.attrs["style"] = "background-color: #fff;";{
																var _$i3 = 0;
																for (var _iterator3 = it1.mineList, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
																				var _ref3;

																				if (_isArray3) {
																								if (_i3 >= _iterator3.length) break;
																								_ref3 = _iterator3[_i3++];
																				} else {
																								_i3 = _iterator3.next();
																								if (_i3.done) break;
																								_ref3 = _i3.value;
																				}

																				var _item2 = _ref3;
																				var _index2 = _$i3++;if (_index2 > 4) {
																								_$temp = _node17;{
																												var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 16 };_node18.children = [];_node18.attrSize = 3;_node18.attrHash = 1567402254;_node18.attrs["w-class"] = "ga-item";{
																																var _attrvalue7 = "";_attrvalue7 += "itemClick(e,";_attrvalue7 += _index2;_attrvalue7 += ")";_node18.attrs["on-tap"] = _attrvalue7;
																												}_node18.attrHash = _hash.nextHash(_node18.attrHash, _calTextHash(_node18.attrs["on-tap"]));{
																																var _attrvalue8 = "";_attrvalue8 += _index2 == 7 ? 'border-bottom:none' : '';_attrvalue8 += "";_node18.attrs["style"] = _attrvalue8;
																												}_node18.attrHash = _hash.nextHash(_node18.attrHash, _calTextHash(_node18.attrs["style"]));_$temp = _node18;{
																																var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "img", "sid": 17 };_node19.children = [];_node19.attrSize = 2;_node19.attrHash = 3940682448;{
																																				var _attrvalue9 = "";_attrvalue9 += "../../res/image/";_attrvalue9 += _item2.icon;_attrvalue9 += "";_node19.attrs["src"] = _attrvalue9;
																																}_node19.attrHash = _hash.nextHash(_node19.attrHash, _calTextHash(_node19.attrs["src"]));_node19.attrs["w-class"] = "ga-item-icon";_chFunc(_node19);_$parent22.children.push(_node19);
																												}_$temp = _node18;{
																																var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "span", "sid": 18 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 651827725;_node20.attrs["w-class"] = "ga-item-text";_$temp = _node20;{
																																				var _$parent24 = _$temp;_addText(_item2.text, _$parent24);
																																}_chFunc(_node20);_$parent23.children.push(_node20);
																												}_$temp = _node18;{
																																var _$parent25 = _$temp;var _node21 = { "attrs": {}, "tagName": "img", "sid": 19 };_node21.children = [];_node21.childHash = 0;_node21.attrSize = 2;_node21.attrHash = 2936348839;_node21.attrs["src"] = "../../res/image/btn_right_arrow.png";_node21.attrs["w-class"] = "ga-item-arrow";_$parent25.children.push(_node21);
																												}_chFunc(_node18);_$parent21.children.push(_node18);
																								}
																				}
																}
												}_chFunc(_node17);_$parent20.children.push(_node17);
								}_chFunc(_node);return _node;
				}
});