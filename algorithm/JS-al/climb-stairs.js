/**
 * leetcode No.70 爬楼梯
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 注意：给定 n 是一个正整数。
 */
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let pre2 = 0
  let pre1 = 0
  let sum = 1
  for (let i = 1; i <= n; i++) {
    pre2 = pre1
    pre1 = sum
    sum = pre1 + pre2
  }
  return sum
}
