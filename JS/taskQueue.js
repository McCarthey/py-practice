/**
 * 任务队列：
 * microtasks:
 * - process.nextTick
 * - promise
 * - Object.observe
 * - MutationObserver
 * macrotasks:
 * - setTimeout
 * - setInterval
 * - setImmediate
 * - I/O
 */
console.log('start')

const interval = setInterval(() => {
	console.log('setInterval')
}, 0)

setTimeout(() => {
	console.log('setTimeout 1')
	new Promise((resolve) => {
		console.log('promise 1')
		resolve()
	})
		.then(() => {
			console.log('promise 2')
		})
		.then(() => {
			console.log('promise 3')
		})
		.then(() => {
			setTimeout(() => {
				console.log('setTimeout 2')
				Promise.resolve()
					.then(() => {
						console.log('promise 4')
					})
					.then(() => {
						console.log('promise 5')
					})
					.then(() => {
						clearInterval(interval)
					})
			}, 0)
		})
}, 0)

Promise.resolve()
	.then(() => {
		console.log('promise 6')
	})
	.then(() => {
		console.log('promise 7')
	})

console.log('end')
/**
 * start
 * end
 * promise 6
 * promise 7
 * setInterval
 * setTimeout 1
 * promise 1
 * promise 2
 * promise 3
 * setInterval
 * setTimeout 2
 * promise 4
 * promise 5
 */


/** 复杂示例2 */
console.log('start')
setTimeout(function () {
	console.log('setTimeout1')
	new Promise(function (resolve) {
		console.log('promise1')
		resolve()
	}).then(function () {
		console.log('then1')
	})
}, 1)

setTimeout(function () {
	console.log('setTimeout2')
	new Promise(function (resolve) {
		console.log('promise2')
		resolve()
	}).then(function () {
		console.log('then2')
	})
}, 0)

new Promise(function (resolve) {
	console.log('promise31')
	for (let i = 0; i < 1000; i++) {
		i == 99 && resolve()
	}
	console.log('promise32')
	setTimeout(function () {
		console.log('setTimeout3')
		new Promise(function (resolve) {
			console.log('promise5')
			resolve()
		}).then(function () {
			console.log('then5')
		})
	}, 0)
}).then(function () {
	console.log('then31')
	setTimeout(function () {
		console.log('setTimeout4')
	}, 0)
	new Promise(function (resolve) {
		console.log('promise41')
		for (let i = 0; i < 1000; i++) {
			i == 99 && resolve()
		}
		console.log('promise42')
		setTimeout(function () {
			console.log('setTimeout5')
		}, 0)
	}).then(function () {
		console.log('then41')
	})
}).then(function () {
	console.log('then32')
})
console.log('end')

/**
 *  start
		promise31
		promise32
		end
		then31
		promise41
		promise42
		then41
		then32
		setTimeout1
		promise1
		then1
		setTImeout2
		promise2
		then2
		setTImeout3
		promise5
		then5
		setTimeout4
		setTimeout5
 */