/**
 * 队列和栈非常相似 只是队列是先进先出
 * 在尾部添加新元素，从顶部移除元素
 */
function Queue() {
    var items = []
    this.enqueue = function(element) {
        items.push(element) // 在尾部添加新元素
    }
    this.dequeue = function() {
        return items.shift() // 移除头部元素
    }
	this.front = function () {
		return items[0] // 返回队列中的一个元素
	}
	this.isEmpty = function () {
		return items.length === 0
	}
    this.size = function() {
        return items.length
	}
	this.clear = function () {
		items = []
	}
	this.print = function () {
		console.log(items.toString())
	}
}

/**
 * ES6 class
 */
class Queue {
	constructor(items) {
		this.items = items
	}
	enqueue(element) {
		this.items.push(element)
	}
	dequeue() {
		return this.items.shift()
	}
	front() {
		return this.items[0]
	}
	isEmpty() {
		return this.items,length === 0
	}
	size() {
		return this.items.length
	}
	clear() {
		this.items = []
	}
	print() {
		console.log(this.items.toString())
	}
}
