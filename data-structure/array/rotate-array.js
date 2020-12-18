/**
 * Leetcode NO.189 旋转数组
 * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
 * 示例1：
 * 输入: [1,2,3,4,5,6,7] 和 k = 3
 * 输出: [5,6,7,1,2,3,4]
 *
 * 示例2：
 * 输入: [-1,-100,3,99] 和 k = 2
 * 输出: [3,99,-1,-100]
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**暴力算法：每次旋转/移动一个元素 */
var rotate = function (nums, k) {
    for (let step = 0; step < k; step++) {
        let prev = nums[nums.length - 1]
        for (let i = 0; i < nums.length; i++) {
            let temp = nums[i]
            nums[i] = prev
            prev = temp
        }
    }
}
