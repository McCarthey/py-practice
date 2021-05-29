/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  if (nums.length === 0) return 0
  let start = 0
  let end = 0
  let sum = 0
  let result = nums.length + 1
  while (end < nums.length) {
    sum += nums[end]
    while (sum >= target) {
      result = Math.min(result, end - start + 1)
      sum = sum - nums[start]
      start++
    }
    end++
  }
  return result === nums.length + 1 ? 0 : result
}
// @lc code=end
