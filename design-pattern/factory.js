/**
 * 工厂模式
 */
class Product {
  constructor(name) {
    this.name = name
  }
  init() { }
}

class Creator {
  create(name) {
    return new Product(name)
  }
}

const creator = new Creator()
const p1 = creator.create('product1')
const p2 = creator.create('product2')