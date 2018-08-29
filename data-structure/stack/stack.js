/**
 * 栈 - 后进先出
 * 需要几个方法: push pop peek isEmpty clear size
 */
function Stack() {
    var items = [];
    this.push = function(element) {
        items.push(element) // 新元素放在末尾（栈顶）
    }
    this.pop = function() {
        return items.pop() // 弹出并返回末尾的元素
    }
    this.peek = function() {
        return items[items.length - 1] // 返回最后入栈的元素
    }
    this.isEmpty = function() {
        return items.length === 0 // 判断栈是否为空
    }
    this.size = function() {
		return items.length // 返回栈的大小
	}
	this.clear = function () {
		items = [] // 把栈清空
	}
	this.print = function () {
		console.log(items.toString())
	}
}

var stack = new Stack()

/**
 * ES6 的class实现
 */
class Stack {
	constructor(items) {
		this.items = items
	}
	
	push(element) {
		this.items.push(element)
	}
	
	pop() {
		return this.items.pop()
	}
	
	peek() {
		return this.items[this.items.length - 1]
	}
	
	isEmpty() {
		return this.items.length === 0
	}
	
	clear() {
		this.items = []
	}
	
	size() {
		return this.items.length
	}
}

const stack = new Stack([])
