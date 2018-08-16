(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3146461529;_node.attrs["w-class"] = "ga-privacy-agreement-container";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "h1", "sid": 1 };_node2.children = [];_node2.childHash = 1215813698;_node2.attrSize = 1;_node2.attrHash = 2840447640;_node2.attrs["w-class"] = "ga-title";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = _installText("服务及隐私服务", 3241717875);;
				_$parent3.children.push(_node3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 576778047;_node4.attrs["w-class"] = "ga-agreement-box";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3495782456;_node5.attrs["w-class"] = "ga-agreement-content";_$temp = _node5;{
					var _$parent6 = _$temp;_addText(it1.agreement, _$parent6);
				}_$temp = _node5;{
					var _$parent7 = _$temp;_addText(it1.agreement, _$parent7);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 459168716;_node6.attrs["w-class"] = "ga-bottom-agreement";_$temp = _node6;{
				var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.childHash = 2119459271;_node7.attrSize = 2;_node7.attrHash = 2984237632;_node7.attrs["w-class"] = "ga-registered-protocol";_node7.attrs["ev-checkbox-click"] = "checkBoxClick";_$temp = _node7;{
					var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "app-components-checkbox-checkbox", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.childHash = 2901728037;_node8.attrHash = 0;_$temp = _node8;{
						var _$parent11 = _$temp;var _node9 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "false";
							//jpair suf

							_node9["itype"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "我已经认证阅读并同意";
							//jpair suf

							_node9["text"] = _jvalue;
						}
						_addJson(_node9, _$parent11);
					}_$parent10.children.push(_node8);
				}_$temp = _node7;{
					var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 7 };_node10.children = [];_node10.childHash = 2049235899;_node10.attrSize = 2;_node10.attrHash = 3364877046;_node10.attrs["w-class"] = "ga-user-protocol";_node10.attrs["on-tap"] = "agreementClick";_$temp = _node10;{
						var _$parent13 = _$temp;var _node11 = _installText("隐私条约", 3041249419);;
						_$parent13.children.push(_node11);
					}_$parent12.children.push(_node10);
				}_$parent9.children.push(_node7);
			}_$temp = _node6;{
				var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 2264212026;{
					var attrvalue = "";attrvalue += it1.userProtocolReaded ? 'ga-readed-btn ga-readed-btn-active' : 'ga-readed-btn';attrvalue += " ";_node12.attrs["w-class"] = attrvalue;
				}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["w-class"]));_node12.attrs["on-tap"] = "readedClick";_$temp = _node12;{
					var _$parent15 = _$temp;var _node13 = _installText("我已阅读", 3759502716);;
					_$parent15.children.push(_node13);
				}_chFunc(_node12);_$parent14.children.push(_node12);
			}_chFunc(_node6);_$parent8.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});