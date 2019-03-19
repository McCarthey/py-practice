### 函数式编程（FP）
不是所有的语言都支持FP，想要使用函数式编程模式，在这门语言中函数须是一等公民
#### 函数式编程的重要特性
Expression, no statement: 是表达式（有返回值）
#### 纯函数
纯函数指的是一个函数接受相同的参数，将返回相同的值，没有任何显著的副作用(side effect),例如:
```javascript
// 纯函数slice()
var arr = [1,2,3,4,5]

arr.slice(0,3) // [1, 2, 3]
arr.slice(0,3) // [1, 2, 3]
arr.slice(0,3) // [1, 2, 3]

// 非纯函数splice()
arr.splice(0,3) // [1, 2, 3]
arr.splice(0,3) // [4, 5]
arr.splice(0,3) // []
```
#### 副作用(side effect)
副作用是指函数做了跟本身运算返回值无关的事，比如修改全局变量，修改传入函数，执行console.log等。

前端常见的side effect：
- 发送http request
- 打印值
- 获取用户input
- query DOM

### 响应式编程（RP） 


## Observable
```javascript
const Rx = require('rxjs/Rx')
/** 
 * Observable被称为可观察序列，简单来说数据就在Observable中流动，你可以使用各种operator对流处理，例如：
 */
const ob = Rx.Observable.interval(1000)
ob.take(3).map(n => n * 2).filter(n => n >= 2).subscribe({
    next: n => console.log(n),
    error: err => console.log(err),
    complete: () => console.log('complete')
}) 

// subscribe中包含三个函数的参数对象被称为observer（观察者），表示的是对序列结果的处理方式。
// next表示数据正常流动，没有出现异常；error表示流中出错，可能是运行出错，http报错等等；complete表示流结束，不再发射新的数据。
// 其中只有next是必须的，其他两个方法是可选的，因此等同于.subscribe(n => console.log(n))

/**
 * 创建可观察序列的几种方式
 */
Observable.of(...args) // Observable.of()可以将普通Javascript数据转为可观察序列。
Observable.fromPromise(promise) // 将promise转换为Observable
Observable.fromEvent(element, eventName) // 从DOM是事件创建序列，例如Observable.fromEvent($input, 'click')
Observable.ajax(url | AjaxRequest) // 发送http请求
```

#### Observable的特点
- 延迟执行：不像promise一样是立即执行，只有调用了subscribe的时候Observable才会执行
- 渐进式取值：不像数组的方法map, filter等（链式调用时，它们是返回全部数组后，再执行后面的操作符），Observable的调用是将每个元素运算到底，而不是运算完全部的元素再返回。
例如：
```javascript
var source = Rx.Observable.from([1,2,3,4,5]);
var example = source.map(x => x + 1); // 此处不会执行

example.subscribe(console.log) // 只有订阅后才会执行
```
```javascript
// 数组操作
var source = [1,2,3];
var example = source
              .filter(x => x % 2 === 0) // 返回一个完整的数组
              .map(x => x + 1) // 也会运算并返回一个完整的数组

// Observable操作
var source = Rx.Observable.from([1,2,3]);
var example = source
              .filter(x => x % 2 === 0)
              .map(x => x + 1)

example.subscribe(console.log);
// 1. 1被过滤； 2. 2符合条件，然后+1，输出3； 3. 3被过滤
// 即每个元素送出后就是运算到底，在这个过程中不会等待其他的元素运算。
```
