## 补充一些 js 基础

#### 原型

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
Foo.prototype.valueOf = function() {
  console.log("Cunstom valueOf method");
};

foo.valueOf(); // 'Cunstom valueOf method' 屏蔽了Object上的原生valueOf方法
```

#### 自己实现一个 new

```javascript
function create() {
  // 创建一个空对象
  let obj = new Object();
  // 获取构造函数
  let Con = [].shift.call(arguments);
  // 链接到原型
  obj.__proto__ = Con.prototype;
  // 绑定this，执行构造函数
  let result = Con.apply(obj, arguments);
  // 确保new出来的是个对象
  return typeof result === "object" ? result : obj;
}
```

```javascript
// Or
var objFactory = function() {
  var obj = {},
    Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" ? ret : obj;
};
```

#### 自己实现一个 instanceof

通过判断对象的原型链中是不是能找到类型的 prototype

```javascript
function myInstanceof(left, right) {
  // 获取右侧类型的prototype，如Number.prototype, Bar.prototype
  let prototype = right.prototype;
  // 获取左侧实例对象的内部[[prototype]]属性
  left = left.__proto__;
  // 沿着原型链逐级查找，直到找到或者[[prototype]]为null
  while (true) {
    if (left === null) {
      return false;
    }
    if (left === prototype) {
      return true;
    }
    left = left.__proto__; // 继续查找
  }
}
```

#### 自己实现 call

```javascript
Function.prototype.myCall = function(context) {
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

#### 防抖实现

定义：多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行。

原理：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。

```javascript
// 示例：监听滚动事件
let timer;
window.onscroll = function() {
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
  return function() {
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

#### 节流实现

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
    timer = setTimeout(function() {
      throttle();
    }, 50);
  }
};
```

抽象函数：

```javascript
function throttle(func, delay) {
  let startTime = Date.now();
  return function() {
    let _this = this;
    let currentTime = Date.now();
    if (currentTime - startTime >= delay) {
      func.apply(_this, arguments);
      startTime = currentTime;
    }
  };
}
```

#### 函数柯里化

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
  return function(b) {
    return a + b;
  };
}

add(1)(2);

// 或者采用更简洁的箭头函数写法
const add = a => b => a + b;
```

#### 堆内存与栈内存

JS 引擎中对变量的存储主要有两种，**堆内存**和**栈内存**。

**栈内存**主要用于存储各种**基本类型**的变量，Boolean、Number、String、Undefined、Null 以及对象变量的指针。

**堆内存**主要负责对象 Object 变量类型的存储。因此“const 定义的常量无法修改”这种说法对于 const a = {}来说，仅仅是该对象的指针不变（即堆内存指向不改变）,但堆内存中的数据本身的大小或属性是可变的。因此 a.name = 'test' 等属性赋值操作依然生效。

因此，使用 let、const 二次定义变量时的报错也可以解释了————即使用 let、const 时都要先遍历栈内存，如果有重名变量则返回错误。

#### 定时器的第三个参数

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
  (function(j) {
    setTimeout(function() {
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
    function(j) {
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

#### Promise 的实现

```javascript
function Promise(callback) {
  var self = this;
  self.status = "PENDING";
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];
  callback(resolve, reject);

  function resolve(value) {
    if (self.status === "PENDING") {
      self.status = "FULFILLED";
      self.data = value;
      for (var i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value);
      }
    }
  }

  function reject(error) {
    if (self.status === "PENDING") {
      self.status = "REJECTED";
      self.data = error;
      for (var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](error);
      }
    }
  }
}

Promise.prototype.then = function() {};
```

#### 实现 Array.prototype.map

```javascript
Array.prototype.map = function(cb) {
  var result = [];
  this.forEach(function(element, index) {
    result.push(cb(element, index));
  });
  return result;
};
```

#### 实现 Array.prototype.filter

```javascript
Array.prototype.filter = function(cb) {
  var result = [];
  this.forEach((item, index) => {
    if (cb(item, index)) {
      result.push(item);
    }
  });
  return result;
};
```

#### 实现一个深拷贝函数 deepClone

```javascript
// 判断数据类型
const type = obj => {
  const typeString = Object.prototype.toString.call(obj);
  const map = {
    "[object Array]": "array",
    "[object Object]": "object"
  };

  return map[typeString];
};

// 深拷贝
const deepClone = data => {
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

#### 内存泄漏

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
  var element = document.getElementById('button')
  element.addEventListener('click', onClick)
  ```
- 计时器

  当计时器不再使用时，如忘记清除，会导致内存被持续占用
  ```javascript
  setInterval(() => {
    ...
  }, 1000)
  ```
- 移除DOM元素

  类似于全局变量导致的内存泄漏。当dom从视图上移除时，要注意其引用是否被监听器等保存，否则该内存不会被释放：
  ```javascript
  var terminator = document.getElementById('terminator')
  var badEle = document.getElementById('badEle')
  terminator.addEventListener('click', function () {
    badEle.remove()
  })
  ```
  当点击了terminator的按钮后，badEle会从DOM中移除，但是由于它被监听器引用，因此这个对象分配的内存并不会被释放。
  ```javascript
  var terminator = document.getElementById('terminator')
  terminator.addEventListener('click', function () {
    var badEle = document.getElementById('badEle')
    badEle.remove()
  })
  ```
  改动后，badEle变成了局部变量，在移除操作完成之后，内存将会被垃圾回收。

  - numObj.toString([radix])

  将返回指定Number对象的字符串表示方法,其中基数radix参数可选,未指定的话默认是10.
  ```javascript
  let count = 10
  console.log(count.toString()) // '10'
  console.log(count.toString(2)) // '1010'
  ```