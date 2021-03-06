/**
 * 找到1 ~ n个连续整数中1出现的次数
 */
function howManyOnes(n) {
    if (n < 1) {
        return 0
    }
    if (n < 10) {
        return 1
    }
    const str = String(n)
    const rest = Number(str.slice(1))
    const power = 10 ** (str.length - 1)
    const head = Number(str.slice(0, 1))
    if (head === 1) {
        return howManyOnes(rest) + howManyOnes(power - 1) + rest + 1
    } else {
        return howManyOnes(rest) + power + howManyOnes(power - 1) * head
    }
}

/**
 * 不使用字符串slice操作，用取余，取商的方式获取数字
 */
function howManyOnesByNumber(n) {
    if (n < 1) {
        return 0
    }
    if (n < 10) {
        return 1
    }
    const length = String(n).length
    const rest = n % 10 ** (length - 1)
    const head = Math.floor(n / 10 ** (length - 1))
    const power = 10 ** (length - 1)
    if (head === 1) {
        return howManyOnes(rest) + howManyOnes(power - 1) + rest + 1
    } else {
        return howManyOnes(rest) + power + howManyOnes(power - 1) * head
    }
}

console.time('count');
console.log(howManyOnes(4925))
console.timeEnd('count');