/**
 * 给定一个包含 n 个整数的数组nums，判断 nums 中是否存在三个元素a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 *
 * 例如：
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 满足要求的三元组集合为：
 * [
 *  [-1, 0, 1],
 *  [-1, -1, 2]
 * ]
 */

/**思路：
 * 需要考虑去重，因此先将数组排序后遍历，
 * 取当前遍历数nums[i]为基准，遍历该数后面的数组成的数组
 * 头尾双指针，判断三数相加是否为0，如是，则加入结果，指针分别移动一位，
 * 如果相加结果 > 0， 则尾指针前移
 * 如果相加结果 < 0， 则头指针后移
 */

function threeSumZero(array) {
  const result = []
  array.sort((a, b) => a - b)
  for (let i = 0; i < array.length; i++) {
    if (i && array[i] === array[i - 1]) { continue } // 若基准和前面的相等，跳过该次循环
    let left = i + 1
    let right = array.length - 1
    while (left < right) {
      const sum = array[i] + array[left] + array[right]
      if (sum < 0) {
        left++
      } else if (sum > 0) {
        right--
      } else {
        result.push([array[i], array[left], array[right]])
        left++
        right--
        while (array[left] === array[left - 1]) {
          left++
        }
        while (array[right] === array[right + 1]) {
          right--
        }
      }
    }

  }
  return result
}