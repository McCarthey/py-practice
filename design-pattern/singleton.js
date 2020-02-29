/**
 * 单例模式：保证一个类只有一个实例，并同提供一个访问它的全局方法
 */
class Singleton {
  login() { }
  logout() { }
}

Singleton.getInstance = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()

const obj1 = Singleton.getInstance()
const obj2 = Singleton.getInstance()
console.log(obj1 === obj2) // true


function SingleManage(manage) {
  this.name = manage.name
  this.level = manage.level
  this.info = function () {
    console.log('boss name is ' + this.name)
  }
}

SingleManage.getInstance = function (manage) {
  if (!this.instance) {
    this.instance = new SingleManage(manage)
  }
  return this.instance
}

var boss1 = SingleManage.getInstance({ name: 'steve', level: 'p9' })
var boss2 = SingleManage.getInstance({ name: 'cook', level: 'p8' })