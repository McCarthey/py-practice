### 补充一些js基础
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