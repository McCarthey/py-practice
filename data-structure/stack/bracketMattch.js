/**
 * LeetCode No.20 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 === 1) return false
  const stack = []
  const brackets = new Map([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ])
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (brackets.has(ch)) {
      // 右括号，检查栈是否为空，或者栈顶元素是否是相匹配的左括号
      if (!stack.length || stack[stack.length - 1] !== brackets.get(ch)) {
        return false
      }
      stack.pop()
    } else {
      // 左括号入栈
      stack.push(ch)
    }
  }
  return !stack.length
}
