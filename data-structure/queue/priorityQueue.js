function priorityQueue() {
    var items = []

    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }
	// 优先队列的入队方法如下
	// 此处是最小优先队列 即priority值小的在队列的前面
	// 最大优先队列与之相反
    this.enqueue = function(element, priority) {
        var queueElement = new QueueElement(element, priority)

        if (this.isEmpty()) {
            items.push(queueElement)
        } else {
            var added = false
            for (var i = 0; i < items.length; i++) {
                if (queueElement.priority < items[i].priority) {
                    items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if (!added) {
                items.push(queueElement)
            }
        }
    }
    // 其他方法同普通队列
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