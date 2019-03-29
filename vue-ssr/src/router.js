import Vue from 'vue'
import Router from 'vue-router'

const Foo = () => import('./components/Foo.vue')
const Bar = () => import('./components/Bar.vue')
const Baz = () => import('./components/Baz.vue')

Vue.use(Router)

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [{
			name: 'foo',
			path: 'foo',
			component: Foo,
		}, {
			name: 'bar',
			path: 'bar',
			component: Bar
		}, {
			name: 'baz',
			path: 'baz',
			component: Baz
		}]
	})
}
