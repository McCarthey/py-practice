/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let result = 0
  let rest
  let num
  while (x !== 0) {
    rest = ~~(x / 10) // 不可以使用Math.floor
    num = x % 10
    x = rest
    result = result * 10 + num
    if (result > Math.pow(2, 31) || result < -Math.pow(2, 31)) return 0
  }
  return result
}
/**
 * 不可以简单地使用 Math.floor，因为正数是向下取，负数则向上取了！负数需要使用 Math.ceil
 * 此处可以借助 双位运算符~~，替代正数的 Math.floor( )，替代负数的 Math.ceil( )。
 * 双否定位操作符的优势在于它执行相同的操作运行速度更快。
 */
// @lc code=end
