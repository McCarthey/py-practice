/**
 * LeetCode 53.最大子序和
 * 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值，要求时间复杂度为O(n)
 * 例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let pre = 0
  let maxAns = nums[0]
  nums.forEach((x) => {
    pre = Math.max(x, pre + x)
    maxAns = Math.max(maxAns, pre)
  })
  return maxAns
}

function findGreatestSumOfSubArray(nums) {
  if (Array.isArray(nums) && nums.length) {
    let sum = nums[0]
    let max = nums[0]
    for (let i = 1; i < nums.length; i++) {
      if (sum < 0) {
        sum = nums[i]
      } else {
        sum = sum + nums[i]
      }
      if (sum > max) {
        max = sum
      }
    }
    return max
  }
  return 0
}
