import {createApp} from './app'

// 客户端特定引导逻辑

const {app} = createApp()

// App.vue模板中根元素具有'id="app"'
app.$mount('#app')