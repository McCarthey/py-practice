# Koa的中间件机制

注意koa的中间件是栈结构，即遇到next()就将其推入栈，并执行下一个中间件，等到下游没有中间件可执行后，就将栈内的中间件依次弹出，恢复执行至最上游中间件。也就是网上说的洋葱模式。

# app.context

app.context是创建ctx的原型，因此可以在其上添加属性/方法，以便在整个app内使用，例如，添加数据库的引用：
```js
app.context.db = db()

app.use(async ctx => {
    console.log(ctx.db)
})
```

# Context

koa将node中的request，response对象都整合到了一个context对象中，