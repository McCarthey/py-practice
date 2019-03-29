import { createApp } from './app'

// 客户端特定引导逻辑

const { app, store, router } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
// App.vue模板中根元素具有'id="app"', 需要在挂载 app 之前调用 router.onReady，因为路由器必须要提前解析路由配置中的异步组件，才能正确地调用组件中可能存在的路由钩子
router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }

        // 这里如果有加载指示器 (loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {

            // 停止加载指示器(loading indicator)

            next()
        }).catch(next)
    })

    
    app.$mount('#app')
})