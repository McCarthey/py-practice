## Actions

Actions 是纯 js 对象，必须包含 type 属性，来表明是哪种类型的 action 。type 是 string 类型，当项目变大时，通常需要将其放入一个单独的文件：

```javascript
// actionTypes.js
const ADD_TODO ='ADD_TODO'

import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
{
    type: ADD_TODO,
    text: 'This is a todo item' // 建议数据放在名为 payload 的属性中，类型不限
}
```

## Action Creators

Action Creators 就是返回 action 的函数：

```javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  };
}
```
使用 store.dispatch() 发送 action
```javascript
store.dispatch(addTodo(text))
// or 
const boundAddTodo = text => store.dispatch(addTodo(text))
```


## Reducers
Reducers 指明了 state 如何根据 actions 变化。记住，actions 仅仅描述了发生了什么，但不会描述应用 state 的变化。

假设我们应用的 state 如下所示：
```javascript
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```
reducer 是一个接受两个参数的纯函数：前一个状态，和一个action，返回下一个状态。确保 reducer 是纯函数是相当重要的，绝不应该在 reducer 中做：

- 改变参数
- 调用api或者路由跳转等副作用
- 调用如Date.now() 或 Math.random() 等非纯函数