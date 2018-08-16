(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 1194809537;_node.attrs["class"] = "ga-new-page hide-scrollbar";_node.attrs["style"] = "overflow-y: auto;overflow-x: hidden;";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrHash = 0;if (it1.gwlt) {
																_$temp = _node2;{
																				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3958917665;_node3.attrs["w-class"] = "ga-header";_$temp = _node3;{
																								var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4148888521;_node4.attrs["w-class"] = "ga-wallet-name-container";_$temp = _node4;{
																												var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.attrSize = 3;_node5.attrHash = 1024792912;_node5.attrs["w-class"] = "ga-wallet-header";{
																																var attrvalue = "";attrvalue += "../../res/image/";attrvalue += it1.wallet.avatar;attrvalue += "";_node5.attrs["src"] = attrvalue;
																												}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["src"]));_node5.attrs["on-tap"] = "switchWalletClick";_chFunc(_node5);_$parent5.children.push(_node5);
																								}_$temp = _node4;{
																												var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 5 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 2123616223;_node6.attrs["w-class"] = "ga-wallet-name";_node6.attrs["on-tap"] = "switchWalletClick";_$temp = _node6;{
																																var _$parent7 = _$temp;_addText(it1.gwlt.nickName, _$parent7);
																												}_chFunc(_node6);_$parent6.children.push(_node6);
																								}_chFunc(_node4);_$parent4.children.push(_node4);
																				}_$temp = _node3;{
																								var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3545894166;_node7.attrs["w-class"] = "ga-assets-container";_$temp = _node7;{
																												var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 7 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1406660402;_node8.attrs["w-class"] = "ga-assets-box";_$temp = _node8;{
																																var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 8 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2118462882;_node9.attrs["w-class"] = "ga-assets";_$temp = _node9;{
																																				var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 9 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2920714695;_node10.attrs["w-class"] = "ga-box";_$temp = _node10;{
																																								var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 10 };_node11.children = [];_node11.childHash = 2050950902;_node11.attrSize = 1;_node11.attrHash = 382413218;_node11.attrs["w-class"] = "ga-assets-symbol";_$temp = _node11;{
																																												var _$parent13 = _$temp;var _node12 = _installText("≈￥", 3239443134);;
																																												_$parent13.children.push(_node12);
																																								}_$parent12.children.push(_node11);
																																				}_$temp = _node10;{
																																								var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 11 };_node13.children = [];_node13.attrHash = 0;_$temp = _node13;{
																																												var _$parent15 = _$temp;_addText(it1.hiddenAssets ? '******' : it1.totalAssets, _$parent15);
																																								}_chFunc(_node13);_$parent14.children.push(_node13);
																																				}_chFunc(_node10);_$parent11.children.push(_node10);
																																}_$temp = _node9;{
																																				var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "img", "sid": 12 };_node14.children = [];_node14.attrSize = 3;_node14.attrHash = 4117769016;{
																																								var _attrvalue = "";_attrvalue += "../../res/image/";_attrvalue += it1.hiddenAssets ? 'btn_display_close' : 'btn_display_open';_attrvalue += ".png";_node14.attrs["src"] = _attrvalue;
																																				}_node14.attrHash = _hash.nextHash(_node14.attrHash, _calTextHash(_node14.attrs["src"]));_node14.attrs["w-class"] = "ga-hidden";_node14.attrs["on-tap"] = "hiddenAssetsClick";_chFunc(_node14);_$parent16.children.push(_node14);
																																}_chFunc(_node9);_$parent10.children.push(_node9);
																												}_chFunc(_node8);_$parent9.children.push(_node8);
																								}_$temp = _node7;{
																												var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 13 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 908290051;_node15.attrs["w-class"] = "ga-profit";_$temp = _node15;{
																																var _$parent18 = _$temp;var _node16 = _installText("今日盈利 ￥", 3219033595);;
																																_$parent18.children.push(_node16);
																												}_$temp = _node15;{
																																var _$parent19 = _$temp;_addText(it1.hiddenAssets ? '***' : '0.00', _$parent19);
																												}_chFunc(_node15);_$parent17.children.push(_node15);
																								}_chFunc(_node7);_$parent8.children.push(_node7);
																				}_$temp = _node3;{
																								var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 14 };_node17.children = [];_node17.childHash = 3529133737;_node17.attrSize = 1;_node17.attrHash = 3614624660;_node17.attrs["w-class"] = "ga-add-container";_$temp = _node17;{
																												var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "img", "sid": 15 };_node18.children = [];_node18.childHash = 0;_node18.attrSize = 3;_node18.attrHash = 3280045277;_node18.attrs["w-class"] = "ga-add-currency";_node18.attrs["src"] = "../../res/image/btn_add_money.png";_node18.attrs["on-tap"] = "clickAddCurrencyListener";_$parent21.children.push(_node18);
																								}_$parent20.children.push(_node17);
																				}_chFunc(_node3);_$parent3.children.push(_node3);
																}
												} else {
																_$temp = _node2;{
																				var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 16 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 3958917665;_node19.attrs["w-class"] = "ga-header";_$temp = _node19;{
																								var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 17 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 4148888521;_node20.attrs["w-class"] = "ga-wallet-name-container";_$temp = _node20;{
																												var _$parent24 = _$temp;var _node21 = { "attrs": {}, "tagName": "span", "sid": 18 };_node21.children = [];_node21.attrSize = 2;_node21.attrHash = 3024093192;_node21.attrs["w-class"] = "ga-wallet-name";_node21.attrs["on-tap"] = "createWalletClick";_$temp = _node21;{
																																var _$parent25 = _$temp;_addText(it1.otherWallets ? '选择钱包' : '创建钱包', _$parent25);
																												}_chFunc(_node21);_$parent24.children.push(_node21);
																								}_chFunc(_node20);_$parent23.children.push(_node20);
																				}_$temp = _node19;{
																								var _$parent26 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 19 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 3545894166;_node22.attrs["w-class"] = "ga-assets-container";_$temp = _node22;{
																												var _$parent27 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 20 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 1406660402;_node23.attrs["w-class"] = "ga-assets-box";_$temp = _node23;{
																																var _$parent28 = _$temp;var _node24 = { "attrs": {}, "tagName": "span", "sid": 21 };_node24.children = [];_node24.attrSize = 1;_node24.attrHash = 2118462882;_node24.attrs["w-class"] = "ga-assets";_$temp = _node24;{
																																				var _$parent29 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 22 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 2920714695;_node25.attrs["w-class"] = "ga-box";_$temp = _node25;{
																																								var _$parent30 = _$temp;var _node26 = { "attrs": {}, "tagName": "span", "sid": 23 };_node26.children = [];_node26.childHash = 2050950902;_node26.attrSize = 1;_node26.attrHash = 382413218;_node26.attrs["w-class"] = "ga-assets-symbol";_$temp = _node26;{
																																												var _$parent31 = _$temp;var _node27 = _installText("≈￥", 3239443134);;
																																												_$parent31.children.push(_node27);
																																								}_$parent30.children.push(_node26);
																																				}_$temp = _node25;{
																																								var _$parent32 = _$temp;var _node28 = { "attrs": {}, "tagName": "span", "sid": 24 };_node28.children = [];_node28.attrHash = 0;_$temp = _node28;{
																																												var _$parent33 = _$temp;_addText(it1.hiddenAssets ? '******' : it1.totalAssets, _$parent33);
																																								}_chFunc(_node28);_$parent32.children.push(_node28);
																																				}_chFunc(_node25);_$parent29.children.push(_node25);
																																}_$temp = _node24;{
																																				var _$parent34 = _$temp;var _node29 = { "attrs": {}, "tagName": "img", "sid": 25 };_node29.children = [];_node29.attrSize = 3;_node29.attrHash = 4117769016;{
																																								var _attrvalue2 = "";_attrvalue2 += "../../res/image/";_attrvalue2 += it1.hiddenAssets ? 'btn_display_close' : 'btn_display_open';_attrvalue2 += ".png";_node29.attrs["src"] = _attrvalue2;
																																				}_node29.attrHash = _hash.nextHash(_node29.attrHash, _calTextHash(_node29.attrs["src"]));_node29.attrs["w-class"] = "ga-hidden";_node29.attrs["on-tap"] = "hiddenAssetsClick";_chFunc(_node29);_$parent34.children.push(_node29);
																																}_chFunc(_node24);_$parent28.children.push(_node24);
																												}_chFunc(_node23);_$parent27.children.push(_node23);
																								}_chFunc(_node22);_$parent26.children.push(_node22);
																				}_chFunc(_node19);_$parent22.children.push(_node19);
																}
												}_$temp = _node2;{
																var _$parent35 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 26 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 358706762;_node30.attrs["w-class"] = "ga-float-box";_$temp = _node30;{
																				var _$parent36 = _$temp;var _node31 = { "attrs": {}, "tagName": "span", "sid": 27 };_node31.children = [];_node31.attrHash = 0;_$temp = _node31;{
																								var _$parent37 = _$temp;_addText(it1.floatBoxTip, _$parent37);
																				}_chFunc(_node31);_$parent36.children.push(_node31);
																}_$temp = _node30;{
																				var _$parent38 = _$temp;var _node32 = { "attrs": {}, "tagName": "img", "sid": 28 };_node32.children = [];_node32.childHash = 0;_node32.attrSize = 2;_node32.attrHash = 2732407491;_node32.attrs["src"] = "../../res/image/right_arrow.png";_node32.attrs["w-class"] = "ga-arrow-img";_$parent38.children.push(_node32);
																}_chFunc(_node30);_$parent35.children.push(_node30);
												}_$temp = _node2;{
																var _$parent39 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 29 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 2023363034;_node33.attrs["w-class"] = "ga-currency-list-container";_$temp = _node33;{
																				var _$parent40 = _$temp;var _node34 = { "attrs": {}, "tagName": "ul", "sid": 30 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 1637153029;_node34.attrs["w-class"] = "ga-currency-list";{
																								var _$i = 0;
																								for (var _iterator = it1.currencyList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
																												var _ref;

																												if (_isArray) {
																																if (_i >= _iterator.length) break;
																																_ref = _iterator[_i++];
																												} else {
																																_i = _iterator.next();
																																if (_i.done) break;
																																_ref = _i.value;
																												}

																												var currency = _ref;
																												var index = _$i++;_$temp = _node34;{
																																var _$parent41 = _$temp;var _node35 = { "attrs": {}, "tagName": "li", "sid": 31 };_node35.children = [];_node35.attrSize = 2;_node35.attrHash = 3413669873;_node35.attrs["w-class"] = "ga-currency-item";{
																																				var _attrvalue3 = "";_attrvalue3 += "clickCurrencyItemListener(e,";_attrvalue3 += index;_attrvalue3 += ")";_node35.attrs["on-tap"] = _attrvalue3;
																																}_node35.attrHash = _hash.nextHash(_node35.attrHash, _calTextHash(_node35.attrs["on-tap"]));_$temp = _node35;{
																																				var _$parent42 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 32 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 775442201;_node36.attrs["w-class"] = "ga-currency-logo-container";_$temp = _node36;{
																																								var _$parent43 = _$temp;var _node37 = { "attrs": {}, "tagName": "img", "sid": 33 };_node37.children = [];_node37.attrSize = 2;_node37.attrHash = 1300374163;{
																																												var _attrvalue4 = "";_attrvalue4 += "../../res/image/currency/";_attrvalue4 += currency.currencyName;_attrvalue4 += ".png";_node37.attrs["src"] = _attrvalue4;
																																								}_node37.attrHash = _hash.nextHash(_node37.attrHash, _calTextHash(_node37.attrs["src"]));_node37.attrs["w-class"] = "ga-currency-logo";_chFunc(_node37);_$parent43.children.push(_node37);
																																				}_chFunc(_node36);_$parent42.children.push(_node36);
																																}_$temp = _node35;{
																																				var _$parent44 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 34 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 29917491;_node38.attrs["w-class"] = "ga-item-right-container";_$temp = _node38;{
																																								var _$parent45 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 35 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 4222371030;_node39.attrs["w-class"] = "ga-item-top-container";_$temp = _node39;{
																																												var _$parent46 = _$temp;var _node40 = { "attrs": {}, "tagName": "div", "sid": 36 };_node40.children = [];_node40.attrSize = 1;_node40.attrHash = 2522646661;_node40.attrs["w-class"] = "ga-curreny-name";_$temp = _node40;{
																																																var _$parent47 = _$temp;_addText(currency.currencyName, _$parent47);
																																												}_chFunc(_node40);_$parent46.children.push(_node40);
																																								}_$temp = _node39;{
																																												var _$parent48 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 37 };_node41.children = [];_node41.attrSize = 1;_node41.attrHash = 262192867;_node41.attrs["w-class"] = "ga-curreny-balance";_$temp = _node41;{
																																																var _$parent49 = _$temp;_addText(currency.balance, _$parent49);
																																												}_chFunc(_node41);_$parent48.children.push(_node41);
																																								}_chFunc(_node39);_$parent45.children.push(_node39);
																																				}_$temp = _node38;{
																																								var _$parent50 = _$temp;var _node42 = { "attrs": {}, "tagName": "div", "sid": 38 };_node42.children = [];_node42.attrSize = 1;_node42.attrHash = 3209197582;_node42.attrs["w-class"] = "ga-item-bottom-container";_$temp = _node42;{
																																												var _$parent51 = _$temp;var _node43 = { "attrs": {}, "tagName": "div", "sid": 39 };_node43.children = [];_node43.attrSize = 1;_node43.attrHash = 4262156754;_node43.attrs["w-class"] = "ga-curreny-full-name";_$temp = _node43;{
																																																var _$parent52 = _$temp;_addText(currency.currencyFullName, _$parent52);
																																												}_chFunc(_node43);_$parent51.children.push(_node43);
																																								}_$temp = _node42;{
																																												var _$parent53 = _$temp;var _node44 = { "attrs": {}, "tagName": "div", "sid": 40 };_node44.children = [];_node44.attrSize = 1;_node44.attrHash = 3535551149;_node44.attrs["w-class"] = "ga-curreny-balance-value";_$temp = _node44;{
																																																var _$parent54 = _$temp;var _node45 = _installText("≈", 1669375947);;
																																																_$parent54.children.push(_node45);
																																												}_$temp = _node44;{
																																																var _$parent55 = _$temp;_addText(currency.balanceValue, _$parent55);
																																												}_$temp = _node44;{
																																																var _$parent56 = _$temp;var _node46 = _installText("&nbsp;CNY", 1700257245);;
																																																_$parent56.children.push(_node46);
																																												}_chFunc(_node44);_$parent53.children.push(_node44);
																																								}_chFunc(_node42);_$parent50.children.push(_node42);
																																				}_chFunc(_node38);_$parent44.children.push(_node38);
																																}_chFunc(_node35);_$parent41.children.push(_node35);
																												}
																								}
																				}_chFunc(_node34);_$parent40.children.push(_node34);
																}_chFunc(_node33);_$parent39.children.push(_node33);
												}_$temp = _node2;{
																var _$parent57 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 41 };_node47.children = [];_node47.childHash = 2946814719;_node47.attrSize = 1;_node47.attrHash = 1257034051;_node47.attrs["style"] = "position: relative;height: 110px;";_$parent57.children.push(_node47);
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_chFunc(_node);return _node;
				}
});