/**
 * 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，
 * 如果有多对数字的和等于S，输出两个数的乘积最小的。
 */

// 思路：增序数组中寻找乘积最小的两个数，即要在接近首尾选择（高中不等式知识）

// mine
function findTwoWithSum(array, sum) {
  let start = 0
  let end = array.length - 1
  while (array[start] + array[end] !== sum) {
    while (array[start] + array[end] > sum) {
      end--
    }
    while (array[start] + array[end] < sum) {
      start++
    }
  }
  if (start !== end) {
    return [array[start], array[end]]
  }
}

// answer
function FindNumbersWithSum(array, sum) {
  if (array && array.length > 0) {
    let left = 0
    let right = array.length - 1
    while (left < right) {
      const s = array[left] + array[right]
      if (s < sum) {
        left++
      } else if (s > sum) {
        right--
      } else {
        return [array[left], array[right]]
      }
    }
  }
  return []
}