(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1217327868;_node.attrs["style"] = "position: relative;";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 2422874927;_node2.attrs["w-class"] = "bindPhone";_node2.attrs["ev-input-change"] = "phoneChange";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 1287046569;_node3.attrs["w-class"] = "old-code";_node3.attrs["on-tap"] = "showNewCode";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrHash = 0;_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = _installText("+", 3807426999);;
						_$parent5.children.push(_node5);
					}_$temp = _node4;{
						var _$parent6 = _$temp;_addText(it1.oldCode, _$parent6);
					}_chFunc(_node4);_$parent4.children.push(_node4);
				}_$temp = _node3;{
					var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 2;_node6.attrHash = 133862990;_node6.attrs["src"] = "../../res/image/15.png";_node6.attrs["style"] = "width: 40px;height:40px;margin-left: 10px;";_$parent7.children.push(_node6);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.childHash = 1039380219;_node7.attrSize = 1;_node7.attrHash = 3111362911;_node7.attrs["w-class"] = "phoneInput";_$temp = _node7;{
					var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.childHash = 1431716087;_node8.attrHash = 0;_$temp = _node8;{
						var _$parent10 = _$temp;var _node9 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "手机号";
							//jpair suf

							_node9["placeHolder"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "number";
							//jpair suf

							_node9["itype"] = _jvalue;
						}
						_addJson(_node9, _$parent10);
					}_$parent9.children.push(_node8);
				}_$parent8.children.push(_node7);
			}if (it1.countdown > 0) {
				_$temp = _node2;{
					var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 3104787591;_node10.attrs["w-class"] = "text-code";_$temp = _node10;{
						var _$parent12 = _$temp;_addText(it1.countdown, _$parent12);
					}_$temp = _node10;{
						var _$parent13 = _$temp;var _node11 = _installText("秒", 3630949974);;
						_$parent13.children.push(_node11);
					}_chFunc(_node10);_$parent11.children.push(_node10);
				}
			} else {
				_$temp = _node2;{
					var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.childHash = 2070980467;_node12.attrSize = 2;_node12.attrHash = 729955063;_node12.attrs["w-class"] = "text-code";_node12.attrs["on-tap"] = "getCode";_$temp = _node12;{
						var _$parent15 = _$temp;var _node13 = _installText("获取验证码", 1490842992);;
						_$parent15.children.push(_node13);
					}_$parent14.children.push(_node12);
				}
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}if (it1.isShowNewCode) {
			_$temp = _node;{
				var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 9 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 4061725951;_node14.attrs["w-class"] = "new-code-bg";{
					var _$i = 0;
					for (var _iterator = it1.codeList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var val = _ref;
						var ind = _$i++;_$temp = _node14;{
							var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 10 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 1809661999;_node15.attrs["w-class"] = "new-code";{
								var attrvalue = "";attrvalue += "chooseNewCode(";attrvalue += ind;attrvalue += ")";_node15.attrs["on-tap"] = attrvalue;
							}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["on-tap"]));_$temp = _node15;{
								var _$parent18 = _$temp;var _node16 = _installText("+", 3807426999);;
								_$parent18.children.push(_node16);
							}_$temp = _node15;{
								var _$parent19 = _$temp;_addText(val, _$parent19);
							}_chFunc(_node15);_$parent17.children.push(_node15);
						}
					}
				}_chFunc(_node14);_$parent16.children.push(_node14);
			}
		}_chFunc(_node);return _node;
	}
});