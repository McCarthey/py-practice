"use strict"
/**
 * 阶乘函数
 */
function factorial(n) {
  if (n === 1) return n
  return n * factorial(n - 1)
}

/**尾递归调用 */
function tailFactorial(n, r) {
  if (n === 1) return r
  return tailFactorial(n - 1, r * n)
}

/**尾递归直观版 */
function betterTailFactorial(n) {
  function tailFactorial(n, r) {
    if (n === 1) return r
    return tailFactorial(n - 1, r * n)
  }
  return tailFactorial(n, 1)
}

/**柯里化尾递归 */
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n)
  }
}

function innerTailFactorial(n, r) {
  if (n === 1) return r
  return innerTailFactorial(n - 1, n * r)
}

const curryingTailFactorial = currying(innerTailFactorial, 1)


/**ES6默认参数 */
function defaultParamTailFactorial(n, r = 1) {
  if (n === 1) return r
  return defaultParamTailFactorial(n - 1, n * r)
}