/**
 * 用setTimeout实现setInterval
 */
function mySetInterval(func, ms) {
    const timer = setTimeout(() => {
        func()
        mySetInterval(func, ms)
        clearTimeout(timer)
    }, ms)
    return timer
}

/**
 * setTimeout VS setInterval
 */
// setInterval定时器的缺点: 某些间隔可能会被跳过；可能多个定时器会连续执行；（因为只有当队列中没有该定时器的其他实例时，才将定时器代码添加到实例中）。
// setTimeout实现定时器的好处：在一个定时器执行完前，不会向队列中插入新的定时器；保证定时器间隔；

