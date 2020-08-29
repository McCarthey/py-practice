# React 的一些最佳实践

- 不要在 render()中使用 setState，因为 setState 会触发 render()，导致死循环
- 不要什么都放在 state 里，只要这个数据不会影响 UI 的变化，就没比放在 state 中，造成不必要的浪费，可以直接放在词法作用域中，this 中。
- 使用 HOC：high-order-component，来对组件进行抽重，不是使用已经摒弃的 mixin。HOC 应接受组件作为参数，并返回一个组件，这个组件的 render 函数中使用参数函数，并传递相应的 props，类似容器组件的概念。
- redux 中：将 reducer 命名为其处理的页面状态数据书中的键值，更加规范清晰，也方便使用 es6 中的对象属性简写。

# React 的一些知识

- React 在属性更新时，会自动重新渲染子组件；
- 事件机制默认采用事件代理机制，即 React 仅仅在根元素上绑定事件，给事件处理函数传入的事件对象参数 e，和原生事件参数极其相似，但是其是由 React 根据 W3C 标准封装过的，屏蔽了浏览器的差异性。当然也可以访问原生事件对象

```javascript
handleClick(e) {
    e.nativeEvent // 原生对象
}
```

# react hooks

useEffect
useState
useCallback
useMemo

- useEffect

在 useEffect 中设定定时器，可以实现防抖功能，在 return 时（组件 unmount 时）清除定时器

例如，在输入查询条件变化时，调用查询 API：

```jsx
useEffect(() => {
  let timer: any
  if(timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    queryStringAPI(props.queryString)
    timer = null
  }, 500)
  return {
    clearTimeout(timer)
  }
}, [props.queryString])
```

- useState

绑定表单输入

```jsx
const [form, setForm] = useState({
  leftQuery: '',
  moreHref: '',
  picTitle: '',
  status: 0,
  topQuery: '',
})

const handleChange = (e: any) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  })
}

return (
  <Form labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} labelAlign="left">
    <Form.Item label="Field A">
      <Input
        placeholder="input placeholder"
        name="picTitle"
        onChange={handleChange}
      />
    </Form.Item>
    <Form.Item label="Field B">
      <Input placeholder="input placeholder" />
    </Form.Item>
    <Form.Item>
      <Button type="primary">创建</Button>
    </Form.Item>
  </Form>
)
```

Switch 组件，当设置了 defaultChecked={fetchData.status}，在获取数据后，它是不会根据当前的 state 来更新自己的状态的，因此建议当 loading 状态结束后再渲染 Switch 组件

```jsx
<Form.Item label="状态">
  {isLoading ? (
    'loading'
  ) : (
    <Switch defaultChecked={Boolean(form.status)} onChange={handleSwitch} />
  )}
</Form.Item>
```

- useCallback

  使用 useCallback、lodash 实现节流/防抖

  ```jsx
  const handleSearch = useCallback(
    debounce((data: any) => {
      if (data === '') return
      queryAPI(data)
    }, 500),
    []
  )

  return <input onChange={handleSearch} />
  ```

- useMemo

  会缓存计算结果，在参数不变的情况下，不会触发重新计算/渲染；

- React.memo

  React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件。

  例如，当父组件引入子组件的情况下，往往会造成组件之间的一些不必要的浪费，这时就可以使用 React.memo，这样在 count 变化后，子组件不会更新：

  ```jsx
  const Child = (props) => {
    console.log('子组件?')
    return <div>我是一个子组件</div>
  }

  const ChildMemo = React.memo(Child)

  const Page = (props) => {
    const [count, setCount] = useState(0)

    return (
      <>
        <button
          onClick={(e) => {
            setCount(count + 1)
          }}
        >
          加1
        </button>
        <p>count:{count}</p>
        <ChildMemo />
      </>
    )
  }
  ```

- 组件中 input 输入后 re-render 的问题

问题：input 后 re-render，导致失去焦点

解决：将子组件定义在最外层（或单独的文件中），完全解耦

- react 的自定义事件

要实现自定义事件，需要在生命周期中绑定，并通过 ref 获取需要绑定事件的元素。

下面以 web-component 为例，dm-header 元素支持 logout 事件:

```jsx
import 'omi'
import 'omi-wc-demo/dist/header'

export default class Header extends React.Component {
  componentDidMount() {
    this.el.addEventListener('logout', this.handleLogout)
  }

  componentWillUnmount() {
    this.el.removeEventListener('logout', this.handleLogout)
  }

  render() {
    return (
      <div>
        <dm-header ref={(elem) => (this.el = elem)} />
      </div>
    )
  }
}
```

或者可以使用[jsx-native-events](https://github.com/calebdwilliams/jsx-native-events#readme)来实现自定义事件。

```jsx
/** @jsx nativeEvents */
import nativeEvents from 'jsx-native-events'
import 'omi-wc-demo/dist/header'

export default class Demo extends React.Component {
  handleLogout = () => {
    // logoutAPI
  }

  render() {
    return (
      <div>
        <dm-header onEventLogout={this.handleLogout} />
      </div>
    )
  }
}
```

- react-router 没有命名路由

  因此，在某些需要跳转的时候，特别是 restful 路由时，会比较麻烦：获取当前 pathname => 截取 => 拼接

- antd 相关：

  - antd table 性能

  antd(v3.x) table 组件在 dataSource 量较大时(200 左右)，性能表现较差，设置点击自带的 rowSelection 多选框时都会卡顿几百毫秒。据说计划在 v4 版本中优化 table 性能。

  - 覆盖 antd 样式

    ```less
    radioGroup__wrapper {
      :global {
        .ant-radio-button-wrapper-checked {
          background: #36435c;
        }
      }
    }
    ```

  - antd select (option) 组件支持自定义属性，用于传递数据

    ```tsx
    const handleSelect = (value, option) => {
      console.log(option) // {children: 'test', key: 0, value: 'test', customData: {...}}
    }

    return <Select onChange={handleSelect}>
      <Option value="test" key={0} customData={{id: 0, name: 'test', otherProps: {}}}>
    </Select>;
    ```

* antd tree 可控，并支持 onSelect 选中

  ```tsx
  import React, { useEffect, ReactNode, useState } from 'react'
  import { connect } from 'dva'
  import { Tree } from 'antd'
  import style from '../../Role.less'
  import { RoleState, TreeNode } from '@/models/role'
  import { RoleItem, RoleMap } from '@/type/role'
  import { produce } from 'immer'
  import _ from 'lodash'

  const { TreeNode } = Tree

  const Permission = (props: { role: RoleState }) => {
    const [treeData, setTreeData] = useState<TreeNode[]>([])
    const [expandedKeys, setExpandedKeys] = useState<string[]>([])
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])

    useEffect(() => {
      setTreeData(props.role.formatPermissions)
      setExpandedKeys(props.role.formatPermissions.map((p) => p.key))
    }, [props.role])

    const handleSelect = (selectedKeys: string[], info: any) => {
      console.log('onSelect', checkedKeys, selectedKeys, info)
      const key = _.get(info, ['node', 'props', 'eventKey'], '')
      const childrenKeys = _.get(
        info,
        ['node', 'props', 'children'],
        []
      ) as any[]
      setCheckedKeys(
        produce(checkedKeys, (draft) => {
          if (draft.includes(key)) {
            draft.splice(
              draft.findIndex((k) => k === key),
              1
            )
            if (key.split('|').length > 1) {
              const parentKey = key.split('|')[0]
              draft.splice(
                draft.findIndex((k) => k === parentKey),
                1
              )
            }
            if (childrenKeys.length) {
              childrenKeys.forEach((child) => {
                draft.splice(
                  draft.findIndex((k) => k === child.key),
                  1
                )
              })
            }
          } else {
            draft.push(key)
            if (childrenKeys.length) {
              childrenKeys.forEach((child) => {
                if (!draft.includes(child.key)) draft.push(child.key)
              })
            }
          }
        })
      )
    }

    const handleCheck = (checkedKeys: any) => {
      console.log('onCheck', checkedKeys)
      setCheckedKeys(checkedKeys)
    }

    return (
      <div className={style.treeWrapper}>
        <Tree
          checkable
          switcherIcon={<span />}
          expandedKeys={expandedKeys}
          onSelect={handleSelect}
          checkedKeys={checkedKeys}
          onCheck={handleCheck}
        >
          {treeData.map((p) => {
            return p.children ? (
              <TreeNode title={RoleMap[p.title]} key={p.key}>
                {p.children.map((pi: TreeNode) => (
                  <TreeNode
                    title={RoleMap[pi.title]}
                    key={`${p.key}|${pi.key}`}
                  />
                ))}
              </TreeNode>
            ) : (
              <TreeNode title={RoleMap[p.title]} key={p.key} />
            )
          })}
        </Tree>
      </div>
    )
  }

  export default connect(({ role }: { role: RoleState }) => ({
    role,
  }))(Permission)
  ```

* antd Input 非受控组件的使用：

  为 Input 组件指定 defaultValue 而不是 value 时，需要注意值的更新问题，如当有几个不同的非受控 Input 时，**需要为他们指定唯一 key**，作为更新的标识，否则在删除、新增 Input 时会出现实际数据已经发生改变，但 Input 的输入框内容没变化、错乱、混淆的问题；

* React Fiber

  [参考](https://mp.weixin.qq.com/s/7MQp1CrZFwNd4dQ3y2C-UA)

* React 获取节点样式

  通过 ref + getComputedStyle 获取当前元素的属性

  ```jsx
  const width = getComputedStyle(ref.current).width // eg: "800px"
  ```

  而通过 ref + style 方式获取到的仅是该元素的内联样式

  ```jsx
  const width = ref.current.style.width // 仅当元素设置了该内联属性时才有值
  ```

## 一些概念

- React Core：

  React 核心只包含定义组件必要的 API，同时适用于 React DOM 和 React Native 组件。

- 渲染器：

  用于管理一颗 React 树，使其根据底层平台进行不同的调用。主要的渲染器就是 React DOM Render 和 React Native Render。

- reconciler（协调器）：

  不同的渲染器共享部分代码，包括声明式渲染，自定义组件，state，生命周期方法和 refs 等特性，以保持跨平台工作一致。

  - Stack reconciler：

    React 15 版本前的解决方案；

    ```jsx
    ReactDOM.render(<App />, rootEle)
    ```
    reconciler检查要挂载的组件，通过判断组件的 type 属性，type 的类型可以是类、函数、或者字符串，分别对应 App 是**类**还是**函数**或者**宿主元素**。如果是函数，则 reconciler 调用 App(props) 来获取渲染的元素；如果是类，那么reconciler 会通过 new App(props) 来实例化 App，并调用生命周期方法 componentWillMount()，之后调用 render() 方法来获取渲染的元素；如果是字符串，代表是宿主元素，reconciler 会让 renderer 负责挂载它，例如在浏览器中，React DOM 会创建一个DOM节点。

    该过程是递归的，reconciler 会通过用户定义的组件递归地探悉各个组件渲染的元素，子组件生成的DOM节点会附加在父DOM节点上，递归地完成整个DOM结构的组装。

    (**注**：reconciler 本身不与DOM绑定，挂载的最终结果取决于 renderer，可以是一个DOM节点（React DOM），一个字符串（React DOM Server），或是一个表示原生视图的数字（React Native）)

    

    

  - Fiber reconciler：

    React 16 版本后的解决方案；
