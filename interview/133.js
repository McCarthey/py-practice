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

