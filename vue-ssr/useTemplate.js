const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问的URL是：{{ url }}</div>`
    })
	
	// 我们可以通过传入一个"渲染上下文对象"，作为 renderToString 函数的第二个参数，来提供插值数据：
	const context = {
		title: 'hello',
		meta: `
			<meta name="author" content="mccarthey">
			<meta charset="utf-8">
    		<meta name="description" content="this is for test">
		`
	}
    renderer.renderToString(app, context, (err, html) => {
		res.end(html)
		console.log(html) // html 将是注入应用程序内容的完整页面
    })
})

server.listen(8080)