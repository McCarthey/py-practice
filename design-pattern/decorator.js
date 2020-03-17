/**
 * 装饰器模式：在不改变对象自身的基础上，动态地给某个对象添加新的功能，同时又不改变其接口
 */
class Plane {
  fire() {
    console.log('普通子弹')
  }
}

class Missile {
  constructor(plane) {
    this.plane = plane
  }
  fire() {
    this.plane.fire()
    console.log('导弹')
  }
}

const missile = new Missile(new Plane())
console.log(missile.fire())