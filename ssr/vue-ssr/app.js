// 工厂函数，为每一个请求创建新的应用程序实例
const Vue = require('vue')

module.exports = function createApp(context) {
	return new Vue({
		data: {
			url: context.url
		},
		template: `<div>Current router is: {{ url }}</div>`
	})
}