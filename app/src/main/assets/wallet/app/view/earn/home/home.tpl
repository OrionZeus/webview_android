(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 1968186041;_node.attrs["class"] = "new-page";_node.attrs["style"] = "display: flex;flex-direction: column;";if (it1.scroll) {
			var opca = it1.scrollHeight / 100;_$temp = _node;{
				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 2208134571;{
					var attrvalue = "";attrvalue += "background:rgba(255, 255, 255, ";attrvalue += opca;attrvalue += ")";_node2.attrs["style"] = attrvalue;
				}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["style"]));_node2.attrs["w-class"] = "topBar1";_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.childHash = 0;_node3.attrSize = 3;_node3.attrHash = 1821636071;_node3.attrs["src"] = "../../../res/image/contact.png";_node3.attrs["w-class"] = "userHead";_node3.attrs["on-tap"] = "showMine";_$parent3.children.push(_node3);
				}_chFunc(_node2);_$parent2.children.push(_node2);
			}
		} else {
			_$temp = _node;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.childHash = 1750872180;_node4.attrSize = 1;_node4.attrHash = 4076104752;_node4.attrs["w-class"] = "topBar";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 3;_node5.attrHash = 727136721;_node5.attrs["src"] = "../../../res/image1/default_avatar.png";_node5.attrs["w-class"] = "userHead";_node5.attrs["on-tap"] = "showMine";_$parent5.children.push(_node5);
				}_$parent4.children.push(_node4);
			}
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 5 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 2;_node6.attrHash = 3480930167;_node6.attrs["src"] = "../../../res/image1/topbar_backimg.png";_node6.attrs["w-class"] = "backImg";_$parent6.children.push(_node6);
		}_$temp = _node;{
			var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 6 };_node7.children = [];_node7.attrSize = 4;_node7.attrHash = 1734939622;{
				var _attrvalue = "";_attrvalue += "../../../res/image1/";_attrvalue += it1.scroll ? 'refresh_blue.png' : 'refresh_white.png';_attrvalue += "";_node7.attrs["src"] = _attrvalue;
			}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["src"]));_node7.attrs["w-class"] = "refreshBtn";_node7.attrs["on-tap"] = "refreshPage";{
				var _attrvalue2 = "";_attrvalue2 += it1.refresh ? 'refreshing' : '';_attrvalue2 += "";_node7.attrs["class"] = _attrvalue2;
			}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["class"]));_chFunc(_node7);_$parent7.children.push(_node7);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 7 };_node8.children = [];_node8.attrSize = 3;_node8.attrHash = 2113904212;_node8.attrs["w-class"] = "contain";_node8.attrs["id"] = "contain";_node8.attrs["on-scroll"] = "scrollPage";_$temp = _node8;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 8 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2188685783;_node9.attrs["w-class"] = "topBack";_$temp = _node9;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 9 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 3317608244;_node10.attrs["w-class"] = "groupCard";_$temp = _node10;{
						var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 10 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 591075809;_node11.attrs["w-class"] = "titleMode";_$temp = _node11;{
							var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 11 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 2;_node12.attrHash = 1205569638;_node12.attrs["src"] = "../../../res/image1/mine_makmoney.png";_node12.attrs["w-class"] = "makeMoney";_$parent12.children.push(_node12);
						}_$temp = _node11;{
							var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 12 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 4029746190;_node13.attrs["w-class"] = "totalTitle";_$temp = _node13;{
								var _$parent14 = _$temp;_addText(it1.cfgData.totalTitle, _$parent14);
							}_chFunc(_node13);_$parent13.children.push(_node13);
						}_$temp = _node11;{
							var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "img", "sid": 13 };_node14.children = [];_node14.childHash = 0;_node14.attrSize = 3;_node14.attrHash = 3822778561;_node14.attrs["src"] = "../../../res/image1/41_blue.png";_node14.attrs["w-class"] = "miningDesc";_node14.attrs["on-tap"] = "miningDesc";_$parent15.children.push(_node14);
						}_chFunc(_node11);_$parent11.children.push(_node11);
					}_$temp = _node10;{
						var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 14 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 2894396870;_node15.attrs["w-class"] = "totalNum";_node15.attrs["id"] = "mining";_$temp = _node15;{
							var _$parent17 = _$temp;_addText(it1.ktBalance, _$parent17);
						}_$temp = _node15;{
							var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 15 };_node16.children = [];_node16.attrSize = 2;_node16.attrHash = 3543160957;_node16.attrs["class"] = "miningNum";{
								var _attrvalue3 = "";_attrvalue3 += "animation:";_attrvalue3 += it1.doMining ? 'miningEnlarge 0.3s linear' : '';_attrvalue3 += "";_node16.attrs["style"] = _attrvalue3;
							}_node16.attrHash = _hash.nextHash(_node16.attrHash, _calTextHash(_node16.attrs["style"]));_$temp = _node16;{
								var _$parent19 = _$temp;var _node17 = _installText("+", 3807426999);;
								_$parent19.children.push(_node17);
							}_$temp = _node16;{
								var _$parent20 = _$temp;_addText(it1.mines, _$parent20);
							}_chFunc(_node16);_$parent18.children.push(_node16);
						}_chFunc(_node15);_$parent16.children.push(_node15);
					}_$temp = _node10;{
						var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 16 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 591075809;_node18.attrs["w-class"] = "titleMode";_$temp = _node18;{
							var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 17 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 4029746190;_node19.attrs["w-class"] = "totalTitle";_$temp = _node19;{
								var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 18 };_node20.children = [];_node20.attrHash = 0;_$temp = _node20;{
									var _$parent24 = _$temp;_addText(it1.cfgData.leftTitle, _$parent24);
								}_chFunc(_node20);_$parent23.children.push(_node20);
							}_$temp = _node19;{
								var _$parent25 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 19 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 3175542604;_node21.attrs["w-class"] = "otherNum";_$temp = _node21;{
									var _$parent26 = _$temp;_addText(it1.mineLast, _$parent26);
								}_chFunc(_node21);_$parent25.children.push(_node21);
							}_chFunc(_node19);_$parent22.children.push(_node19);
						}_$temp = _node18;{
							var _$parent27 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 20 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 4029746190;_node22.attrs["w-class"] = "totalTitle";_$temp = _node22;{
								var _$parent28 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 21 };_node23.children = [];_node23.attrHash = 0;_$temp = _node23;{
									var _$parent29 = _$temp;_addText(it1.cfgData.rightTitle, _$parent29);
								}_chFunc(_node23);_$parent28.children.push(_node23);
							}_$temp = _node22;{
								var _$parent30 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 22 };_node24.children = [];_node24.attrSize = 1;_node24.attrHash = 3175542604;_node24.attrs["w-class"] = "otherNum";_$temp = _node24;{
									var _$parent31 = _$temp;_addText(it1.mines, _$parent31);
								}_chFunc(_node24);_$parent30.children.push(_node24);
							}_chFunc(_node22);_$parent27.children.push(_node22);
						}_$temp = _node18;{
							var _$parent32 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 23 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 135029207;_node25.attrs["ev-btn-tap"] = "doPadding";_$temp = _node25;{
								var _$parent33 = _$temp;var _node26 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 24 };_node26.hasChild = false;_node26.child = null;_node26.attrHash = 0;_$temp = _node26;{
									var _$parent34 = _$temp;var _node27 = {}; //jpair pre

									_node27["name"] = it1.cfgData.btnName;
									//jpair suf
									//jpair pre

									{
										var jvalue = "";
										jvalue = "small";
										//jpair suf

										_node27["types"] = jvalue;
									}
									_addJson(_node27, _$parent34);
								}_chFunc(_node26);_$parent33.children.push(_node26);
							}_chFunc(_node25);_$parent32.children.push(_node25);
						}_chFunc(_node18);_$parent21.children.push(_node18);
					}_$temp = _node10;{
						var _$parent35 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 25 };_node28.children = [];_node28.childHash = 2946814719;_node28.attrSize = 1;_node28.attrHash = 3144420239;_node28.attrs["w-class"] = "dividLine";_$parent35.children.push(_node28);
					}_$temp = _node10;{
						var _$parent36 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 26 };_node29.children = [];_node29.attrSize = 2;_node29.attrHash = 2956100685;_node29.attrs["w-class"] = "titleMode";_node29.attrs["on-tap"] = "goNextPage(0)";_$temp = _node29;{
							var _$parent37 = _$temp;var _node30 = { "attrs": {}, "tagName": "img", "sid": 27 };_node30.children = [];_node30.childHash = 0;_node30.attrSize = 2;_node30.attrHash = 2871696876;_node30.attrs["src"] = "../../../res/image1/mine_top.png";_node30.attrs["w-class"] = "rankTop";_$parent37.children.push(_node30);
						}_$temp = _node29;{
							var _$parent38 = _$temp;var _node31 = { "attrs": {}, "tagName": "span", "sid": 28 };_node31.children = [];_node31.attrSize = 2;_node31.attrHash = 663705095;_node31.attrs["w-class"] = "miningTitle";_node31.attrs["style"] = "flex: 1;";_$temp = _node31;{
								var _$parent39 = _$temp;_addText(it1.cfgData.miningTitle, _$parent39);
							}_chFunc(_node31);_$parent38.children.push(_node31);
						}_$temp = _node29;{
							var _$parent40 = _$temp;var _node32 = { "attrs": {}, "tagName": "span", "sid": 29 };_node32.children = [];_node32.attrSize = 1;_node32.attrHash = 852422721;_node32.attrs["w-class"] = "miningTitle";_$temp = _node32;{
								var _$parent41 = _$temp;_addText(it1.cfgData.tips[0] + it1.rankNum + it1.cfgData.tips[1], _$parent41);
							}_chFunc(_node32);_$parent40.children.push(_node32);
						}_$temp = _node29;{
							var _$parent42 = _$temp;var _node33 = { "attrs": {}, "tagName": "img", "sid": 30 };_node33.children = [];_node33.childHash = 0;_node33.attrSize = 2;_node33.attrHash = 1319070200;_node33.attrs["src"] = "../../../res/image1/25_blue.png";_node33.attrs["w-class"] = "rankList";_$parent42.children.push(_node33);
						}_chFunc(_node29);_$parent36.children.push(_node29);
					}_chFunc(_node10);_$parent10.children.push(_node10);
				}_$temp = _node9;{
					var _$parent43 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 31 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 2468325048;_node34.attrs["w-class"] = "menuCard";_$temp = _node34;{
						var _$parent44 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 32 };_node35.children = [];_node35.attrSize = 2;_node35.attrHash = 4242798398;_node35.attrs["w-class"] = "oneBtn";_node35.attrs["on-tap"] = "goNextPage(1)";_$temp = _node35;{
							var _$parent45 = _$temp;var _node36 = { "attrs": {}, "tagName": "img", "sid": 33 };_node36.children = [];_node36.childHash = 0;_node36.attrSize = 2;_node36.attrHash = 3104397433;_node36.attrs["src"] = "../../../res/image1/btn_yun_1.png";_node36.attrs["w-class"] = "btnImg";_$parent45.children.push(_node36);
						}_$temp = _node35;{
							var _$parent46 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 34 };_node37.children = [];_node37.attrSize = 1;_node37.attrHash = 3434925620;_node37.attrs["w-class"] = "btnMess";_$temp = _node37;{
								var _$parent47 = _$temp;_addText(it1.cfgData.btnMess[0], _$parent47);
							}_chFunc(_node37);_$parent46.children.push(_node37);
						}_chFunc(_node35);_$parent44.children.push(_node35);
					}_$temp = _node34;{
						var _$parent48 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 35 };_node38.children = [];_node38.attrSize = 2;_node38.attrHash = 1781634815;_node38.attrs["w-class"] = "oneBtn";_node38.attrs["on-tap"] = "goNextPage(2)";_$temp = _node38;{
							var _$parent49 = _$temp;var _node39 = { "attrs": {}, "tagName": "img", "sid": 36 };_node39.children = [];_node39.childHash = 0;_node39.attrSize = 2;_node39.attrHash = 3405518036;_node39.attrs["src"] = "../../../res/image1/btn_yun_2.png";_node39.attrs["w-class"] = "btnImg";_$parent49.children.push(_node39);
						}_$temp = _node38;{
							var _$parent50 = _$temp;var _node40 = { "attrs": {}, "tagName": "div", "sid": 37 };_node40.children = [];_node40.attrSize = 1;_node40.attrHash = 3434925620;_node40.attrs["w-class"] = "btnMess";_$temp = _node40;{
								var _$parent51 = _$temp;_addText(it1.cfgData.btnMess[1], _$parent51);
							}_chFunc(_node40);_$parent50.children.push(_node40);
						}_chFunc(_node38);_$parent48.children.push(_node38);
					}_$temp = _node34;{
						var _$parent52 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 38 };_node41.children = [];_node41.attrSize = 2;_node41.attrHash = 755973867;_node41.attrs["w-class"] = "oneBtn";_node41.attrs["on-tap"] = "goNextPage(3)";_$temp = _node41;{
							var _$parent53 = _$temp;var _node42 = { "attrs": {}, "tagName": "img", "sid": 39 };_node42.children = [];_node42.childHash = 0;_node42.attrSize = 2;_node42.attrHash = 1747533302;_node42.attrs["src"] = "../../../res/image1/btn_yun_3.png";_node42.attrs["w-class"] = "btnImg";_$parent53.children.push(_node42);
						}_$temp = _node41;{
							var _$parent54 = _$temp;var _node43 = { "attrs": {}, "tagName": "div", "sid": 40 };_node43.children = [];_node43.attrSize = 1;_node43.attrHash = 3434925620;_node43.attrs["w-class"] = "btnMess";_$temp = _node43;{
								var _$parent55 = _$temp;_addText(it1.cfgData.btnMess[2], _$parent55);
							}_chFunc(_node43);_$parent54.children.push(_node43);
						}_chFunc(_node41);_$parent52.children.push(_node41);
					}_$temp = _node34;{
						var _$parent56 = _$temp;var _node44 = { "attrs": {}, "tagName": "div", "sid": 41 };_node44.children = [];_node44.attrSize = 2;_node44.attrHash = 363039755;_node44.attrs["w-class"] = "oneBtn";_node44.attrs["on-tap"] = "goNextPage(4)";_$temp = _node44;{
							var _$parent57 = _$temp;var _node45 = { "attrs": {}, "tagName": "img", "sid": 42 };_node45.children = [];_node45.childHash = 0;_node45.attrSize = 2;_node45.attrHash = 848111067;_node45.attrs["src"] = "../../../res/image1/btn_yun_4.png";_node45.attrs["w-class"] = "btnImg";_$parent57.children.push(_node45);
						}_$temp = _node44;{
							var _$parent58 = _$temp;var _node46 = { "attrs": {}, "tagName": "div", "sid": 43 };_node46.children = [];_node46.attrSize = 1;_node46.attrHash = 3434925620;_node46.attrs["w-class"] = "btnMess";_$temp = _node46;{
								var _$parent59 = _$temp;_addText(it1.cfgData.btnMess[3], _$parent59);
							}_chFunc(_node46);_$parent58.children.push(_node46);
						}_chFunc(_node44);_$parent56.children.push(_node44);
					}_chFunc(_node34);_$parent43.children.push(_node34);
				}_$temp = _node9;{
					var _$parent60 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 44 };_node47.children = [];_node47.attrSize = 1;_node47.attrHash = 1094900014;_node47.attrs["style"] = "display: flex;align-items: center;";_$temp = _node47;{
						var _$parent61 = _$temp;var _node48 = { "attrs": {}, "tagName": "span", "sid": 45 };_node48.children = [];_node48.attrSize = 1;_node48.attrHash = 349008782;_node48.attrs["style"] = "font-size: 36px;font-weight: 600;margin-left: 50px;flex: 1;";_$temp = _node48;{
							var _$parent62 = _$temp;_addText(it1.cfgData.welfare, _$parent62);
						}_chFunc(_node48);_$parent61.children.push(_node48);
					}_$temp = _node47;{
						var _$parent63 = _$temp;var _node49 = { "attrs": {}, "tagName": "img", "sid": 46 };_node49.children = [];_node49.childHash = 0;_node49.attrSize = 2;_node49.attrHash = 3429498876;_node49.attrs["src"] = "../../../res/image1/25_gray.png";_node49.attrs["w-class"] = "welfareImg";_$parent63.children.push(_node49);
					}_chFunc(_node47);_$parent60.children.push(_node47);
				}_$temp = _node9;{
					var _$parent64 = _$temp;var _node50 = { "attrs": {}, "tagName": "div", "sid": 47 };_node50.children = [];_node50.childHash = 4129728292;_node50.attrSize = 1;_node50.attrHash = 80165423;_node50.attrs["style"] = "margin: 15px 20px;";_$temp = _node50;{
						var _$parent65 = _$temp;var _node51 = { "attrs": {}, "tagName": "img", "sid": 48 };_node51.children = [];_node51.childHash = 0;_node51.attrSize = 2;_node51.attrHash = 4029079288;_node51.attrs["src"] = "../../../res/image1/Card.png";_node51.attrs["style"] = "height: 250px;width: 100%;";_$parent65.children.push(_node51);
					}_$parent64.children.push(_node50);
				}_chFunc(_node9);_$parent9.children.push(_node9);
			}_chFunc(_node8);_$parent8.children.push(_node8);
		}_$temp = _node;{
			var _$parent66 = _$temp;var _node52 = { "attrs": {}, "tagName": "div", "sid": 49 };_node52.children = [];_node52.childHash = 2946814719;_node52.attrSize = 1;_node52.attrHash = 580350684;_node52.attrs["w-class"] = "bottomMode";_$parent66.children.push(_node52);
		}_chFunc(_node);return _node;
	}
});