<template>
  <div>{{item.title}}</div>
</template>

<script>
// 我们将在路由组件上暴露出一个自定义静态函数 asyncData。注意，由于此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
export default {
  asyncData({ store, route }) {
      return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
      // 从store的state上获取item
      item() {
          return this.$store.state.items[this.$route.params.id]
      }
  }
};
</script>
