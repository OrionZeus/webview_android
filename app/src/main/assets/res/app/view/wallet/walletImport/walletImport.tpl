(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 846922391;_node.attrs["class"] = "ga-new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["w-class"] = "ga-new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it.title;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.childHash = 2905222256;_node4.attrSize = 1;_node4.attrHash = 2432496094;_node4.attrs["w-class"] = "topTip";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = _installText("Fairblock是一个开源项目，不储存用户密码，如果您忘了密码，我们将无法帮助你重置。请不要丢失或忘记。", 43071282);;
				_$parent5.children.push(_node5);
			}_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 3 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2599374397;_node6.attrs["w-class"] = "ga-import-container";_$temp = _node6;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 4 };_node7.children = [];_node7.childHash = 2345396913;_node7.attrSize = 1;_node7.attrHash = 438079109;_node7.attrs["ev-input-change"] = "walletMnemonicChange";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.childHash = 2075170570;_node8.attrSize = 1;_node8.attrHash = 3620826008;_node8.attrs["w-class"] = "ga-textarea-father";_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 6 };_node9.hasChild = false;_node9.child = null;_node9.childHash = 2099802145;_node9.attrHash = 0;_$temp = _node9;{
							var _$parent10 = _$temp;var _node10 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue = "请在这里输入助记词，空间键分隔";
								//jpair suf

								_node10["placeHolder"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "textarea";
								//jpair suf

								_node10["itype"] = _jvalue;
							}
							//jpair pre

							_node10["rows"] = 3;
							//jpair suf
							_addJson(_node10, _$parent10);
						}_$parent9.children.push(_node9);
					}_$parent8.children.push(_node8);
				}_$parent7.children.push(_node7);
			}_$temp = _node6;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 584753501;_node11.attrs["w-class"] = "ga-import-item";_node11.attrs["ev-input-change"] = "walletPswChange";_$temp = _node11;{
					var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.childHash = 961210450;_node12.attrSize = 1;_node12.attrHash = 3215959933;_node12.attrs["w-class"] = "ga-import-item-label";_$temp = _node12;{
						var _$parent13 = _$temp;var _node13 = _installText("密码，不少于8位字符，可包含英文、数字、特殊字符", 89750650);;
						_$parent13.children.push(_node13);
					}_$parent12.children.push(_node12);
				}_$temp = _node11;{
					var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 9 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 965381103;_node14.attrs["w-class"] = "ga-input-father";_$temp = _node14;{
						var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 10 };_node15.hasChild = false;_node15.child = null;_node15.childHash = 4053870583;_node15.attrHash = 0;_$temp = _node15;{
							var _$parent16 = _$temp;var _node16 = {}; //jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "password";
								//jpair suf

								_node16["itype"] = _jvalue2;
							}
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "设置密码";
								//jpair suf

								_node16["placeHolder"] = _jvalue3;
							}
							_addJson(_node16, _$parent16);
						}_$parent15.children.push(_node15);
					}_$temp = _node14;{
						var _$parent17 = _$temp;var _node17 = { "attrs": {}, "tagName": "span", "sid": 11 };_node17.children = [];_node17.attrSize = 2;_node17.attrHash = 2560683504;_node17.attrs["w-class"] = "ga-password-strength";{
							var attrvalue = "";attrvalue += "color:";attrvalue += it1.curWalletPswStrength.color;attrvalue += ";";_node17.attrs["style"] = attrvalue;
						}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["style"]));_$temp = _node17;{
							var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "span", "sid": 12 };_node18.children = [];_node18.childHash = 3307626617;_node18.attrSize = 1;_node18.attrHash = 1566347660;_node18.attrs["w-class"] = "ga-password-strength-label";_$temp = _node18;{
								var _$parent19 = _$temp;var _node19 = _installText("安全强度:", 2875395853);;
								_$parent19.children.push(_node19);
							}_$parent18.children.push(_node18);
						}_$temp = _node17;{
							var _$parent20 = _$temp;var _node20 = { "attrs": {}, "tagName": "span", "sid": 13 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 3953088620;_node20.attrs["w-class"] = "ga-password-strength-text";_$temp = _node20;{
								var _$parent21 = _$temp;_addText(it1.curWalletPswStrength.text, _$parent21);
							}_chFunc(_node20);_$parent20.children.push(_node20);
						}_chFunc(_node17);_$parent17.children.push(_node17);
					}_chFunc(_node14);_$parent14.children.push(_node14);
				}_chFunc(_node11);_$parent11.children.push(_node11);
			}_$temp = _node6;{
				var _$parent22 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 14 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 3667176594;{
					var _attrvalue = "";_attrvalue += "ga-psw-tip-hidden  ";_attrvalue += it1.walletPsw.length > 0 ? 'ga-psw-tip-show' : '';_attrvalue += "";_node21.attrs["w-class"] = _attrvalue;
				}_node21.attrHash = _hash.nextHash(_node21.attrHash, _calTextHash(_node21.attrs["w-class"]));_$temp = _node21;{
					var _$parent23 = _$temp;var _node22 = _installText("不少于8位字符，可包含英文、数字、特殊字符", 866488382);;
					_$parent23.children.push(_node22);
				}_chFunc(_node21);_$parent22.children.push(_node21);
			}_$temp = _node6;{
				var _$parent24 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 15 };_node23.children = [];_node23.childHash = 270580814;_node23.attrSize = 2;_node23.attrHash = 162312542;_node23.attrs["w-class"] = "ga-import-item";_node23.attrs["ev-input-change"] = "walletPswConfirmChange";_$temp = _node23;{
					var _$parent25 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 16 };_node24.children = [];_node24.childHash = 2707645093;_node24.attrSize = 1;_node24.attrHash = 3215959933;_node24.attrs["w-class"] = "ga-import-item-label";_$temp = _node24;{
						var _$parent26 = _$temp;var _node25 = _installText("再次输入密码", 2740861029);;
						_$parent26.children.push(_node25);
					}_$parent25.children.push(_node24);
				}_$temp = _node23;{
					var _$parent27 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 17 };_node26.children = [];_node26.childHash = 425907670;_node26.attrSize = 1;_node26.attrHash = 965381103;_node26.attrs["w-class"] = "ga-input-father";_$temp = _node26;{
						var _$parent28 = _$temp;var _node27 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 18 };_node27.hasChild = false;_node27.child = null;_node27.childHash = 2346834623;_node27.attrHash = 0;_$temp = _node27;{
							var _$parent29 = _$temp;var _node28 = {}; //jpair pre

							{
								var _jvalue4 = "";
								_jvalue4 = "password";
								//jpair suf

								_node28["itype"] = _jvalue4;
							}
							//jpair pre

							{
								var _jvalue5 = "";
								_jvalue5 = "再次输入密码";
								//jpair suf

								_node28["placeHolder"] = _jvalue5;
							}
							_addJson(_node28, _$parent29);
						}_$parent28.children.push(_node27);
					}_$parent27.children.push(_node26);
				}_$parent24.children.push(_node23);
			}_$temp = _node6;{
				var _$parent30 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 19 };_node29.children = [];_node29.childHash = 3989439576;_node29.attrSize = 2;_node29.attrHash = 3880712409;_node29.attrs["w-class"] = "ga-import-item";_node29.attrs["ev-input-change"] = "walletPswTipsChange";_$temp = _node29;{
					var _$parent31 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 20 };_node30.children = [];_node30.childHash = 1093794078;_node30.attrSize = 1;_node30.attrHash = 3215959933;_node30.attrs["w-class"] = "ga-import-item-label";_$temp = _node30;{
						var _$parent32 = _$temp;var _node31 = _installText("提示信息（可不填）", 356474755);;
						_$parent32.children.push(_node31);
					}_$parent31.children.push(_node30);
				}_$temp = _node29;{
					var _$parent33 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 21 };_node32.children = [];_node32.childHash = 534500216;_node32.attrSize = 1;_node32.attrHash = 965381103;_node32.attrs["w-class"] = "ga-input-father";_$temp = _node32;{
						var _$parent34 = _$temp;var _node33 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 22 };_node33.hasChild = false;_node33.child = null;_node33.childHash = 815427989;_node33.attrHash = 0;_$temp = _node33;{
							var _$parent35 = _$temp;var _node34 = {}; //jpair pre

							{
								var _jvalue6 = "";
								_jvalue6 = "提示信息（可不填）";
								//jpair suf

								_node34["placeHolder"] = _jvalue6;
							}
							_addJson(_node34, _$parent35);
						}_$parent34.children.push(_node33);
					}_$parent33.children.push(_node32);
				}_$parent30.children.push(_node29);
			}_$temp = _node6;{
				var _$parent36 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 23 };_node35.children = [];_node35.childHash = 2119459271;_node35.attrSize = 2;_node35.attrHash = 342155125;_node35.attrs["w-class"] = "ga-import-protocol";_node35.attrs["ev-checkbox-click"] = "checkBoxClick";_$temp = _node35;{
					var _$parent37 = _$temp;var _node36 = { "attrs": {}, "tagName": "app-components-checkbox-checkbox", "sid": 24 };_node36.hasChild = false;_node36.child = null;_node36.childHash = 2901728037;_node36.attrHash = 0;_$temp = _node36;{
						var _$parent38 = _$temp;var _node37 = {}; //jpair pre

						{
							var _jvalue7 = "";
							_jvalue7 = "false";
							//jpair suf

							_node37["itype"] = _jvalue7;
						}
						//jpair pre

						{
							var _jvalue8 = "";
							_jvalue8 = "我已经认证阅读并同意";
							//jpair suf

							_node37["text"] = _jvalue8;
						}
						_addJson(_node37, _$parent38);
					}_$parent37.children.push(_node36);
				}_$temp = _node35;{
					var _$parent39 = _$temp;var _node38 = { "attrs": {}, "tagName": "span", "sid": 25 };_node38.children = [];_node38.childHash = 2049235899;_node38.attrSize = 2;_node38.attrHash = 3364877046;_node38.attrs["w-class"] = "ga-user-protocol";_node38.attrs["on-tap"] = "agreementClick";_$temp = _node38;{
						var _$parent40 = _$temp;var _node39 = _installText("隐私条约", 3041249419);;
						_$parent40.children.push(_node39);
					}_$parent39.children.push(_node38);
				}_$parent36.children.push(_node35);
			}_$temp = _node6;{
				var _$parent41 = _$temp;var _node40 = { "attrs": {}, "tagName": "div", "sid": 26 };_node40.children = [];_node40.attrSize = 3;_node40.attrHash = 517658158;_node40.attrs["w-class"] = "ga-import-btn";_node40.attrs["on-tap"] = "importWalletClick";{
					var _attrvalue2 = "";_attrvalue2 += "backgroundColor:";_attrvalue2 += it1.userProtocolReaded ? '#1A70DD' : 'white';_attrvalue2 += "; color : ";_attrvalue2 += it1.userProtocolReaded ? '#FFFFFF' : '#1A70DD';_attrvalue2 += ";";_node40.attrs["style"] = _attrvalue2;
				}_node40.attrHash = _hash.nextHash(_node40.attrHash, _calTextHash(_node40.attrs["style"]));_$temp = _node40;{
					var _$parent42 = _$temp;var _node41 = _installText("导入", 3214925376);;
					_$parent42.children.push(_node41);
				}_chFunc(_node40);_$parent41.children.push(_node40);
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});