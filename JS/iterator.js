/**
 * 迭代器模式
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