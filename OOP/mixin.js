/**
 * 显式混入：实现将父类复制到子类的功能
 * 显式伪多态：在JS中，需在所有需要使用伪多态引用的地方创建一个函数关联，导致代码可读性差且难以维护，应尽量避免
 * 由于两个对象引用的是同一个函数，因此混入并不能完全模拟面向类的语言中复制
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
 * 寄生继承：
 * 是显式混入模式的一种变体
 */
// 定义一个传统的JS“类”
function Vehicle() {
    this.engines = 1
}
Vehicle.prototype.ignition = function() {
	console.log("Turning on my engine.")
}
Vehicle.prototype.drive = function () {
	this.ignition()
	console.log("Steering and moving forward!")
}
// “寄生类”Car
function Car() {
	// 首先，Car是一个Vehicle
	var car = new Vehicle()
	// 然后对car进行定制
	car.wheels = 4
	// 保存到Vehicle::drive()的特殊引用
	var vehDrive = car.drive
	// 重写Vehicle::drive()
	car.drive = function () {
		vehDrive.call(this)
		console.log("Rolling on all " + this.wheels + ' wheels!')
	}
	return car
}

var myCar = new Car() // 或者不使用new，直接调用Car()，结果相同，但是可以避免创建并丢弃多余的对象
myCar.drive()