# React的一些最佳实践
- 不要在render()中使用setState，因为setState会触发render()，导致死循环
- 不要什么都放在state里，只要这个数据不会影响UI的变化，就没比放在state中，造成不必要的浪费，可以直接放在词法作用域中，this中。
- 使用HOC：high-order-component，来对组件进行抽重，不是使用已经摒弃的mixin。HOC应接受组件作为参数，并返回一个组件，这个组件的render函数中使用参数函数，并传递相应的props，类似容器组件的概念。
- redux中：将reducer命名为其处理的页面状态数据书中的键值，更加规范清晰，也方便使用es6中的对象属性简写。

# React的一些知识
- React在属性更新时，会自动重新渲染子组件；
- 事件机制默认采用事件代理机制，即React仅仅在根元素上绑定事件，给事件处理函数传入的事件对象参数e，和原生事件参数极其相似，但是其是由React根据W3C标准封装过的，屏蔽了浏览器的差异性。当然也可以访问原生事件对象
```javascript
handleClick(e) {
    e.nativeEvent // 原生对象
}
```