(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 1658602538;_node.attrs["class"] = "ga-new-page";_node.attrs["ev-back-click"] = "goBackPage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 2796604097;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "持有资产";
					//jpair suf

					_node3["title"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2727266501;_node4.attrs["w-class"] = "coloBlock";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "p", "sid": 3 };_node5.children = [];_node5.childHash = 948199055;_node5.attrSize = 1;_node5.attrHash = 1019047777;_node5.attrs["w-class"] = "title";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = _installText("总资产（KT）", 1084957627);;
					_$parent6.children.push(_node6);
				}_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "p", "sid": 4 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3555216325;_node7.attrs["w-class"] = "num";_$temp = _node7;{
					var _$parent8 = _$temp;_addText(it1.totalAssests, _$parent8);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_$temp = _node4;{
				var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "p", "sid": 5 };_node8.children = [];_node8.childHash = 2415090188;_node8.attrSize = 1;_node8.attrHash = 2100168431;_node8.attrs["w-class"] = "confirm";_$temp = _node8;{
					var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 6 };_node9.children = [];_node9.childHash = 3130968595;_node9.attrSize = 1;_node9.attrHash = 73385078;_node9.attrs["w-class"] = "toBeConfirmed";_$temp = _node9;{
						var _$parent11 = _$temp;var _node10 = _installText("买入待确认0MPT", 3108801521);;
						_$parent11.children.push(_node10);
					}_$parent10.children.push(_node9);
				}_$parent9.children.push(_node8);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});