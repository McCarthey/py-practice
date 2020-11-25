/**
 * 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 * 例如输入一个长度为9的数组[1,2,3,2,2,2,5,4,2]。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
 */
/**
 * 解法1：额外开辟一个存储空间，时间复杂度O(n)
 */
function moreThanHalf(array) {
  const map = {}
  const halfLength = array.length / 2
  for (let i = 0; i < array.length; i++) {
    if (map[array[i]]) {
      map[array[i]]++
    } else {
      map[array[i]] = 1
    }
    if (map[array[i]] > halfLength) return array[i]
  }
  return 0
}

/**
 * 解法2：
 * 目标数字的个数比其他所有数字的个数加起来都多，因此可以记录每次遍历值，和上一次的比较，如果相同，则统计+1，不同则-1
 * 统计为0时，更换成新值，统计从1开始计
 * 最后得到的值再进行检验，合格则输出
 */
function moreThanHalf2(array) {
  let target = array[0]
  let count = 1
  for (let i = 1; i < array.length; i++) {
    if (array[i] === target) {
      count++
    } else {
      count--
    }
    if (count === 0) {
      target = array[i]
      count = 1
    }
  }
  count = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      count++
    }
  }
  return count > array.length / 2 ? target : 0
}