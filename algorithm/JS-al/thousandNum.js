/**
 * 将数转化成千分形式（en-US），结果均为字符串
 */
// 省事儿版
function toThousandsEasy(num) {
	return num.toLocaleString('en-US')
}
// 普通版
function toThousands(num) {
    let result = []
    let arr = num.toString().split('').reverse()
    // 判断是否是小数 是的话把小数部分直接存入结果数组 并截取数组
    let dotIndex = arr.indexOf('.')
    if (dotIndex !== -1) {
        result = arr.slice(0, dotIndex + 1)
        arr = arr.slice(dotIndex + 1)
    }
    for (let i = 0; i < arr.length; i++) {
        if (i % 3 === 0 && i !== 0) {
            result.push(',')
        }
        result.push(arr[i])
    }
    let res = result.reverse().join('')
    console.log(res)
    return res
}
// 正则版本
/**
 * 正向肯定查找x(?=y)：匹配'x'仅仅当'x'后面跟着'y'. 
 * 正向否定查找x(?!y)：匹配'x'仅仅当'x'后面不跟着'y'. 
 */
function toThousandsReg(num) {
	let numStr = String(num)
	return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}