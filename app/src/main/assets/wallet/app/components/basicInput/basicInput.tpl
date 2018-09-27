(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3600710719;_node.attrs["w-class"] = "basicInput";{
			var attrvalue = "";attrvalue += it.style;attrvalue += "";_node.attrs["style"] = attrvalue;
		}_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "span", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3939135354;_node2.attrs["w-class"] = "prepend";if (it.isShowPin) {
				_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "span", "sid": 2 };_node3.children = [];_node3.childHash = 607456935;_node3.attrSize = 1;_node3.attrHash = 2405874756;_node3.attrs["w-class"] = "other";_$temp = _node3;{
						var _$parent4 = _$temp;var _node4 = _installText("拼", 2982521758);;
						_$parent4.children.push(_node4);
					}_$parent3.children.push(_node3);
				}
			}_$temp = _node2;{
				var _$parent5 = _$temp;_addText(it.prepend, _$parent5);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1600496066;_node5.attrs["style"] = "flex: 1;height: 100%;";_$temp = _node5;{
				var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
					var _$parent8 = _$temp;var _node7 = {}; //jpair pre

					_node7["placeHolder"] = it.placeholder ? it.placeholder : "";
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "text-align: right;";
						//jpair suf

						_node7["style"] = jvalue;
					}
					//jpair pre

					_node7["itype"] = it.itype ? it.itype : "text";
					//jpair suf
					//jpair pre

					_node7["input"] = it.input ? it.input : '';
					//jpair suf
					_addJson(_node7, _$parent8);
				}_chFunc(_node6);_$parent7.children.push(_node6);
			}_chFunc(_node5);_$parent6.children.push(_node5);
		}if (it.append && it.append != "") {
			_$temp = _node;{
				var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1060371481;_node8.attrs["w-class"] = "append";_$temp = _node8;{
					var _$parent10 = _$temp;_addText(it.append, _$parent10);
				}_chFunc(_node8);_$parent9.children.push(_node8);
			}
		}_chFunc(_node);return _node;
	}
});