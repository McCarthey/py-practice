const Koa = require('koa')
const app = new Koa()

// 注意koa的中间件是栈结构，即遇到next()就将其推入栈，并执行下一个中间件，等到下游没有中间件可执行后，就将栈内的中间件依次弹出，恢复执行至最上游中间件。

app.use(async (ctx, next) => {
    console.log(ctx.request.host, ctx.request.path, ctx.request.querystring)
    await next()
})

app.use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async ctx => {
    ctx.body = 'hello world' 
})

app.listen(3000)