// 获取当前时间戳的方法
let timeStamp = new Date()
console.log(timeStamp.getTime())
console.log(timeStamp.valueOf())
console.log(Date.parse(timeStamp)) // 后三位是000