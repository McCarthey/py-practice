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

    print() {
        console.log(this.items.toString())
    }
}

/**
 * 将十进制数转换成2-16进制数
 */
function decimalConvert(decimal, base) {
    const remStack = new Stack([])
    let rem
    const bases = '0123456789ABCDEF'
    let result = ''
    while (decimal > 0) {
        rem = Math.floor(decimal % base)
        remStack.push(rem)
        decimal = Math.floor(decimal / base)
    }
    while (remStack.size() > 0) {
        result += bases[remStack.pop()]
	}
	console.log(`换成为${base}进制的结果为：${result}`)
    return result
}


decimalConvert(255, 16)