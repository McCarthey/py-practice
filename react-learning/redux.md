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
store.dispatch(addTodo(text));
// or
const boundAddTodo = text => store.dispatch(addTodo(text));
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

reducer 是一个接受两个参数的纯函数：前一个状态，和一个 action，返回下一个状态。确保 reducer 是纯函数是相当重要的，绝不应该在 reducer 中做：

- 改变参数
- 调用 api 或者路由跳转等副作用
- 调用如 Date.now() 或 Math.random() 等非纯函数

即，给定同样的参数，reducer 将计算并返回下一个 state。没有副作用，没有 API 的调用，不做改变，仅仅做计算。

我们需要在开始后制定 state 的初始状态：

```javascript
import { VisibilityFilters } from "./actions";

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  return state;
}
/**
 * 可以使用默认参数简化上述函数
 * function todoApp(state=initialState, action) {
 *      return state
 * }
 */
```

接下来处理 SET_VISIBILITY_FILTER ：

```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    default:
      return state; // 返回之前的 state
  }
}
```

对于任何未知的 action，都要返回之前的 state

当我们加入更多的 actions 后，我们的代码变成了这样：

```javascript
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

...

function todoApp(state = initialState, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo,index) => {
          if(index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
  }
}
```

再次强调千万不要直接修改 state，可使用 [Immutable](https://immutable-js.github.io/immutable-js/) 或 [immer](https://github.com/immerjs/immer) 等库

#### 拆分 Reducers
上述代码有些冗长，而且todos和visiblityFilter的修改是完全独立不相关的，因此我们完全可以将其拆分：
```javascript
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state=SHOW_ALL, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state=[], action) {
  switch(action.type) {
    case ADD_TODO:
      return [
          ...state,
          {
            text: action.text,
            completed: false
          }
        ]
    case TOGGLE_TODO:
      return state.map((todo,index) => {
        if(index === action.index) {
          return  Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo 
      })
  }
}

function todoApp(state={}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```