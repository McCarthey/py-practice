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