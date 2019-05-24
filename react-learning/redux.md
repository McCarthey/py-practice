## Redux整体流程
createStore(reducer, initState, enhancer)创建store实例 -> store.dispatch(action) -> reducer根据action和prevState计算并返回nextState -> store.subscribe(render) 使得在每次状态更新之后被调用，以更新视图。 

## react-redux的整体流程
createStore(reducer, initState, enhancer)创建store实例 -> Provider包裹在最外层并注入store -> 定义mapStateToProps和mapDispatchToProps函数来决定将store中哪些状态、action传递下去 -> 用connect柯里化函数包裹展示组件并返回一个容器组件（相当于HOC）；

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
A}
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
最后，Redux 提供了 combineReducers() 方法，和上述todoApp函数功能相同，因此可以将todoApp重写成：
```javascript
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```
combineReducers 方法最后会生成一个函数，根据key值选取相应的state，去调用reducer，最后将结果合并成一个对象

## Store
Store的作用：
- 保存应用的 state
- 允许通过 getState() 获取 state
- 允许通过 dispatch(action) 更新 state
- 通过 subscribe(listerner) 注册listener
- 取消对 subscribe(listerner) 函数返回的listener的订阅

通过一个reducer创建store非常简单，我们引入上一步中combineReducer()合并出的reducer:
```javascript
import {createStore } from 'redux'
import todoApp from './reducers'
const store = createStore(todoApp)
```

#### 分发 actions
```javascript
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './reducers'

console.log(store.getState())

const unsubscribe = store.subscible(() => console.log(store.getState()))

store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

unsubscribe()
```

## 不可变性
- 数组操作：使用slice, concat以生成新的数组；禁用push, splice, 因为他们会在原数组基础上进行修改

数组末尾增加一项
```javascript
const addArrayReducer = (array, action) => {
  return array.concat(action.data)
}
```
数组中间增加一项(action: {index: number, data: any})
```javascript
const insertArrayReducer = (array, action) => {
  return [
    ...array.slice(0, action.index),
    action.data,
    ...array.slice(action.index)
  ]
}
```
数组删除一项
```javascript
const deleteArrayReducer = (array, index) => {
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ]
}
```
更新数组中的一项
```javascript
const updateArrayReducer = (array, action) => {
  return [
    ...array.slice(0, action.index),
    action.data,
    ...array.slice(action.index + 1)
  ]
}
```

- 对象操作

更新/新增对象的属性
```javascript
const setItemReducer = (item, action) => {
  return Object.assign({}, item, {
    [action.propName]: action.propValue
  })
}
```
或者使用对象扩展运算符
```javascript
const setItemReducer = (item, action) => {
  return {
    ...item,
    [action.propName]: action.propValue
  }
}
```

删除对象属性
```javascript
const deleteItemReducer = (item, action) => {
  Object.keys(item).reduce((obj, key) => {
    if(key !== action.key) {
      return { ...obj, [key]: item[key]}
    }
    return obj
  }, {})
}
```

## Redux中间件
Redux中间件作用域派发action和执行reducer这两步之间。可以在createStore的enhancer参数位置插入中间件。
```javascript
const store = createStore(reducer, initState, applyMiddleware(middleware))
```
例如处理异步场景的redux-thunk中间件。
因为dispatch默认参数只能是一个JS对象，所以必须借助中间件，允许dispatch的参数为一个函数，在函数体内进行异步操作，完成后再怕发相应的action，才能实现异步。
```javascript
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))

store.dispatch(fetchNewBook('learnRedux'))

function fetchNewBook(book) {
  return dispatch => {
    dispatch({
      type: 'START_FETCH_NEW_BOOK',
      data: book
    })
    ajax({
      url: `/API/${book}.json`,
      type: 'POST',
      data: {}
    })
    .then(bookData => {
      dispatch({
        type: 'FETCH_NEW_BOOK_SUCCESS',
        data: bookData
      })
    }).
    catch(err => {
      dispatch({
        type: 'FETCH_NEW_BOOK_FAIL',
        data: err
      })
    })
  }
}
```

## Dva的使用
使用dva时，与使用react-redux和react-thunk类似，不同的地方在于dva使用react-saga处理异步操作等副作用，并使用生成器来操作异步流程。

常用的effect类型：call, put。

- call: 调用既定的函数
- put: dispatch一个action

```javascript
// 这是umi项目下的一个model，用于处理登录注册逻辑
state: { isLoggedIn: false },
reducers: {
    changeLogState(state, { payload: { isLoggedIn }}) {
       return { ...state, isLoggedIn }
    },
},
effects: {
    *login({ payload: { email, password }},{ call, put }) {
       const res = yield call(api_sign.signInByEmail, { email, password })
       yield put({ type: 'changeLogState', payload: { isLoggedIn: true } })
       message.success(res.msg)
       router.push('/home')
    },
}
```

视图层依然需要使用connect(mapStateToProps)(SignIn)包裹成高阶组件，将model的state映射成组件所需要的props（可以在mapStateToProps中返回loading: state.loading.models.sign，来调用dva-loading，省去了每次loading的show/hide逻辑），在视图层中只需要在登录按钮的地方触发
```javascript
this.props.dispatch({
  type: 'sign/signIn',
  payload: { email, password }
})
```
即可实现异步操作，操作成功/失败的提示完全可以放在effect中处理
