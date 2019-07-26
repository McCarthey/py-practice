// 第 114 题：编程题，找出字符串中连续出现最多的字符和个数（蘑菇街）

// 'abcaakjbb' => { 'a': 2, 'b': 2 }
// 'abbkejsbcccwqaa' => { 'c': 3 }

function continuous(str) {
    let result = {}
    const obj = {}
    let tempWord = ''
    for (let i = 0; i < str.length; i++) {
        const word = str[i];
        if (i === 0) {
            tempWord = word
        } else {
            const prevWord = str[i - 1]
            if (word === prevWord) {
                tempWord = tempWord + word
                obj[word] = tempWord.length
            } else {
                tempWord = word
            }
        }
    }
    let max = 0
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const num = obj[key];
            if (num > max) {
                max = num
                result = { [key]: num }
            } else if (num === max) {
                result[key] = num
            }
        }
    }
    return result
}

// O(n)

// 正则版
function regVersion(str) {
    const reg = /(\w)\1*/g
    const arr = str.match(reg)
    const max = Math.max(...arr.map(item => item.length))
    const result = arr.reduce((acc, cur) => {
        if(cur.length === max) {
            acc[cur[0]] = cur.length
        }
        return acc
    }, {})
    return result
}