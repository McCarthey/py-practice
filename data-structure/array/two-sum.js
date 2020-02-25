/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * 示例：
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 */

/**
 * 思路：使用map保存已经遍历的数、索引，在map中找到则返回，否则添加至map
 */

function twoSum(array, target) {
  const map = {}
  for (let i = 0; i < array.length; i++) {
    if (map.hasOwnProperty(target - array[i])) { // 或者 map[target - array[i]] !== undefined
      return [map[target - array[i]], i]
    }
    map[array[i]] = i
  }
  return []
}

/**
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */