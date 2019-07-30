/**
 * 双向链表
 * 双向链表可以从头到尾迭代，也可以反过来
 */
function DoubleLinkedList() {
    let Node = function (element) {
        this.element = element
        this.next = null
        this.prev = null // 指向前一个元素
    }

    let length = 0
    let head = null
    let tail = null // 指向尾元素

    // 向特定位置插入一个新的项
    this.insert = function (position, element) {
        // 检查越界值
        if (position >= 0 && position <= length) {
            let node = new Node(element),
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
                current = tail
                current.next = node
                node.prev = current
                tail = node
            } else if (position <= length / 2) { // 从头开始遍历
                while (index++ < position) { // index++ 结果为当前index值，然后index再+1。例如，当index = 0, position = 1时，循环会执行一次，循环结束后index = 1
                    previous = current
                    current = current.next
                }
                console.log(`正向循环了${index - 1}次`)
                node.next = current
                previous.next = node
                current.prev = node
                node.prev = previous
            } else { // 当position大于长度的一半的时候从尾部开始遍历，减少查找次数
                current = tail
                while (index++ < length - position) {
                    previous = current
                    current = current.prev
                }
                console.log(`反向循环了${index - 1}次`)
                node.next = previous
                previous.prev = node
                current.next = node
                node.prev = current
            }

            length++
            return true
        } else {
            return false
        }
    }
    this.removeAt = function (position, element) {

    }
    this.getLen = function () {
        return length
    }
    this.toString = function () {
        let current = head,
            string = ''

        while (current) {
            string += "," + current.element
            current = current.next
        }
        return string.slice(1)
    }
}