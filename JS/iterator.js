/**
 * 迭代器模式 示例
 */
const arr = [1, 2, 3]

const iterator = arr[Symbol.iterator]()

iterator.next()
// {value: 1, done: false}
iterator.next()
// {value: 2, done: false}
iterator.next()
// {value: 3, done: false}
iterator.next()
// {value: undefined, done: true}

/**
 * 自制简易迭代器模式
 */
class IteratorFromArray {
    constructor(arr) {
        this._array = arr
        this._cursor = 0
    }

    next() {
        return this._cursor < this._array.length ?
            { value: this._array[this._cursor++], done: false } :
            { done: true }
    }
}

const it = new IteratorFromArray([1, 2, 3, 4, 5])
it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next()
// {value: 4, done: false}
it.next()
// {value: 5, done: false}
it.next()
// {done: true}