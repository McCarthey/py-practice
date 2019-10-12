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

- useEffect

在 useEffect 中设定定时器，可以实现防抖功能，在 return 时（组件 unmount 时）清除定时器

例如，在输入查询条件变化时，调用查询API：
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
  topQuery: ""
});

const handleChange = (e: any) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
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
        <dm-header ref={elem => (this.el = elem)} />
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
