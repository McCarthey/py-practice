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
    this.clear = function() {
        items = [] // 把栈清空
    }
    this.print = function() {
        console.log(items.toString())
    }
}

var stack1 = new Stack()

/**
 * ES6 的class实现
 * 1. 用ES6的限定作用域Symbol实现类
 * 	  声明了Symbol类型的变量，在constructor函数中初始化它的值
 * 	  该方法创建了一个假的私有属性，因为Object.getOwnPropertySymbols方法能够取到类里面声明的所有Symbols属性，
 *    通过stack[Object.getOwnPropertySymbols(stack)[0]]可以访问到_items
 * 2. 用ES6的WeakMap实现类
 *    WeakMap可以确保属性是私有的，可以用WeakMap来存储items变量，是真正的私有属性
 * 	  用闭包将类包起来
 */
let _items = Symbol() // symbol

let Stack = (function() {
    const items = new WeakMap()
    class Stack {
        constructor() {
            items.set(this, []) // weakMap: 以this(Stack类自己的引用)为键，把代表栈的数组存入items
		}
		
		push(element) {
		    this[_items].push(element)
		    let s = items.get(this) // weakMap: 从weakMap中取出值，即以this为键从items中取值
		    s.push(element) // weakMap
		}
		// ...
	}
	return Stack
})()

class Stack {
    constructor() {
        this[_items] = []
    }

    push(element) {
        this[_items].push(element)
    }

    pop() {
        return this[_items].pop()
    }

    peek() {
        return this[_items][this[_items].length - 1]
    }

    isEmpty() {
        return this[_items].length === 0
    }

    clear() {
        this[_items] = []
    }

    size() {
        return this[_items].length
    }

    print() {
        console.log(this[_items].toString())
    }
}

const stack = new Stack()