const widthSymbol = Symbol('width')
const heightSymbol = Symbol('height')

class Shape {
    constructor(width, height) {
		this[widthSymbol] = width
		this[heightSymbol] = height
	}
	get area() {
		return this[widthSymbol] * this[heightSymbol]
	}
}

const square = new Shape(10, 10)
console.log(square.area)
console.log(square.widthSymbol)
console.log(square[widthSymbol])