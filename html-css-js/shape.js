// 使用WeakMap来存储所有私有值
const map = new WeakMap()

// 创建一个在每个实例中存储私有变量的对象
const internal = obj => {
	if (!map.has(obj)) {
		map.set(obj, {})
	}
	return map.get(obj)
}
class Shape {
	constructor(width, height) {
		internal(this).width = width
		internal(this).height = height
	}
	
	get area() {
		return internal(this).width * internal(this).height
	}
}

const square = new Shape(10, 10)
console.log(square.area)
console.log(map.get(square))
