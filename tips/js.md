## 补充一些js基础
#### 原型
每个函数都有prototype属性（除了let fun = Function.prototype.bind()以外）,该属性的值是一个对象，只有一个constructor属性，对应着构造函数
```javascript
Foo.prototype.constructor === Foo // true
```
每个对象都有__proto__属性，指向了创建该对象的构造函数的原型。其实指向的是内部属性[[prototype]]。对象可以通过__proto__来寻找不属于该对象的属性，__proto__将对象链接成了原型链。


```javascript
function Foo() {
    console.log('Foo')
}
let foo = new Foo()
// 获取foo对象的原型
Object.getPrototypeOf(foo) === Foo.prototype // true
// 判断一个对象是否是另一个对象的原型
Foo.prototype.isPrototypeOf(foo) // true
// 因为Foo没有这个方法isPrototypeOf 因此Foo需要沿着原型继续查找，因此相当于
Foo.prototype.__proto__.isPrototypeOf(foo) // true
// 通过在构造函数的原型上添加同名属性改写原生方法
Foo.prototype.valueOf = function() {
    console.log('Cunstom valueOf method')
}

foo.valueOf() // 'Cunstom valueOf method' 屏蔽了Object上的原生valueOf方法
```
#### 自己实现一个new
```javascript
function create() {
    // 创建一个空对象
    let obj = new Object()
    // 获取构造函数
    let Con = [].shift.call(arguments)
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定this，执行构造函数
    let result = Con.apply(obj, arguments)
    // 确保new出来的是个对象
    return typeof result === 'object' ? result : obj
}
```
#### 自己实现一个instanceof
通过判断对象的原型链中是不是能找到类型的prototype
```javascript
function myInstanceof(left, right) {
    // 获取右侧类型的prototype，如Number.prototype, Bar.prototype
    let prototype = right.prototype
    // 获取左侧实例对象的内部[[prototype]]属性
    left = left.__proto__
    // 沿着原型链逐级查找，直到找到或者[[prototype]]为null
    while(true) {
        if (left === null) {
            return false
        }
        if (left === prototype) {
            return true
        }
        left = left.__proto__ // 继续查找
    }
}
```


#### 自己实现call
```javascript
Function.prototype.myCall = function(context) {
    var context = context || window
    // 给context添加一个属性
    context.fn = this
    // 将context后面的参数取出来
    var args = [...arguments].slice(1)
    var result = context.fn(...args)
    delete context.fn
    return result
}
```

#### 堆内存与栈内存
JS引擎中对变量的存储主要有两种，**堆内存**和**栈内存**。

**栈内存**主要用于存储各种**基本类型**的变量，Boolean、Number、String、Undefined、Null以及对象变量的指针。

**堆内存**主要负责对象Object变量类型的存储。因此“const定义的常量无法修改”这种说法对于const a = {}来说，仅仅是该对象的指针不变（即堆内存指向不改变）,但堆内存中的数据本身的大小或属性是可变的。因此 a.name = 'test' 等属性赋值操作依然生效。

因此，使用let、const 二次定义变量时的报错也可以解释了————即使用let、const时都要先遍历栈内存，如果有重名变量则返回错误。  

#### 定时器的第三个参数
经典面试题，循环中使用闭包解决 var 定义函数的问题
```javascript
for ( var i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, i*1000 );
}
```
解决办法有三：闭包、setTimeout的第三个参数、let
```javascript
// 闭包
for ( var i=1; i<=5; i++) {
	(function(j) {
        setTimeout(function(){
            console.log(j)
        }, j* 1000)
    }(i))
}
```
```javascript
// setTimeout的第三个参数（兼容IE9以上）
// setTimeout第三个以后的参数将作为参数传递给function
for ( var i=1; i<=5; i++) {
	setTimeout(function(j){
        console.log(j)
    }, i* 1000, i)
}
```
```javascript
// let 创建块级作用域
for ( let i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, i*1000 );
}
```