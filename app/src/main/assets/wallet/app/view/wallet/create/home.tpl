(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 2946814719;_node2.attrSize = 1;_node2.attrHash = 1984285822;_node2.attrs["w-class"] = "logo";_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 3430357144;_node3.attrs["ev-back-click"] = "backPrePage";_node3.attrs["w-class"] = "title-container";_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = {}; //jpair pre

					_node5["title"] = it1.cfgData.topBarTitle;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "rgba(0,0,0,0)";
						//jpair suf

						_node5["background"] = jvalue;
					}
					_addJson(_node5, _$parent5);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_chFunc(_node3);_$parent3.children.push(_node3);
		}if (!it1.login) {
			_$temp = _node;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 11508063;_node6.attrs["w-class"] = "body1";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3684105357;_node7.attrs["ev-btn-tap"] = "createStandardClick";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.attrHash = 0;_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = {}; //jpair pre

							_node9["name"] = it1.cfgData.btnName[0];
							//jpair suf
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "big";
								//jpair suf

								_node9["types"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "blue";
								//jpair suf

								_node9["color"] = _jvalue2;
							}
							_addJson(_node9, _$parent9);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 645858533;_node10.attrs["ev-btn-tap"] = "createByImgClick";_$temp = _node10;{
						var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 8 };_node11.hasChild = false;_node11.child = null;_node11.attrHash = 0;_$temp = _node11;{
							var _$parent12 = _$temp;var _node12 = {}; //jpair pre

							_node12["name"] = it1.cfgData.btnName[1];
							//jpair suf
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "big";
								//jpair suf

								_node12["types"] = _jvalue3;
							}
							//jpair pre

							{
								var _jvalue4 = "";
								_jvalue4 = "white";
								//jpair suf

								_node12["color"] = _jvalue4;
							}
							_addJson(_node12, _$parent12);
						}_chFunc(_node11);_$parent11.children.push(_node11);
					}_chFunc(_node10);_$parent10.children.push(_node10);
				}_$temp = _node6;{
					var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 2328172594;_node13.attrs["w-class"] = "container1";_$temp = _node13;{
						var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.attrSize = 3;_node14.attrHash = 819543997;_node14.attrs["w-class"] = "box";_node14.attrs["on-tap"] = "switch2LoginClick";{
							var attrvalue = "";attrvalue += it1.walletList.length > 0 ? '' : 'width:0px;overflow: hidden;';attrvalue += " ";_node14.attrs["style"] = attrvalue;
						}_node14.attrHash = _hash.nextHash(_node14.attrHash, _calTextHash(_node14.attrs["style"]));_$temp = _node14;{
							var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "img", "sid": 11 };_node15.children = [];_node15.childHash = 0;_node15.attrSize = 2;_node15.attrHash = 910427286;_node15.attrs["src"] = "../../../res/image/avatar1.png";_node15.attrs["w-class"] = "img-logo";_$parent15.children.push(_node15);
						}_$temp = _node14;{
							var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 12 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 854203028;_node16.attrs["w-class"] = "tag";_$temp = _node16;{
								var _$parent17 = _$temp;_addText(it1.cfgData.login, _$parent17);
							}_chFunc(_node16);_$parent16.children.push(_node16);
						}_chFunc(_node14);_$parent14.children.push(_node14);
					}_$temp = _node13;{
						var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 13 };_node17.children = [];_node17.attrSize = 2;_node17.attrHash = 3628473572;_node17.attrs["w-class"] = "box";_node17.attrs["on-tap"] = "walletImportClicke";_$temp = _node17;{
							var _$parent19 = _$temp;var _node18 = { "attrs": {}, "tagName": "img", "sid": 14 };_node18.children = [];_node18.childHash = 0;_node18.attrSize = 2;_node18.attrHash = 1753000990;_node18.attrs["src"] = "../../../res/image/right_arrow2_blue.png";_node18.attrs["w-class"] = "img-logo";_$parent19.children.push(_node18);
						}_$temp = _node17;{
							var _$parent20 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 15 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 854203028;_node19.attrs["w-class"] = "tag";_$temp = _node19;{
								var _$parent21 = _$temp;_addText(it1.cfgData.hasWallet, _$parent21);
							}_chFunc(_node19);_$parent20.children.push(_node19);
						}_chFunc(_node17);_$parent18.children.push(_node17);
					}_chFunc(_node13);_$parent13.children.push(_node13);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}
		} else {
			_$temp = _node;{
				var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 16 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 2954003511;_node20.attrs["w-class"] = "body2";_$temp = _node20;{
					var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 17 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 3830009169;_node21.attrs["w-class"] = "users";_$temp = _node21;{
						var _$parent24 = _$temp;var _node22 = { "attrs": {}, "tagName": "img", "sid": 18 };_node22.children = [];_node22.childHash = 0;_node22.attrSize = 2;_node22.attrHash = 1615159661;_node22.attrs["src"] = "../../../res/image1/default_avatar.png";_node22.attrs["w-class"] = "avatar";_$parent24.children.push(_node22);
					}_$temp = _node21;{
						var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 19 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 1540292426;_node23.attrs["w-class"] = "name";_$temp = _node23;{
							var _$parent26 = _$temp;_addText(it1.accountList[0].nickName, _$parent26);
						}_chFunc(_node23);_$parent25.children.push(_node23);
					}_$temp = _node21;{
						var _$parent27 = _$temp;var _node24 = { "attrs": {}, "tagName": "img", "sid": 20 };_node24.children = [];_node24.childHash = 0;_node24.attrSize = 2;_node24.attrHash = 2789755987;_node24.attrs["src"] = "../../../res/image/40.png";_node24.attrs["w-class"] = "more";_$parent27.children.push(_node24);
					}_chFunc(_node21);_$parent23.children.push(_node21);
				}_$temp = _node20;{
					var _$parent28 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 21 };_node25.children = [];_node25.childHash = 907534881;_node25.attrSize = 2;_node25.attrHash = 1779016273;_node25.attrs["w-class"] = "input-father";_node25.attrs["ev-input-change"] = "pswChange";_$temp = _node25;{
						var _$parent29 = _$temp;var _node26 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 22 };_node26.hasChild = false;_node26.child = null;_node26.childHash = 2294390104;_node26.attrHash = 0;_$temp = _node26;{
							var _$parent30 = _$temp;var _node27 = {}; //jpair pre

							{
								var _jvalue5 = "";
								_jvalue5 = "输入密码";
								//jpair suf

								_node27["placeHolder"] = _jvalue5;
							}
							//jpair pre

							{
								var _jvalue6 = "";
								_jvalue6 = "password";
								//jpair suf

								_node27["itype"] = _jvalue6;
							}
							_addJson(_node27, _$parent30);
						}_$parent29.children.push(_node26);
					}_$parent28.children.push(_node25);
				}_$temp = _node20;{
					var _$parent31 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 23 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 2282462389;_node28.attrs["ev-btn-tap"] = "loginClick";_$temp = _node28;{
						var _$parent32 = _$temp;var _node29 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 24 };_node29.hasChild = false;_node29.child = null;_node29.attrHash = 0;_$temp = _node29;{
							var _$parent33 = _$temp;var _node30 = {}; //jpair pre

							_node30["name"] = it1.cfgData.btnName[2];
							//jpair suf
							//jpair pre

							{
								var _jvalue7 = "";
								_jvalue7 = "big";
								//jpair suf

								_node30["types"] = _jvalue7;
							}
							//jpair pre

							{
								var _jvalue8 = "";
								_jvalue8 = "blue";
								//jpair suf

								_node30["color"] = _jvalue8;
							}
							_addJson(_node30, _$parent33);
						}_chFunc(_node29);_$parent32.children.push(_node29);
					}_chFunc(_node28);_$parent31.children.push(_node28);
				}_$temp = _node20;{
					var _$parent34 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 25 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 3521403677;_node31.attrs["w-class"] = "container2";_$temp = _node31;{
						var _$parent35 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 26 };_node32.children = [];_node32.attrSize = 2;_node32.attrHash = 3394104043;_node32.attrs["w-class"] = "box";_node32.attrs["on-tap"] = "switch2CreateClick";_$temp = _node32;{
							var _$parent36 = _$temp;var _node33 = { "attrs": {}, "tagName": "img", "sid": 27 };_node33.children = [];_node33.childHash = 0;_node33.attrSize = 2;_node33.attrHash = 910427286;_node33.attrs["src"] = "../../../res/image/avatar1.png";_node33.attrs["w-class"] = "img-logo";_$parent36.children.push(_node33);
						}_$temp = _node32;{
							var _$parent37 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 28 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 854203028;_node34.attrs["w-class"] = "tag";_$temp = _node34;{
								var _$parent38 = _$temp;_addText(it1.cfgData.create, _$parent38);
							}_chFunc(_node34);_$parent37.children.push(_node34);
						}_chFunc(_node32);_$parent35.children.push(_node32);
					}_$temp = _node31;{
						var _$parent39 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 29 };_node35.children = [];_node35.attrSize = 2;_node35.attrHash = 3628473572;_node35.attrs["w-class"] = "box";_node35.attrs["on-tap"] = "walletImportClicke";_$temp = _node35;{
							var _$parent40 = _$temp;var _node36 = { "attrs": {}, "tagName": "img", "sid": 30 };_node36.children = [];_node36.childHash = 0;_node36.attrSize = 2;_node36.attrHash = 1753000990;_node36.attrs["src"] = "../../../res/image/right_arrow2_blue.png";_node36.attrs["w-class"] = "img-logo";_$parent40.children.push(_node36);
						}_$temp = _node35;{
							var _$parent41 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 31 };_node37.children = [];_node37.attrSize = 1;_node37.attrHash = 854203028;_node37.attrs["w-class"] = "tag";_$temp = _node37;{
								var _$parent42 = _$temp;_addText(it1.cfgData.hasWallet, _$parent42);
							}_chFunc(_node37);_$parent41.children.push(_node37);
						}_chFunc(_node35);_$parent39.children.push(_node35);
					}_chFunc(_node31);_$parent34.children.push(_node31);
				}_chFunc(_node20);_$parent22.children.push(_node20);
			}
		}_chFunc(_node);return _node;
	}
});