/**
 * 剑指 Offer 10- I. 斐波那契数列
 * 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。
 *
 * 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 */
/**
 * @param {number} n
 * @return {number}
 */
// 超时
var fib = function (n) {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}

// 动态规划
function Fib(n) {
  if (n <= 1) return n
  let pre = 0
  let current = 1
  let result = 0
  for (let i = 1; i < n; i++) {
    result = (pre + current) % 1000000007
    pre = current
    current = result
  }
  return result
}
