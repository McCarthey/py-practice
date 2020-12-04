/**
 * 剑指offer No.50 第一个只出现一次的字符
 * 
 * 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。
 * 
 * 例如：
 * s = "abaccdeff"
 * 返回 "b"
 * s = "" 
 * 返回 " "
 */

/** 遍历字符串，判断字符第一次和最后一次出现的位置是否相同 
 * 时间复杂度O(n^2)：遍历 + indexOf
*/
function firstNotRepeatingChar(str) {
  if (!str) return ' '
  for (let index = 0; index < str.length; index++) {
    const char = str[index]
    const firstIndex = str.indexOf(char)
    const lastIndex = str.lastIndexOf(char)
    if (firstIndex === lastIndex) {
      return char
    }
  }
  return ' '
}

/**
 * 巧用Set数据结构 + 正则
 */
function firstNotRepeatingCharWithReg(s) {
  if (!s) return ' '
  for (let c of new Set(s)) {
    if (s.match(new RegExp(c, 'g')).length === 1) {
      return c
    }
  }
  return ' '
}

/**
 * 来自剑指offer的更普适用的解法 TODO:
 */
function firstNotRepeatingCharWithHashMap(s) {
  // 运用charCodeAt 和 fromCharCode
  let container = new Array(256).fill(-1)
  for (let i = 0; i < s.length; i++) {
    const code = s[i].charCodeAt()
    if (container[code] === -1) {
      container[code] = i
    } else if (container[code] >= 0) {
      container[code] = -2
    }
  }
  const strIndex = container.findIndex(r => r >= 0)
  return String.fromCharCode(strIndex)
}
