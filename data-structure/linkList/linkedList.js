/**
 * 基本链表
 */
function LinkedList() {
    // Node类表示要加入列表的项
    var Node = function(element) {
        this.element = element
        this.next = null
    }

    var length = 0
    var head = null
    // 向列表尾部添加一个新的项
    this.append = function(element) {
        var node = new Node(element)
        var current
        if (head === null) { // 如果列表为空
            head = node
        } else { // 从列表第一个节点开始遍历，直到next属性为null的节点（即为最后一个节点）
            current = head

            while (current.next) {
                current = current.next
            }
            current.next = node // 找到最后一项，将其next赋为node，建立链接
        }

        length++ // 更新列表的长度
    }
    // 向列表特定位置插入一个新的项
    this.insert = function(position, element) {
        // 检查越界值
        if (position >= 0 && position <= length) {
            var node = new Node(element)
            var current = head,
                previous,
                index = 0
            // 如果要添加第一项，将他的指针指向当前元素（头部）,再将头部设置为他
            if (position === 0) {
                node.next = current
                head = node
            } else {
                while (index++ < position) { // index++ 结果为当前index值，然后index再+1。例如，当index = 0, position = 1时，循环会执行一次，循环结束后index = 1
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node // 将他的指针指向当前元素（头部）,再将前一个元素的指针指向他
            }

            length++
            return true
        } else {
            return false
        }
    }
    // 从列表特定位置移除一项
    this.removeAt = function(position) {
        // 检查越界指
        if (position > -1 && position < length) {
            var current = head,
                previous,
                index = 0

            // 如果移除第一项 将头部设置为下一个元素
            if (position === 0) {
                head = current.next
            } else {
                while (index++ < position) { // 关键是确定循环的终止条件
                    previous = current
                    current = current.next
                }
                previous.next = current.next // 将前一个元素的下一个元素指向下一个元素，即 跳过当前元素, 这样，当前元素就会被丢到内存中，等待被垃圾回收器收回
            }

            length--

            return current.element
        } else {
            return null // 如果位置无效，则返回null
        }
    }
    // 从列表中移除一项
    this.remove = function(element) {
		var index = this.indexOf(element) 
		return this.removeAt(index)
    }
    // 返回元素在列表中的索引 没有则返回-1
    this.indexOf = function(element) {
        var current = head,
            index = 0

        while (current) {
            if (current.element === element) {
                return index
            }
            index++
            current = current.next
        }

        return -1
    }
    this.isEmpty = function() {
		return length === 0
    }
    this.size = function() {
		return length
	}
	this.getHead = function () {
		return head
	}
    this.toString = function() {
        var current = head,
            string = ''

        while (current) {
            string += "," + current.element
            current = current.next
        }
        return string.slice(1)
    }
}
var list = new LinkedList()
list.append(15)
list.append(10)