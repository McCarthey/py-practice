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
  leftQuery: "",
  moreHref: "",
  picTitle: "",
  status: 0,
  topQuery: "",
});

const handleChange = (e: any) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

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
);
```

Switch 组件，当设置了 defaultChecked={fetchData.status}，在获取数据后，它是不会根据当前的 state 来更新自己的状态的，因此建议当 loading 状态结束后再渲染 Switch 组件

```jsx
<Form.Item label="状态">
  {isLoading ? (
    "loading"
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
      if (data === "") return;
      queryAPI(data);
    }, 500),
    []
  );

  return <input onChange={handleSearch} />;
  ```

- useMemo

  会缓存计算结果，在参数不变的情况下，不会触发重新计算/渲染；

- React.memo

  React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件。

  例如，当父组件引入子组件的情况下，往往会造成组件之间的一些不必要的浪费，这时就可以使用 React.memo，这样在 count 变化后，子组件不会更新：

  ```jsx
  const Child = (props) => {
    console.log("子组件?");
    return <div>我是一个子组件</div>;
  };

  const ChildMemo = React.memo(Child);

  const Page = (props) => {
    const [count, setCount] = useState(0);

    return (
      <>
        <button
          onClick={(e) => {
            setCount(count + 1);
          }}
        >
          加1
        </button>
        <p>count:{count}</p>
        <ChildMemo />
      </>
    );
  };
  ```

- 组件中 input 输入后 re-render 的问题

问题：input 后 re-render，导致失去焦点

解决：将子组件定义在最外层（或单独的文件中），完全解耦

- react 的自定义事件

要实现自定义事件，需要在生命周期中绑定，并通过 ref 获取需要绑定事件的元素。

下面以 web-component 为例，dm-header 元素支持 logout 事件:

```jsx
import "omi";
import "omi-wc-demo/dist/header";

export default class Header extends React.Component {
  componentDidMount() {
    this.el.addEventListener("logout", this.handleLogout);
  }

  componentWillUnmount() {
    this.el.removeEventListener("logout", this.handleLogout);
  }

  render() {
    return (
      <div>
        <dm-header ref={(elem) => (this.el = elem)} />
      </div>
    );
  }
}
```

或者可以使用[jsx-native-events](https://github.com/calebdwilliams/jsx-native-events#readme)来实现自定义事件。

```jsx
/** @jsx nativeEvents */
import nativeEvents from "jsx-native-events";
import "omi-wc-demo/dist/header";

export default class Demo extends React.Component {
  handleLogout = () => {
    // logoutAPI
  };

  render() {
    return (
      <div>
        <dm-header onEventLogout={this.handleLogout} />
      </div>
    );
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
  import React, { useEffect, ReactNode, useState } from "react";
  import { connect } from "dva";
  import { Tree } from "antd";
  import style from "../../Role.less";
  import { RoleState, TreeNode } from "@/models/role";
  import { RoleItem, RoleMap } from "@/type/role";
  import { produce } from "immer";
  import _ from "lodash";

  const { TreeNode } = Tree;

  const Permission = (props: { role: RoleState }) => {
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

    useEffect(() => {
      setTreeData(props.role.formatPermissions);
      setExpandedKeys(props.role.formatPermissions.map((p) => p.key));
    }, [props.role]);

    const handleSelect = (selectedKeys: string[], info: any) => {
      console.log("onSelect", checkedKeys, selectedKeys, info);
      const key = _.get(info, ["node", "props", "eventKey"], "");
      const childrenKeys = _.get(
        info,
        ["node", "props", "children"],
        []
      ) as any[];
      setCheckedKeys(
        produce(checkedKeys, (draft) => {
          if (draft.includes(key)) {
            draft.splice(
              draft.findIndex((k) => k === key),
              1
            );
            if (key.split("|").length > 1) {
              const parentKey = key.split("|")[0];
              draft.splice(
                draft.findIndex((k) => k === parentKey),
                1
              );
            }
            if (childrenKeys.length) {
              childrenKeys.forEach((child) => {
                draft.splice(
                  draft.findIndex((k) => k === child.key),
                  1
                );
              });
            }
          } else {
            draft.push(key);
            if (childrenKeys.length) {
              childrenKeys.forEach((child) => {
                if (!draft.includes(child.key)) draft.push(child.key);
              });
            }
          }
        })
      );
    };

    const handleCheck = (checkedKeys: any) => {
      console.log("onCheck", checkedKeys);
      setCheckedKeys(checkedKeys);
    };

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
            );
          })}
        </Tree>
      </div>
    );
  };

  export default connect(({ role }: { role: RoleState }) => ({
    role,
  }))(Permission);
  ```

* antd Input 非受控组件的使用：

  为 Input 组件指定 defaultValue 而不是 value 时，需要注意值的更新问题，如当有几个不同的非受控 Input 时，**需要为他们指定唯一 key**，作为更新的标识，否则在删除、新增 Input 时会出现实际数据已经发生改变，但 Input 的输入框内容没变化、错乱、混淆的问题；

  antd(4.x) Input 的 defaultValue 属性可能失效，同等情况下使用原生 input 元素的 defaultValue 便可实现；

* useState 的函数式更新方法

  如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。下面的计数器组件示例展示了 setState 的两种用法：

  ```jsx
  function Counter({ initialCount }) {
    const [count, setCount] = useState(initialCount);
    return (
      <>
        Count: {count}
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount((prevCount) => prevCount - 1)}>
          -
        </button>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      </>
    );
  }
  ```

  如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。

* React Fiber

  [参考](https://mp.weixin.qq.com/s/7MQp1CrZFwNd4dQ3y2C-UA)

* React 获取节点样式

  通过 ref + getComputedStyle 获取当前元素的属性

  ```jsx
  const width = getComputedStyle(ref.current).width; // eg: "800px"
  ```

  而通过 ref + style 方式获取到的仅是该元素的内联样式

  ```jsx
  const width = ref.current.style.width; // 仅当元素设置了该内联属性时才有值
  ```

## 一些概念

- React Core：

  React 核心只包含定义组件必要的 API，同时适用于 React DOM 和 React Native 组件。

- 渲染器：

  用于管理一颗 React 树，使其根据底层平台进行不同的调用。主要的渲染器就是 React DOM Render 和 React Native Render。

- reconciler（协调器）：

  不同的渲染器共享部分代码，包括声明式渲染，自定义组件，state，生命周期方法和 refs 等特性，以保持跨平台工作一致。

  - Stack reconciler：

    [参考](https://zh-hans.reactjs.org/docs/implementation-notes.html)

    React 15 版本前的解决方案；

    ```javascript
    ReactDOM.render(<App />, rootEle);
    ```

    reconciler 检查要挂载的组件，通过判断组件的 type 属性，type 的类型可以是类、函数、或者字符串，分别对应 App 是**类**还是**函数**或者**宿主元素**。如果是函数，则 reconciler 调用 App(props) 来获取渲染的元素；如果是类，那么 reconciler 会通过 new App(props) 来实例化 App，并调用生命周期方法 componentWillMount()，之后调用 render() 方法来获取渲染的元素；如果是字符串，代表是宿主元素，reconciler 会让 renderer 负责挂载它，例如在浏览器中，React DOM 会创建一个 DOM 节点。

    该过程是递归的，reconciler 会通过用户定义的组件递归地探悉各个组件渲染的元素，子组件生成的 DOM 节点会附加在父 DOM 节点上，递归地完成整个 DOM 结构的组装。

    (**注**：reconciler 本身不与 DOM 绑定，挂载的最终结果取决于 renderer，可以是一个 DOM 节点（React DOM），一个字符串（React DOM Server），或是一个表示原生视图的数字（React Native）)

    ```javascript
    // 伪代码
    function isClass(type) {
      // 类组件会有这个标识位
      return Boolean(type.prototype) && Boolean(type.prototype.isReactComponent)
    }

    // 此函数处理组合类型的元素，即非宿主元素
    function mountComposite(element) {
      var type = element.type
      var props = element.props

      var renderElement
      if (isClass(type)) { // 类组件
        var publicInstance = new type(props)
        publicInstance.props = props // 设置 props
        if (publicInstance.componentWillMount) {
          publicInstance.componentWillMount() // 如果有该声明周期就调用
        }
        renderElement = publicInstance.render() // 执行render方法获得要渲染的元素
      } else if (typeof of type === 'function') { // 函数组件
        renderElement = type(props)
      }

      return mount(renderElement) // 递归，当元素是宿主元素（如<div />）时，到达递归底部
    }

    // 此函数处理宿主类型元素
    function mountHost(element) {
      var type = element.type
      var props = element.props
      var children = props.children || []
      if(!Array.isArray(children)) {
        children = [children]
      }
      children = children.filter(Boolean) // 去除假值元素

      // 这段代码不应出现在 reconciler 中，因为不同的 renderer 会以不同的方式初始化节点
      var node = document.createElement(type)
      Object.keys(props).forEach(propName => {
        if(propName !== 'children') {
          node.setAttribute(propName. props[propName])  // 设置元素属性
        }
      })

      // 挂载子元素
      children.forEach(childElement => {
        // 子元素可能是宿主或者组合元素，仍是递归挂载
        var childNode = mount(childElement)

        // 这行 renderer 相关的代码也不应该出现在这里
        node.appendChild(childNode)
      })

      // DOM 节点作为挂载的结果返回，也是递归结束的位置
      return node
    }

    function mount(element) {
      var type = mount.type
      if(typeof type === 'function') { // 类组件：new 构造函数；函数组件：直接调用函数
        return mountComposite(element)
      } else if (typeof type === 'string') {
        return mountHost(element)
      }
    }

    var rootEl = document.getElementById('root')
    var node = mount(<App />)
    rootEl.appendChild(node)
    ```

    （**注**：以上代码与实际实现依然相差很多，关键部分是对更新的支持）

    React 的关键特点是可以重新渲染所有内容，并且不会重新生成 DOM 或重置 state。然而，之前的实现只是知道如何挂载最初的树。由于它没有存储所有的必要信息，例如所有的 publicInstance，或 DOM 节点属于哪个组件，所以它不能完成更新操作。

    stack reconciler 源码通过把 mount() 函数作为一个类的方法来解决这个问题。这种方法是存在缺点的。

    我们会创建两个类：DOMComponent 和 CompositeComponent ，而不是分离的两个函数 mountHost 和 mountComponsite。

    两个类都有一个接受 element 的构造函数，同时也有一个返回挂载后节点的 mount() 方法。我们可以用一个实例化正确类的工厂函数替换了顶层的 mount() 函数：

    ```javascript
    function instantiateComponent(element) {
      var type = element.type;
      if (typeof type === "function") {
        // 用户定义组件
        return new CompositeComponent(element);
      } else if (typeof type === "string") {
        // 平台特定组件
        return new DOMComponent(element);
      }
    }
    ```

    首先，我们思考一下 CompositeComponent 的实现：

    ```javascript
    class CompositeComponent {
      constructor(element) {
        this.currentElement = element;
        this.renderedComponent = null;
        this.publicInstance = null;
      }

      getPublicInstance() {
        // 对于组合组件，公共类实例
        return this.publicInstance;
      }

      mount() {
        var element = this.currentElement;
        var type = element.type;
        var props = element.props;

        var publicInstance;
        var renderedElement;
        if (isClass(type)) {
          // 类组件
          publicInstance = new type(props);
          publicInstance.props = props;
          // 如果有生命周期方法就调用
          if (publicInstance.componentWillMount) {
            publicInstance.componentWillMount();
          }
          renderedElement = publicInstance.render();
        } else if (typeof type === "function") {
          // 函数组件
          publicInstance = null;
          renderedElement = type(props);
        }

        // 保存公共实例
        this.publicInstance = publicInstance;

        // 根据实例化子内部实例
        // <div /> 或者 <p /> 是 DOMComponent,
        // 而<App /> 或者 <Button /> 是 CompositeComponent。
        var renderedComponent = instantiateComponent(renderedElement);
        this.renderedComponent = renderedComponent;

        // 挂载渲染后的输出
        return renderedComponent.mount();
      }
    }
    ```

    这与之前的 mountComposite() 的实现没有太多不同，但是现在我们可以保存一些信息，如 this.currentElement, this.renderedComponent 和 this.publicInstance，用于更新期间使用。

    需要注意的是 CompositeComponent 的实例与用户提供的 element.type 的实例是不同的东西。CompositeComponent 是我们的 reconciler 的实现细节，而且永远不会暴露给用户。用户定义的类是 element.type 读取的，并且 CompositeComponent 会创建一个它的实例。

    为了避免混淆，我们把 CompositeComponent 和 DOMComponent 的实例叫做“内部实例”。由于它们的存在，我们可以把一些长时间存在的数据存入其中。只有 renderer 和 reconciler 能意识到它们的存在。

    相反，我们把用户定义的类的实例叫做“公共实例”。公共实例就是你在 render() 中所见到的 this 和你的自定义组件中的一些其他方法。

    mountHost() 函数，重构为 DOMComponent 类的 mount() 方法，看起来也很熟悉：

    ```javascript
    class DOMComponent {
      constructor(element) {
        this.currentElement = element;
        this.renderedChildren = [];
        this.node = null;
      }

      getPublicInstance() {
        return this.node;
      }

      mount() {
        var element = this.currentElement;
        var type = element.type;
        var props = element.props;
        var children = props.children || [];
        if (!Array.isArray(children)) {
          children = [children];
        }

        // 创建并保存节点
        var node = document.createElement(type);
        this.node = node;

        // 设置属性
        Object.keys(props).forEach((propName) => {
          if (propName !== "children") {
            node.setAttribute(propName, props[propName]);
          }
        });

        // 创建并保存包含的子项
        // 他们每个都可以是 DOMComponent 或 CompositeComponent
        // 取决于类型是字符串还是函数
        var renderedChildren = children.map(instantiateComponent);
        this.renderedChildren = renderedChildren;

        // 收集他们在 mount 上返回的节点
        var childNodes = renderedChildren.map((child) => child.mount());
        childNodes.forEach((childNode) => node.appendChild(childNode));

        // DOM 节点作为挂载结果返回
        return node;
      }
    }
    ```

    mountHost() 重构后主要的区别是我们保存了与内部 DOM 组件实例关联的 this.name 和 this.renderedChildren，将来我们会使用他们进行非破坏性更新。

    因此，每个内部实例，组合组件或者宿主组件，现在都指向了它的子内部实例。假设有函数组件 App 会渲染类组件 Button，并且 Button 渲染一个 div，其内部实例树将如下所示:

    ```javascript
    [object CompositeComponent]: {
      currentElement: <App />,
      publicInstance: null,
      renderedComponent: [object CompositeComponent] {
        currentElement: <Button />,
        publicInstance: [object Button],
        renderedComponent: [object DOMComponent] {
          currentElement: <div />,
          publicInstance: [object HTMLDivElement],
          renderedChildren: []
        }
      }
    }
    ```

    在 DOM 中，你只会看到 div，但是在内部实例树包含了组合和宿主的内部实例。

    组合内部实例需要存储：

    - 当前元素
    - 如果元素的类型是类，则存储该类的公共实例
    - 单次渲染后的内部实例。它可以是 DOMComponent 或 CompositeComponent

    宿主内部实例需要存储：

    - 当前元素
    - DOM 节点
    - 所有子内部实例。它们中的每一个都可以是 DOMComponent 或 CompositeComponent

    为了完成重构，我们引入一个函数，它将完整的树挂载到容器节点中，并返回公共实例，就像 ReactDOM.render() 一样：

    ```javascript
    function mountTree(element, containerNode) {
      // 创建顶层内部实例
      var rootElement = instantiateComponent(element);

      // 挂载顶层组件到容器中
      var node = rootElement.mount();
      containerName.appendChild(node);

      // 返回它提供的公共实例
      var publicInstance = rootElement.getPublicInstance();
      return publicInstance;
    }

    // 使用时
    var rootEl = document.getElementById("root");
    mountTree(<App />, rootEl);
    ```

  - Fiber reconciler：

    React 16 版本后的解决方案；
