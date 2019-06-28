# 组件库

写一个 vue 的组件库，方便自己调用，如：[a-pei](https://www.npmjs.com/package/a-pei)，[参考](https://blog.csdn.net/baidu_25464429/article/details/81153798)

-   组织项目目录
-   编写组件
-   测试
-   打包发布

# 知识点

### slot

### v-model

语法糖.

-   text 和 textarea 元素使用 value 属性和 input 事件；
-   checkbox 和 radio 使用 checked 属性和 change 事件；
-   select 字段将 value 作为 prop 并将 change 作为事件。

例如：

```html
<input type="text" v-model="test" />

<!-- 等同于 -->

<input type="text" :value="test" @input="handleInput" />
<script>
    data(){
        return {
            test: ''
        }
    }
    handleInput(ev) {
        this.test = ev.target.value
    }
</script>
```

自定义组件上应用v-model：

[参考](https://codesandbox.io/s/8nmy126xj9)，使用model选项，定义要绑定的数、和要监听的事件
```javascript
// 子组件
model: {
    prop: 'value',
    event: 'update'
},

// 必要的地方触发事件
this.$emit('update', val)
```
```javascript
// 父组件
<child-component v-model="data" />
```

