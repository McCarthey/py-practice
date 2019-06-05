const Koa = require('koa')
const app = new Koa()

// 注意koa的中间件是栈结构，即遇到next()就将其推入栈，并执行下一个中间件，等到下游没有中间件可执行后，就将栈内的中间件依次弹出，恢复执行至最上游中间件。

app.use(async (ctx, next) => {
    await next() // 1
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`) // 6
})

app.use(async (ctx, next) => {
    const start = Date.now() // 2
    await next() // 3
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`) // 5
})

app.use(async ctx => {
    ctx.body = 'hello world' // 4
})

app.listen(3000)