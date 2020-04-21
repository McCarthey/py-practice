/**
 * LeetCode 53.最大子序和
 * 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值，要求时间复杂度为O(n)
 * 例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 官方解答
var maxSubArray = function (nums) {
  let pre = 0
  let maxAns = nums[0]
  nums.forEach((x) => {
    pre = Math.max(x, pre + x)
    maxAns = Math.max(maxAns, pre)
  })
  return maxAns
}

// 容易看懂的解答：如果当前和小于0，则抛弃，赋值为当前迭代的值；和大于0时，加和；
// 当当前和大于记录的最大和值时，最大值更新；
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

// 贪心法
var maxSubArray = function (nums) {
  let preSum = 0
  let curSum = nums[0]
  let maxSum = nums[0]
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    curSum = preSum + current
    maxSum = Math.max(maxSum, curSum)
    preSum = Math.max(curSum, 0)
  }
  return maxSum
};