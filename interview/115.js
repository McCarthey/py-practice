class LinkList {
    constructor() {
        this.head = null
    }
    // 单链表的整表创建 O(n)
    create(n) {
        this.head = new Node()
        let current = this.head
        for (let i = 0; i < n; i++) {
            const newNode = new Node()
            if (i === 0) {
                this.head.next = newNode
                current = newNode
            } else {
                current.next = newNode
                current = current.next
            }
        }
    }
    // 单链表的插入
    insert(index) {
        let current = this.head
        const node = new Node()
        let j = 1
        if(index === 0) {
            node.next = current
            this.head = node
            return
        }
        while (current && j < index) {
            current = current.next
            j++
        }
        if (!current || j > index) {
            throw new Error('Insert failed: no such node')
        }
        node.next = current.next
        current.next = node
    }
    // 单链表的删除某一结点
    removeAt(index) {
        let current = this.head
        let j = 1
        if(index === 0) {
            this.head = current.next
            return
        }
        while (current.next && j < index) {
            current = current.next
            j++
        }
        if (!current.next || j > index) {
            throw new Error('Remove failed: no such node')
        }
        current.next = current.next.next

    }
    // 单链表的整表删除
    remove() {
        let current = this.head
        while(current) {
            const next = current.next
            current = null
            current = next
        }
        this.head = null
    }
    // 打印结果
    toString() {
        let current = this.head
        if(!current) return ''
        const result = []
        while (current.next) {
            result.push(current.data)
            current = current.next
        }
        console.log(result)
        return result.toString()
    }
}

class Node {
    constructor() {
        this.data = Math.floor(Math.random() * 100)
        this.next = null
    }
}