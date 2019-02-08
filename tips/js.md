## 补充一些js基础
#### 原型
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

foo.valueOf() // 'Cunstom valueOf method'
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