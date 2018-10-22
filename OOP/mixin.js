/**
 * 显式混入：实现将父类复制到子类的功能
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
		Vehicle.drive.call(this)
		console.log("Rolling on all " + this.wheels)
	}
})