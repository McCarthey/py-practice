class Shape {
	constructor(width, height) {
		this._width = width
		this._height = height
	}
	
	get area() {
		return this._width * this._height
	}
}

const square = new Shape(10, 10)
console.log(square.area)
console.log(square._width)
