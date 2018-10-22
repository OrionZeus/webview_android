(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3118159832;_node.attrs["w-class"] = "asset-container";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3181901047;_node2.attrs["w-class"] = "total-asset-container";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2866552653;_node3.attrs["w-class"] = "total-asset";_$temp = _node3;{
					var _$parent4 = _$temp;_addText(it1.cfgData.totalAmount, _$parent4);
				}_$temp = _node3;{
					var _$parent5 = _$temp;_addText(it1.currencyUnitSymbol, _$parent5);
				}_$temp = _node3;{
					var _$parent6 = _$temp;_addText(it1.totalAsset, _$parent6);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent7 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2812074640;_node4.attrs["w-class"] = "container";_$temp = _node4;{
				var _$parent8 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 2982197612;_node5.attrs["w-class"] = "asset-list";_node5.attrs["ev-item-click"] = "itemClick";_$temp = _node5;{
					var _$parent9 = _$temp;var _node6 = { "attrs": {}, "tagName": "app-components1-walletAssetList-walletAssetList", "sid": 5 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
						var _$parent10 = _$temp;var _node7 = {}; //jpair pre

						_node7["assetList"] = it1.assetList;
						//jpair suf
						//jpair pre

						_node7["redUp"] = it1.redUp;
						//jpair suf
						//jpair pre

						_node7["currencyUnitSymbol"] = it1.currencyUnitSymbol;
						//jpair suf
						_addJson(_node7, _$parent10);
					}_chFunc(_node6);_$parent9.children.push(_node6);
				}_chFunc(_node5);_$parent8.children.push(_node5);
			}_$temp = _node4;{
				var _$parent11 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1511636449;_node8.attrs["w-class"] = "fm-container";_$temp = _node8;{
					var _$parent12 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2314726494;_node9.attrs["w-class"] = "fm-title";_$temp = _node9;{
						var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrHash = 0;_$temp = _node10;{
							var _$parent14 = _$temp;_addText(it1.cfgData.financial, _$parent14);
						}_chFunc(_node10);_$parent13.children.push(_node10);
					}_$temp = _node9;{
						var _$parent15 = _$temp;var _node11 = { "attrs": {}, "tagName": "img", "sid": 9 };_node11.children = [];_node11.childHash = 0;_node11.attrSize = 3;_node11.attrHash = 1209028312;_node11.attrs["src"] = "../../../res/image1/25_blue.png";_node11.attrs["on-tap"] = "optimalClick";_node11.attrs["w-class"] = "fmImg";_$parent15.children.push(_node11);
					}_chFunc(_node9);_$parent12.children.push(_node9);
				}_$temp = _node8;{
					var _$parent16 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 1491037490;_node12.attrs["w-class"] = "fm-list";{
						var _$i = 0;
						for (var _iterator = it1.productList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var i = _$i++;_$temp = _node12;{
								var _$parent17 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 11 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 3277888839;{
									var attrvalue = "";attrvalue += "fmItemClick(e,";attrvalue += i;attrvalue += ")";_node13.attrs["on-tap"] = attrvalue;
								}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["on-tap"]));_$temp = _node13;{
									var _$parent18 = _$temp;var _node14 = { "attrs": {}, "tagName": "app-view-wallet-components-fmListItem", "sid": 12 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 0;_$temp = _node14;{
										var _$parent19 = _$temp;var _node15 = {}; //jpair pre

										_node15["product"] = v;
										//jpair suf
										_addJson(_node15, _$parent19);
									}_chFunc(_node14);_$parent18.children.push(_node14);
								}_chFunc(_node13);_$parent17.children.push(_node13);
							}
						}
					}_chFunc(_node12);_$parent16.children.push(_node12);
				}_chFunc(_node8);_$parent11.children.push(_node8);
			}_chFunc(_node4);_$parent7.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});