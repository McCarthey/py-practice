## 补充一些 js 基础

### 原型

每个函数都有 prototype 属性（除了 let fun = Function.prototype.bind()以外）,该属性的值是一个对象，只有一个 constructor 属性，对应着构造函数

```javascript
Foo.prototype.constructor === Foo; // true
```

每个对象都有**proto**属性，指向了创建该对象的构造函数的原型。其实指向的是内部属性[[prototype]]。对象可以通过**proto**来寻找不属于该对象的属性，**proto**将对象链接成了原型链。

```javascript
function Foo() {
  console.log("Foo");
}
let foo = new Foo();
// 获取foo对象的原型
Object.getPrototypeOf(foo) === Foo.prototype; // true
// 判断一个对象是否是另一个对象的原型
Foo.prototype.isPrototypeOf(foo); // true
// 因为Foo没有这个方法isPrototypeOf 因此Foo需要沿着原型继续查找，因此相当于
Foo.prototype.__proto__.isPrototypeOf(foo); // true
// 通过在构造函数的原型上添加同名属性改写原生方法
Foo.prototype.valueOf = function () {
  console.log("Cunstom valueOf method");
};

foo.valueOf(); // 'Cunstom valueOf method' 屏蔽了Object上的原生valueOf方法
```

### 自己实现一个 new

```javascript
function create() {
  // 创建一个空对象
  let obj = {};
  // 获取构造函数
  let Con = [].shift.call(arguments);
  // 链接到原型
  obj.__proto__ = Con.prototype;
  // 绑定this，执行构造函数，即使新创建的 obj 对象作为this的上下文
  let result = Con.apply(obj, arguments);
  // 确保new出来的是个对象
  return typeof result === "object" ? result : obj;
}
```

```javascript
// Or
var objFactory = function () {
  var obj = {},
    Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" ? ret : obj;
};
```

### typeof 操作符

```javascript
typeof null; // 'object'
typeof undefined; // 'undefined'
typeof function name() {}; // 'function'
typeof (function name() {})(); // 'undefined'
typeof [1, 2, 3]; // 'object'
typeof /.+?(.*)/; // 'object'
typeof String; // 'function'
typeof RegExp; // 'function'
typeof asdfghjkl; // 'undefined'
typeof 汉字; // 'undefined'
```

可见`typeof`操作符相对比较安全

### 自己实现一个 instanceof

通过判断对象的原型链中是不是能找到类型的 prototype

```javascript
function myInstanceof(left, right) {
  // 左侧类型不是对象则返回 false
  if ((typeof left !== "object" && typeof left !== "function") || left === null)
    return false;
  // 获取左侧实例对象的内部[[prototype]]属性
  let proto = Object.getPrototypeOf(left);
  // 获取右侧类型的prototype，如Number.prototype, Bar.prototype
  let prototype = right.prototype;
  // 沿着原型链逐级查找，直到找到或者[[prototype]]为null
  while (true) {
    if (proto === null) {
      return falseu;
    }
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto); // 继续查找
  }
}
```

### 自己实现 call

```javascript
Function.prototype.myCall = function (context) {
  var context = context || window;
  // 给context添加一个属性
  context.fn = this;
  // 将context后面的参数取出来
  var args = [...arguments].slice(1);
  var result = context.fn(...args);
  delete context.fn;
  return result;
};
```

### 自己实现 apply

实现思路和 call 一样，保存 this 给一个函数属性，返回执行后的结果，最后删除

```javascript
Function.prototype.myApply = function (context) {
  const ctx = context || window;
  const resetArgs = [...arguments][1];
  ctx.fn = this;
  const result = ctx.fn(resetArgs);
  delete ctx.fn;
  return result;
};
```

### 自己实现 bind

bind 和 call, apply 作用也是一致的，只是该方法会返回一个函数，我们可以用 apply 模拟实现 bind：

```javascript
Function.prototype.myBind = function (context) {
  const func = this;
  const restArgs = [...arguments].slice(1);

  return function () {
    const args = [...restArgs, ...arguments]; // 合并 bind时传入的参数 和 执行返回的函数时的参数，因此可以使用bind实现函数柯里化
    return func.apply(context, args);
  };
};
```

柯里化实现，例如：

```javascript
let a = { value: 5 };
function getValue(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

getValue.myBind(a, "344", 56)(); // '344', 56 , 5
getValue.myBind(a, "344")(56); // '344', 56 , 5
getValue.myBind(a)("344", 56); // '344', 56 , 5
```

### 防抖实现

定义：多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行。

原理：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。

```javascript
// 示例：监听滚动事件
let timer;
window.onscroll = function () {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    let scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    console.log(`滚动位置：${scrollTop}`);
    timer = null;
  }, 500);
};
```

抽象函数：

```javascript
const debounce = (func, delay) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, arguments);
      timer = null;
    }, delay);
  };
};
```

使用

```javascript
function onScroll() {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log("滚动条位置：" + scrollTop);
}

window.onscroll = debounce(onScroll, 500);
```

### 节流实现

定义：触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用。

原理：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。

```javascript
// 示例：监听滚动事件
let startTime = Date.now(); //开始时间
let time = 500; //间隔时间
let timer;
window.onscroll = function throttle() {
  let currentTime = Date.now();
  if (currentTime - startTime >= time) {
    let scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    console.log("滚动条位置：" + scrollTop);
    startTime = currentTime;
  } else {
    clearTimeout(timer);
    timer = setTimeout(function () {
      throttle();
    }, 50);
  }
};
```

抽象函数：

```javascript
function throttle(func, delay) {
  let startTime = Date.now();
  return function () {
    let _this = this;
    let currentTime = Date.now();
    if (currentTime - startTime >= delay) {
      func.apply(_this, arguments);
      startTime = currentTime;
    }
  };
}
```

### 函数柯里化

函数柯里化只的是将一个多参数的函数拆分成一系列函数，每个拆分后的函数都只接受一个参数

```javascript
function add(a, b) {
  return a + b;
}

add(1, 2);
```

柯里化后，

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}

add(1)(2);

// 或者采用更简洁的箭头函数写法
const add = (a) => (b) => a + b;
```

对于不定参数的函数的柯里化：

```javascript
const curry = (fn) => {
  let args = [];
  return function inner(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      return inner;
    } else {
      let result = fn.apply(this, args);
      args = [];
      return result;
    }
  };
};

function add(...args) {
  return args.reduce((acc, cur) => acc + cur, 0);
}

const curryAdd = curry(add);
curryAdd(1)(2)(3)(4)(); // 10
curryAdd(1)(2)(3, 4)(); // 10
curryAdd(1)(2, 3, 4)(); // 10
curryAdd(1, 2, 3, 4)(); //10
```

### 自己实现 Promise

```javascript
// 简单版
function myPromise(constructor) {
  let that = this;
  this.state = "pending";
  this.value = undefined;
  this.reason = undefined;

  function resolve(value) {
    if (that.state === "pending") {
      that.value = value;
      that.state = "resolved";
    }
  }

  function reject(reason) {
    if (that.state === "pending") {
      that.reason = reason;
      that.state = "rejected";
    }
  }

  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.state === "resolved") {
    onFulfilled(this.value);
  }
  if (this.state === "rejected") {
    onRejected(this.reason);
  }
};

// 测试
const p1 = new myPromise(function (resolve, reject) {
  resolve("x");
});
p1.then((res) => console.log(res)); // "x"
```

### 堆内存与栈内存

JS 引擎中对变量的存储主要有两种，**堆内存**和**栈内存**。

**栈内存**主要用于存储各种**基本类型**的变量，Boolean、Number、String、Undefined、Null 以及对象变量的指针。

**堆内存**主要负责对象 Object 变量类型的存储。因此“const 定义的常量无法修改”这种说法对于 const a = {}来说，仅仅是该对象的指针不变（即堆内存指向不改变）,但堆内存中的数据本身的大小或属性是可变的。因此 a.name = 'test' 等属性赋值操作依然生效。

因此，使用 let、const 二次定义变量时的报错也可以解释了————即使用 let、const 时都要先遍历栈内存，如果有重名变量则返回错误。

### 定时器的第三个参数

经典面试题，循环中使用闭包解决 var 定义函数的问题

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

解决办法有三：闭包、setTimeout 的第三个参数、let

```javascript
// 闭包
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

```javascript
// setTimeout的第三个参数（兼容IE9以上）
// setTimeout第三个以后的参数将作为参数传递给function
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function (j) {
      console.log(j);
    },
    i * 1000,
    i
  );
}
```

```javascript
// let 创建块级作用域
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

### Promise 的实现

```javascript
// 三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
// promise 接收一个函数参数，该函数会立即执行
function MyPromise(fn) {
  let _this = this;
  _this.currentState = PENDING;
  _this.value = undefined;
  // 用于保存 then 中的回调，只有当 promise
  // 状态为 pending 时才会缓存，并且每个实例至多缓存一个
  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  _this.resolve = function (value) {
    if (value instanceof MyPromise) {
      // 如果 value 是个 Promise，递归执行
      return value.then(_this.resolve, _this.reject);
    }
    setTimeout(() => {
      // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED;
        _this.value = value;
        _this.resolvedCallbacks.forEach((cb) => cb());
      }
    });
  };

  _this.reject = function (reason) {
    setTimeout(() => {
      // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED;
        _this.value = reason;
        _this.rejectedCallbacks.forEach((cb) => cb());
      }
    });
  };
  // 用于解决以下问题
  // new Promise(() => throw Error('error))
  try {
    fn(_this.resolve, _this.reject);
  } catch (e) {
    _this.reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  // 规范 2.2.7，then 必须返回一个新的 promise
  var promise2;
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，同时也实现了透传
  // Promise.resolve(4).then().then((value) => console.log(value))
  onResolved = typeof onResolved === "function" ? onResolved : (v) => v;
  onRejected = typeof onRejected === "function" ? onRejected : (r) => throw r;

  if (self.currentState === RESOLVED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      // 所以用了 setTimeout 包裹下
      setTimeout(function () {
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (self.currentState === REJECTED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        // 异步执行onRejected
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (self.currentState === PENDING) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      self.resolvedCallbacks.push(function () {
        // 考虑到可能会有报错，所以使用 try/catch 包裹
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      self.rejectedCallbacks.push(function () {
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    }));
  }
};
// 规范 2.3
function resolutionProcedure(promise2, x, resolve, reject) {
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    if (x.currentState === PENDING) {
      x.then(function (value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 规范 2.3.3.3.3
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  // 规范 2.3.3，判断 x 是否为对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范 2.3.3.1
      let then = x.then;
      // 如果 then 是函数，调用 x.then
      if (typeof then === "function") {
        // 规范 2.3.3.3
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 规范 2.3.3.3.1
            resolutionProcedure(promise2, y, resolve, reject);
          },
          (e) => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 规范 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x);
  }
}
```

### 实现 Array.prototype.map

```javascript
Array.prototype.map = function (cb) {
  var result = [];
  this.forEach(function (element, index) {
    result.push(cb(element, index));
  });
  return result;
};
```

### 实现 Array.prototype.filter

```javascript
Array.prototype.filter = function (cb) {
  var result = [];
  this.forEach((item, index) => {
    if (cb(item, index)) {
      result.push(item);
    }
  });
  return result;
};
```

### 实现一个深拷贝函数 deepClone

```javascript
// 判断数据类型
const type = (obj) => {
  const typeString = Object.prototype.toString.call(obj);
  const map = {
    "[object Array]": "array",
    "[object Object]": "object",
  };

  return map[typeString];
};

// 深拷贝
const deepClone = (data) => {
  const typeString = type(data);
  let r;
  if (typeString === "array") {
    r = [];
    for (let i = 0; i < data.length; i++) {
      r.push(deepClone(data[i]));
    }
    return r;
  } else if (typeString === "object") {
    r = {};
    for (let i in data) {
      r[i] = deepClone(data[i]);
    }
    return r;
  } else {
    return data;
  }
};
```

### 内存泄漏

定义：内存泄漏指的是，程序之前需要用到部分内存，而这部分内存在用完之后并没有返回到内存池。

常见的内存泄漏：

- 全局变量

  不断地创建全局变量，不管有没有用到，它们都将滞留在程序的执行过程中，如果它们是深层嵌套对象，更会浪费大量内存；

  ```javascript
  var a = { ... }
  var b = { ... }
  function hello() {
    c = a // 隐式地创建了一个全局变量
  }
  ```

- 事件监听器

  当在组件中创建事件监听器，在销毁组件时却没有移除事件监听的话，那么当再次加载该组件时，就又会注册新的事件监听，导致事件监听的不断增加，浪费内存；

  ```javascript
  var element = document.getElementById("button");
  element.addEventListener("click", onClick);
  ```

- 计时器

  当计时器不再使用时，如忘记清除，会导致内存被持续占用

  ```javascript
  setInterval(() => {
    ...
  }, 1000)
  ```

- 移除 DOM 元素

  类似于全局变量导致的内存泄漏。当 dom 从视图上移除时，要注意其引用是否被监听器等保存，否则该内存不会被释放：

  ```javascript
  var terminator = document.getElementById("terminator");
  var badEle = document.getElementById("badEle");
  terminator.addEventListener("click", function () {
    badEle.remove();
  });
  ```

  当点击了 terminator 的按钮后，badEle 会从 DOM 中移除，但是由于它被监听器引用，因此这个对象分配的内存并不会被释放。

  ```javascript
  var terminator = document.getElementById("terminator");
  terminator.addEventListener("click", function () {
    var badEle = document.getElementById("badEle");
    badEle.remove();
  });
  ```

  改动后，badEle 变成了局部变量，在移除操作完成之后，内存将会被垃圾回收。

  - numObj.toString([radix])

  将返回指定 Number 对象的字符串表示方法,其中基数 radix 参数可选,未指定的话默认是 10.

  ```javascript
  let count = 10;
  console.log(count.toString()); // '10'
  console.log(count.toString(2)); // '1010'
  ```
