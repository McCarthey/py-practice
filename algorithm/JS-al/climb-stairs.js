/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let prev = 0
  let current = 1
  let result = 1
  for (let i = 0; i < n; i++) {
    result = current + prev
    prev = current
    current = result
  }
  return result

};
// @lc code=end

