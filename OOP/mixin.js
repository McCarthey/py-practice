/**
 * 显式混入：实现将父类复制到子类的功能
 * 显式伪多态：在JS中，需在所有需要使用伪多态引用的地方创建一个函数关联，导致代码可读性差且难以维护，应尽量避免
 */
function mixin(sourceObj, targetObj) {
	for (var key in sourceObj) {
		// 只有在不存在的情况下复制
		if (!(key in targetObj)) {
			targetObj[key] = sourceObj[key]
		}
	}
	return targetObj
}

var Vehicle = {
	engines: 1,
	
	ignition() {
		console.log('Turning on my engine')
	},
	
	drive() {
		this.ignition()
		console.log("Steering and moving")
	}
}

var Car = mixin(Vehicle, {
	wheels: 4,
	
	drive() {
		Vehicle.drive.call(this) // 显式多态（调用super可称之为相对多态），并调用.call(this)使得drive函数在Car对象的上下文中执行
		console.log("Rolling on all " + this.wheels)
	}
})

/**
 * 混合复制
 */