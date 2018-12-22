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

function divideBy2(decNumber) {
	
	const remStack = new Stack([])
	let rem
	let	binaryString = ''
	
	while (decNumber > 0) {
		rem = Math.floor(decNumber % 2)
		remStack.push(rem)
		decNumber = Math.floor(decNumber / 2)
	}
	while (!remStack.isEmpty()) {
		binaryString += remStack.pop() 
	}
	console.log(binaryString)
}

divideBy2(process.argv[2])
