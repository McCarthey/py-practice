/**
 * 输入一个正数S，打印出所有和为S的连续正数序列。
例如：输入15，有序1+2+3+4+5 = 4+5+6 = 7+8 = 15 所以打印出3个连续序列1-5，5-6和7-8。
 */
function continuousSequence(sum) {
    const result = []
    const windows = [1, 2]
    let start = 1
    let end = 2
    let currentSum = 3
    while (end < sum) {
        while (currentSum < sum && end < sum) {
            windows.push(++end)
            currentSum += end
        }
        while (currentSum > sum && start < end) {
            windows.shift()
            currentSum -= start++
        }
        if (currentSum === sum && windows.length > 1) {
            result.push(windows.slice())
            windows.push(++end)
            currentSum += end
        }
    }
    return result
}
