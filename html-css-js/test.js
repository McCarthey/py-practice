// 获取当前时间戳的方法
let timeStamp = new Date()
console.log(timeStamp.getTime())
console.log(timeStamp.valueOf())
console.log(Number(new Date()))
console.log(+new Date())
console.log(Date.now())
console.log(Date.parse(timeStamp)) // 后三位是000 即 只精确到秒

// Safari浏览器器/ios app中打开网页 获取时间戳的方法需要兼容
// new Date('xxxx-xx-xx xx:xx:xx')在上述情况下不适应 在safari下默认是无效的时间格式
// 应使用new Date('xxxx/xx/xx xx:xx:xx')的兼容形式