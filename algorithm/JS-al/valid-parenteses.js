/**
 * 括号匹配问题
 * 给定字符串 s, 如果字符串是形如'()', '[]', '{}', '({})'闭合的、匹配的括号, 则为true，否则为false
 * 可以使用栈实现
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
	const map = {
		'(': -1,
		')': 1,
		'[': -2,
		']': 2,
		'{': -3,
		'}': 3
	}
	
	const stack = []
	for (let i = 0; i < s.length; i++) {
		if (map[s[i]] < 0) {
			stack.push(s[i])
		} else {
			if (map[s[i]] + map[stack.pop()] !== 0) {
				return false
			}
		}
	}
	
	if (stack.length > 0) return false
	return true
};

const result = isValid('[]')
console.log(result)