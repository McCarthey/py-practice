## 核心概念

[参考](https://juejin.im/post/5cc3d28df265da036b4a6c0f)

被观察的 state 状态

```js
import { observable } from "mobx";

let cart = observable({
  itemCount: 0,
  modified: new Date()
});
```

观察者：

```js
import { observable, autorun } from "mobx";

autorun(() => {
  console.log(`The Cart contains ${cart.itemCount} item(s).`);
}); // => 控制台输出： The Cart containers 0 item(s)

cart.itemCount++; // => 控制台输出： The Cart containers 1 item(s)
```

autorun 是一种观察者，它会自动观察函数里的 observable 变量，如果函数里的变量发生了改变，它就会执行函数一遍。

类似于 redux，不应该直接修改 state，需要把操作放到 action 中：

```js
import { observable, autorun, action } from "mobx";

const incrementCount = action(() => {
  cart.itemCount++;
});

incrementCount();
```

副作用 reaction：

action 用于改变state，reaction 是state改变后需要执行的，
> action => state => reaction
