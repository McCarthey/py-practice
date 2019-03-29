import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

// 导出一个工厂函数，用于创建新的应用程序，router和store实例
export function createApp() {
	// 创建 router，store 实例
	const router = createRouter()
	const store = createStore()

	// 同步路由状态(route store)到store
	sync(store, router)

	const app = new Vue({
		// 根实例简单的渲染应用程序组件
		// 注入 router, store 到根 Vue 实例
		router,
		store,
		render: h => h(App)
	})
	// 返回app, router
	return { app, store, router }
}