/**
 * 双向链表
 * 双向链表可以从头到尾迭代，也可以反过来
 */
function DoubleLinkedList() {
    var Node = function(element) {
        this.element = element
        this.next = null
        this.prev = null // 指向前一个元素
    }

    var length = 0
    var head = null
    var tail = null // 指向尾元素

    // 向特定位置插入一个新的项
    this.insert = function(position, element) {
        // 检查越界值
        if (position >= 0 && position <= length) {
            var node = new Node(element),
                current = head,
                previous,
                index = 0

            if (position === 0) { // 在第一个位置添加
                if (!head) {
                    head = node
                    tail = node
                } else {
                    node.next = current
                    current.prev = node
                    head = node
                }
            } else if (position === length) { // 在最后一个位置添加
				node.prev = current
				current.next = node
				tail = node
            } else {
                while (index++ < position) { // index++ 结果为当前index值，然后index再+1。例如，当index = 0, position = 1时，循环会执行一次，循环结束后index = 1
                    previous = current
                    current = current.next
                }
				node.next = current
				previous.next = node
				current.prev = node
				node.prev = previous
            }

            length++
            return true
        } else {
            return false
        }
    }
}