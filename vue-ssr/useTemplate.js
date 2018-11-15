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

    renderer.renderToString(app, (err, html) => {
        console.log(html) // html 将是注入应用程序内容的完整页面
    })
})

server.listen(8080)