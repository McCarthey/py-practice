/**
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，
 * 使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分
 */

/**
 * 思路：首尾双指针移动，找到奇偶，且首指针索引小于尾指针索引时，交换；依次执行，直到首尾指针相遇
 */
function oddEven(array) {
  if (Array.isArray(array)) {
    let start = 0
    let end = array.length - 1
    while (start < end) {
      while (array[start] % 2 === 1) {
        start++
      }
      while (array[end] % 2 === 0) {
        end--
      }
      if (start < end) {
        [array[start], array[end]] = [array[end], array[start]]
      }
    }
  }
}

/**
 * 随机生成正整数数组
 */
function generateNumbers(n, range = 10000) {
  const result = []
  while (result.length < n) {
    result.push(Math.floor(Math.random() * range))
  }
  return result
}

/**
 * TODO: 若要保证相对顺序不变，则两个指针都从首部开始
 */
