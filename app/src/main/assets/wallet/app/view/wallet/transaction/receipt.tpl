(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.childHash = 0;_node2.attrSize = 2;_node2.attrHash = 3138256544;_node2.attrs["src"] = "../../../res/image1/topbar_backimg.png";_node2.attrs["style"] = "position: absolute;top: 0;right: 0;";_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 4120364114;_node3.attrs["w-class"] = "top-head";_node3.attrs["ev-next-click"] = "doScanClick";_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue += it.currencyName + it1.cfgData.topBarTitle;jvalue += "";
						//jpair suf

						_node5["title"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "transparent";
						//jpair suf

						_node5["background"] = _jvalue;
					}
					_addJson(_node5, _$parent5);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_chFunc(_node3);_$parent3.children.push(_node3);
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 4252679546;_node6.attrs["w-class"] = "body";_$temp = _node6;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 1913054642;_node7.attrs["w-class"] = "main";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1019047777;_node8.attrs["w-class"] = "title";_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 7 };_node9.children = [];_node9.childHash = 0;_node9.attrSize = 2;_node9.attrHash = 1615159661;_node9.attrs["src"] = "../../../res/image1/default_avatar.png";_node9.attrs["w-class"] = "avatar";_$parent9.children.push(_node9);
					}_$temp = _node8;{
						var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrHash = 0;_$temp = _node10;{
							var _$parent11 = _$temp;_addText(it1.cfgData.title, _$parent11);
						}_chFunc(_node10);_$parent10.children.push(_node10);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_$temp = _node7;{
					var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 487306359;_node11.attrs["w-class"] = "content";_$temp = _node11;{
						var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 1801736937;_node12.attrs["w-class"] = "qrcode-container";_$temp = _node12;{
							var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "app-components-qrcode-qrcode", "sid": 11 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 0;_$temp = _node13;{
								var _$parent15 = _$temp;var _node14 = {}; //jpair pre

								_node14["value"] = it1.fromAddr;
								//jpair suf
								//jpair pre

								_node14["size"] = 400;
								//jpair suf
								_addJson(_node14, _$parent15);
							}_chFunc(_node13);_$parent14.children.push(_node13);
						}_chFunc(_node12);_$parent13.children.push(_node12);
					}_$temp = _node11;{
						var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 12 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 582383954;_node15.attrs["w-class"] = "addr-container";_$temp = _node15;{
							var _$parent17 = _$temp;_addText(it1.fromAddr, _$parent17);
						}_$temp = _node15;{
							var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "img", "sid": 13 };_node16.children = [];_node16.childHash = 0;_node16.attrSize = 3;_node16.attrHash = 2695277147;_node16.attrs["src"] = "../../../res/image/copy.png";_node16.attrs["w-class"] = "copy";_node16.attrs["on-tap"] = "copyClick";_$parent18.children.push(_node16);
						}_chFunc(_node15);_$parent16.children.push(_node15);
					}_$temp = _node11;{
						var _$parent19 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 14 };_node17.children = [];_node17.attrSize = 2;_node17.attrHash = 1411731355;_node17.attrs["w-class"] = "btn-container";_node17.attrs["ev-btn-tap"] = "shareClick";_$temp = _node17;{
							var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 15 };_node18.hasChild = false;_node18.child = null;_node18.attrHash = 0;_$temp = _node18;{
								var _$parent21 = _$temp;var _node19 = {}; //jpair pre

								_node19["name"] = it1.cfgData.btnName;
								//jpair suf
								//jpair pre

								{
									var _jvalue2 = "";
									_jvalue2 = "big";
									//jpair suf

									_node19["types"] = _jvalue2;
								}
								//jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "white";
									//jpair suf

									_node19["color"] = _jvalue3;
								}
								_addJson(_node19, _$parent21);
							}_chFunc(_node18);_$parent20.children.push(_node18);
						}_chFunc(_node17);_$parent19.children.push(_node17);
					}_chFunc(_node11);_$parent12.children.push(_node11);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});