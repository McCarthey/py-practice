// 第 107 题：考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素 

// 解：使用洗牌算法
/**
1.生成一个0 - arr.length 的随机数
2.交换该随机数位置元素和数组的最后一个元素，并把该随机位置的元素放入结果数组
3.生成一个0 - arr.length - 1 的随机数
4.交换该随机数位置元素和数组的倒数第二个元素，并把该随机位置的元素放入结果数组
依次类推，直至取完所需的10k个元素
 */
const source = []
let i = 0
while (i < 10000) {
    source.push(i)
    i++
}

function shuffle(arr, size) {
    let result = []
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * (arr.length - i))
        const item = arr[randomIndex]
        result.push(item)
        arr[randomIndex] = arr[arr.length - 1 - i]
        arr[arr.length - 1 - i] = item
    }
    return result
}

shuffle(source, 100)
