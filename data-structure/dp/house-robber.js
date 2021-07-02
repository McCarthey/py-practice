/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 * https://leetcode-cn.com/problems/house-robber/
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
	const len = nums.length
	const dp = []
	dp[0] = nums[0]
	dp[1] = Math.max(nums[0], nums[1])
	for (let i = 2; i < len; i++) {
		dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
	}
	return dp[len - 1]
};
// @lc code=end

