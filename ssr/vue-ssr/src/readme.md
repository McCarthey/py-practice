# 使用 webpack 的源码结构
```sh
src
├── components
│   ├── Foo.vue
│   ├── Bar.vue
│   └── Baz.vue
├── App.vue
├── app.js # 通用 entry(universal entry)
├── entry-client.js # 仅运行于浏览器 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中
└── entry-server.js # 仅运行于服务器 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。此时，除了创建和返回应用程序实例之外，它不会做太多事情 - 但是稍后我们将在此执行服务器端路由匹配 (server-side route matching) 和数据预取逻辑 (data pre-fetching logic)。
```

- app.js 是我们应用程序的「通用 entry」。在纯客户端应用程序中，我们将在此文件中创建根 Vue 实例，并直接挂载到 DOM。但是，对于服务器端渲染(SSR)，责任转移到纯客户端 entry 文件。app.js 简单地使用 export 导出一个 createApp 函数

- 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中

- 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。此时，除了创建和返回应用程序实例之外，它不会做太多事情 - 但是稍后我们将在此执行服务器端路由匹配(server-side route matching)和数据预取逻辑(data pre-fetching logic)。

- 在服务器上预取数据，这意味着在我们开始渲染时，我们的应用程序就已经解析完成其状态。但是将**数据进行响应式转换**的过程不需要在服务器上进行，以节省开销。
- 只有beforeCreate 和 created 钩子会在ssr过程中被调用。其他的生命周期钩子将在客户端进行。因此避免在beforeCraete 和 created 中产生全局副作用代码，如setTimeout，因为这个timer会一直保留下来，不会销毁。请将类似副作用逻辑移动到beforeMount 或 mounted 中。
- 注意特定平台的API。纯客户端的API，如document，window等，仅在客户端可用的生命周期中使用，勿放入通用代码中。

### 数据预取和动态
- 数据预取存储容器（Data Store）：
    
    使用Vuex:
    首先，在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。
    此外，我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。
    