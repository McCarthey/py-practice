/**
 * 写一个函数，完成以下功能
 * 输入
 * 1,2,3,5,7,8,10
 * 输出
 * 1~3,5,7~8,10
 */
function group(string) {
    const arr = string.split(',')
    const result = []
    let lastIndex = 0
    for (let i = 0; i < arr.length; i++) {
        const cur = arr[i];
        const next = arr[i + 1];
        if (next && next - cur === 1) {
            continue;
        } else {
            if (lastIndex === i) {
                result.push(arr[lastIndex])
            } else {
                result.push(`${arr[lastIndex]}~${arr[i]}`)
            }
            lastIndex = i + 1
        }
    }
    return result.join(',')
}