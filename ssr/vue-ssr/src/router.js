import Vue from 'vue'
import Router from 'vue-router'

const Foo = () => import('./components/Foo.vue')
const Bar = () => import('./components/Bar.vue')
const Item = () => import('./components/Item.vue')

Vue.use(Router)

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [{
			name: 'foo',
			path: '/',
			component: Foo,
		}, {
			name: 'bar',
			path: '/bar',
			component: Bar
		}, {
			name: 'item',
			path: '/item/:id',
			component: Item
		}]
	})
}
