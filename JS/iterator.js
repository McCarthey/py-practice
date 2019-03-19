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

    map(callback) {
        const iterator = new IteratorFromArray(this._array)

        return {
            next: () => {
                const { value, done } = iterator.next()
                return {
                    done: done,
                    value: done ? undefined : callback(value)
                }
            }
        }
    }
}

const iterator = new IteratorFromArray([1,2,3,4,5]);
const newIterator = iterator.map(v => v + 3)

newIterator.next()
// {done: false, value: 4}
newIterator.next()
// {done: false, value: 5}
newIterator.next()
// {done: false, value: 6}
newIterator.next()
// {done: false, value: 7}
newIterator.next()
// {done: false, value: 8}
newIterator.next()
// {done: true, value: undefined}