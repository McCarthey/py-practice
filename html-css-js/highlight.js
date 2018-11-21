var Highlighter = function (colors) {
	this.colors = colors;
	if (this.colors == null) {
		//默认颜色
		this.colors =
			['#ffff00,#FF0000', '#dae9d1,#FF0000', '#eabcf4,#FF0000',
				'#c8e5ef,#FF0000', '#f3e3cb, #FF0000', '#e7cfe0,#FF0000',
				'#c5d1f1,#FF0000', '#deeee4, #FF0000', '#b55ed2,#FF0000',
				'#dcb7a0,#FF0000', '#7983ab,#FF0000', '#6894b5, #FF0000'];
	}
};

Highlighter.prototype.highlight = function (node, keywords) {
	if (!keywords || !node || !node.nodeType || node.nodeType != 1)
		return;

	keywords = this.parsewords(keywords);
	if (keywords == null)
		return;

	for (var i = 0; i < keywords.length; i++) {
		this.colorword(node, keywords[i]);
	}
};

Highlighter.prototype.colorword = function (node, keyword) {
	for (var i = 0; i < node.childNodes.length; i++) {
		var childNode = node.childNodes[i];

		if (childNode.nodeType == 3) {
			//childNode is #text
			var re = new RegExp(keyword.word, 'i');
			if (childNode.data.search(re) == -1) continue;
			re = new RegExp('(' + keyword.word + ')', 'gi');
			var forkNode = document.createElement('span');
			forkNode.innerHTML = childNode.data.replace(re, '<span style="background-color:' + keyword.bgColor + ';color:' + keyword.foreColor + '" mce_style="background-color:' + keyword.bgColor + ';color:' + keyword.foreColor + '">$1</span>');
			node.replaceChild(forkNode, childNode);
		} else if (childNode.nodeType == 1) {
			//childNode is element
			this.colorword(childNode, keyword);
		}
	}
};

Highlighter.prototype.parsewords = function (keywords) {
	keywords = keywords.replace(/s+/g, ' ');
	keywords = keywords.split(' ');
	if (keywords == null || keywords.length == 0)
		return null;

	var results = [];
	for (var i = 0; i < keywords.length; i++) {
		var keyword = {};
		var color = this.colors[i % this.colors.length].split(',');
		keyword.word = keywords[i];
		keyword.bgColor = color[0];
		keyword.foreColor = color[1];
		results.push(keyword);
	}
	return results;
};

Highlighter.prototype.sort = function (list) {
	list.sort(function (e1, e2) {
		return e1.length < e2.length;
	});
};