(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 124358627;_node.attrs["class"] = "ga-new-page";_node.attrs["w-class"] = "ga-new-page";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 2946814719;_node2.attrSize = 1;_node2.attrHash = 155344324;_node2.attrs["w-class"] = "headStatusBar";_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 1574545205;_node3.attrSize = 2;_node3.attrHash = 762386819;_node3.attrs["w-class"] = "head";_node3.attrs["on-tap"] = "toRecord";_$temp = _node3;{
																var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.childHash = 648433550;_node4.attrSize = 1;_node4.attrHash = 3173585391;_node4.attrs["w-class"] = "headTitle";_$temp = _node4;{
																				var _$parent5 = _$temp;var _node5 = _installText("我的理财", 3699243188);;
																				_$parent5.children.push(_node5);
																}_$parent4.children.push(_node4);
												}_$temp = _node3;{
																var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 4 };_node6.children = [];_node6.childHash = 1083592596;_node6.attrSize = 1;_node6.attrHash = 406457089;_node6.attrs["w-class"] = "headTip";_$temp = _node6;{
																				var _$parent7 = _$temp;var _node7 = _installText("全部", 2167202486);;
																				_$parent7.children.push(_node7);
																}_$parent6.children.push(_node6);
												}_$temp = _node3;{
																var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 5 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 2723147750;_node8.attrs["src"] = "../../../res/image/cloud_arow_right.png";_node8.attrs["w-class"] = "headArow";_$parent8.children.push(_node8);
												}_$parent3.children.push(_node3);
								}_$temp = _node;{
												var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2055383479;_node9.attrs["w-class"] = "mine";{
																var _$i = 0;
																for (var _iterator = it1.record, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
																				var i = _$i++;_$temp = _node9;{
																								var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2499369374;_node10.attrs["w-class"] = "mineItem";_$temp = _node10;{
																												var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3985851472;_node11.attrs["w-class"] = "mineTitle";_$temp = _node11;{
																																var _$parent12 = _$temp;_addText(v.title, _$parent12);
																												}_chFunc(_node11);_$parent11.children.push(_node11);
																								}_$temp = _node10;{
																												var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 2760079784;_node12.attrs["w-class"] = "mineMain";_$temp = _node12;{
																																var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 3928610572;_node13.attrs["w-class"] = "mainLeft";_$temp = _node13;{
																																				var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.childHash = 2628758604;_node14.attrSize = 1;_node14.attrHash = 4079970147;_node14.attrs["w-class"] = "normalTitle";_$temp = _node14;{
																																								var _$parent16 = _$temp;var _node15 = _installText("持有(0.01/份)", 2863660536);;
																																								_$parent16.children.push(_node15);
																																				}_$parent15.children.push(_node14);
																																}_$temp = _node13;{
																																				var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 12 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 1563337590;_node16.attrs["w-class"] = "normalMain";_$temp = _node16;{
																																								var _$parent18 = _$temp;_addText(v.amount, _$parent18);
																																				}_$temp = _node16;{
																																								var _$parent19 = _$temp;var _node17 = _installText("份", 4105707745);;
																																								_$parent19.children.push(_node17);
																																				}_chFunc(_node16);_$parent17.children.push(_node16);
																																}_chFunc(_node13);_$parent14.children.push(_node13);
																												}_$temp = _node12;{
																																var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 625755529;_node18.attrs["w-class"] = "mainMid";_$temp = _node18;{
																																				var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.childHash = 244615050;_node19.attrSize = 1;_node19.attrHash = 4079970147;_node19.attrs["w-class"] = "normalTitle";_$temp = _node19;{
																																								var _$parent22 = _$temp;var _node20 = _installText("昨日收益(ETH)", 805434941);;
																																								_$parent22.children.push(_node20);
																																				}_$parent21.children.push(_node19);
																																}_$temp = _node18;{
																																				var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 15 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 3539377192;_node21.attrs["w-class"] = "incomMain";_$temp = _node21;{
																																								var _$parent24 = _$temp;_addText(v.bonus, _$parent24);
																																				}_chFunc(_node21);_$parent23.children.push(_node21);
																																}_chFunc(_node18);_$parent20.children.push(_node18);
																												}_$temp = _node12;{
																																var _$parent25 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 16 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 1698727201;_node22.attrs["w-class"] = "mainRight";_$temp = _node22;{
																																				var _$parent26 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 17 };_node23.children = [];_node23.childHash = 2178445775;_node23.attrSize = 1;_node23.attrHash = 4079970147;_node23.attrs["w-class"] = "normalTitle";_$temp = _node23;{
																																								var _$parent27 = _$temp;var _node24 = _installText("累计", 734729751);;
																																								_$parent27.children.push(_node24);
																																				}_$parent26.children.push(_node23);
																																}_$temp = _node22;{
																																				var _$parent28 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 18 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 1563337590;_node25.attrs["w-class"] = "normalMain";_$temp = _node25;{
																																								var _$parent29 = _$temp;_addText(v.days, _$parent29);
																																				}_$temp = _node25;{
																																								var _$parent30 = _$temp;var _node26 = _installText("天", 492225587);;
																																								_$parent30.children.push(_node26);
																																				}_chFunc(_node25);_$parent28.children.push(_node25);
																																}_chFunc(_node22);_$parent25.children.push(_node22);
																												}_chFunc(_node12);_$parent13.children.push(_node12);
																								}_chFunc(_node10);_$parent10.children.push(_node10);
																				}
																}
												}_$temp = _node9;{
																var _$parent31 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 19 };_node27.children = [];_node27.childHash = 690413147;_node27.attrSize = 2;_node27.attrHash = 2089280431;_node27.attrs["w-class"] = "more";_node27.attrs["on-tap"] = "toRecord";_$temp = _node27;{
																				var _$parent32 = _$temp;var _node28 = _installText("更多", 800505308);;
																				_$parent32.children.push(_node28);
																}_$parent31.children.push(_node27);
												}_chFunc(_node9);_$parent9.children.push(_node9);
								}_$temp = _node;{
												var _$parent33 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 20 };_node29.children = [];_node29.childHash = 829692572;_node29.attrSize = 1;_node29.attrHash = 3564838393;_node29.attrs["w-class"] = "currentProduct";_$temp = _node29;{
																var _$parent34 = _$temp;var _node30 = _installText("活期理财", 2996601020);;
																_$parent34.children.push(_node30);
												}_$parent33.children.push(_node29);
								}_$temp = _node;{
												var _$parent35 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 21 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 148161792;_node31.attrs["w-class"] = "productList";{
																var _$i2 = 0;
																for (var _iterator2 = it1.productList, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
																				var _ref2;

																				if (_isArray2) {
																								if (_i2 >= _iterator2.length) break;
																								_ref2 = _iterator2[_i2++];
																				} else {
																								_i2 = _iterator2.next();
																								if (_i2.done) break;
																								_ref2 = _i2.value;
																				}

																				var _v = _ref2;
																				var _i3 = _$i2++;_$temp = _node31;{
																								var _$parent36 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 22 };_node32.children = [];_node32.attrSize = 2;_node32.attrHash = 367031729;_node32.attrs["w-class"] = "productItem";_node32.attrs["on-tap"] = "toDetail";_$temp = _node32;{
																												var _$parent37 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 23 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 1214856317;_node33.attrs["w-class"] = "productHead";_$temp = _node33;{
																																var _$parent38 = _$temp;_addText(_v.title, _$parent38);
																												}if (_v.isSoldOut) {
																																_$temp = _node33;{
																																				var _$parent39 = _$temp;var _node34 = { "attrs": {}, "tagName": "span", "sid": 24 };_node34.children = [];_node34.childHash = 1289418156;_node34.attrSize = 1;_node34.attrHash = 1090276205;_node34.attrs["w-class"] = "surplus soldOut";_$temp = _node34;{
																																								var _$parent40 = _$temp;var _node35 = _installText("售罄", 2028963541);;
																																								_$parent40.children.push(_node35);
																																				}_$parent39.children.push(_node34);
																																}
																												} else {
																																_$temp = _node33;{
																																				var _$parent41 = _$temp;var _node36 = { "attrs": {}, "tagName": "span", "sid": 25 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 67995041;_node36.attrs["w-class"] = "surplus";_$temp = _node36;{
																																								var _$parent42 = _$temp;var _node37 = _installText("剩余", 563912277);;
																																								_$parent42.children.push(_node37);
																																				}_$temp = _node36;{
																																								var _$parent43 = _$temp;_addText(_v.surplus, _$parent43);
																																				}_chFunc(_node36);_$parent41.children.push(_node36);
																																}
																												}_chFunc(_node33);_$parent37.children.push(_node33);
																								}_$temp = _node32;{
																												var _$parent44 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 26 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 309627488;_node38.attrs["w-class"] = "productInfo";_$temp = _node38;{
																																var _$parent45 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 27 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 1372423739;_node39.attrs["w-class"] = "interestRate";_$temp = _node39;{
																																				var _$parent46 = _$temp;var _node40 = { "attrs": {}, "tagName": "div", "sid": 28 };_node40.children = [];_node40.attrSize = 1;_node40.attrHash = 2680022635;_node40.attrs["w-class"] = "rate";_$temp = _node40;{
																																								var _$parent47 = _$temp;_addText(_v.profit, _$parent47);
																																				}_chFunc(_node40);_$parent46.children.push(_node40);
																																}_$temp = _node39;{
																																				var _$parent48 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 29 };_node41.children = [];_node41.childHash = 2433872631;_node41.attrSize = 1;_node41.attrHash = 2836940864;_node41.attrs["w-class"] = "rateTitle";_$temp = _node41;{
																																								var _$parent49 = _$temp;var _node42 = _installText("预期年化收益", 2496982372);;
																																								_$parent49.children.push(_node42);
																																				}_$parent48.children.push(_node41);
																																}_chFunc(_node39);_$parent45.children.push(_node39);
																												}_$temp = _node38;{
																																var _$parent50 = _$temp;var _node43 = { "attrs": {}, "tagName": "div", "sid": 30 };_node43.children = [];_node43.attrSize = 1;_node43.attrHash = 4250881656;_node43.attrs["w-class"] = "infoMain";_$temp = _node43;{
																																				var _$parent51 = _$temp;var _node44 = { "attrs": {}, "tagName": "div", "sid": 31 };_node44.children = [];_node44.attrSize = 1;_node44.attrHash = 1594926341;_node44.attrs["w-class"] = "mainTitle";_$temp = _node44;{
																																								var _$parent52 = _$temp;_addText(_v.productName, _$parent52);
																																				}_chFunc(_node44);_$parent51.children.push(_node44);
																																}_$temp = _node43;{
																																				var _$parent53 = _$temp;var _node45 = { "attrs": {}, "tagName": "div", "sid": 32 };_node45.children = [];_node45.attrSize = 1;_node45.attrHash = 471407342;_node45.attrs["w-class"] = "mainText";_$temp = _node45;{
																																								var _$parent54 = _$temp;_addText(_v.productDescribe, _$parent54);
																																				}_chFunc(_node45);_$parent53.children.push(_node45);
																																}_chFunc(_node43);_$parent50.children.push(_node43);
																												}_chFunc(_node38);_$parent44.children.push(_node38);
																								}_chFunc(_node32);_$parent36.children.push(_node32);
																				}
																}
												}_chFunc(_node31);_$parent35.children.push(_node31);
								}_$temp = _node;{
												var _$parent55 = _$temp;var _node46 = { "attrs": {}, "tagName": "div", "sid": 33 };_node46.children = [];_node46.childHash = 2946814719;_node46.attrSize = 1;_node46.attrHash = 1997309996;_node46.attrs["style"] = "height: 120px;";_$parent55.children.push(_node46);
								}_chFunc(_node);return _node;
				}
});