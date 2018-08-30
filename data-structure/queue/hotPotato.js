function Queue() {
    var items = []
    this.enqueue = function(element) {
        items.push(element) // 在尾部添加新元素
    }
    this.dequeue = function() {
        return items.shift() // 移除头部元素
    }
    this.front = function() {
        return items[0] // 返回队列中的一个元素
    }
    this.isEmpty = function() {
        return items.length === 0
    }
    this.size = function() {
        return items.length
    }
    this.clear = function() {
        items = []
    }
    this.print = function() {
        console.log(items.toString())
    }
}

// 循环队列 -- 模拟击鼓传花游戏
function hotPotato(nameList, num) {
	var queue = new Queue()
	
	for (var i = 0; i < nameList.length; i++) {
		queue.enqueue(nameList[i])
	}
	
	var eliminated = ''
	while (queue.size() > 1) {
		for (var i = 0; i < num; i++) {
			queue.enqueue(queue.dequeue())
		}
		eliminated = queue.dequeue()
		console.log(`${eliminated}被淘汰`)
	}
	
	return queue.dequeue()
}

var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
var winner = hotPotato(names, 7)
console.log(`The winner is ${winner}`)