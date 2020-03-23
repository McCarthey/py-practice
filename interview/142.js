/**
 * 对象数组去重
 * 输入:
 * [{a:1,b:2,c:3},{b:2,c:3,a:1},{d:2,c:2}]
 * 输出:
 * [{a:1,b:2,c:3},{d:2,c:2}]
 */
/**
 * 思路：将对象中的 key 按顺序排序后转成字符串，推进 set 中去重，再转回对象
 */
function unique(array) {
    const set = new Set()
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const keys = Object.keys(element).sort()
        const newElement = {}
        keys.forEach(k => {
            newElement[k] = element[k]
        })
        set.add(JSON.stringify(newElement))
    }

    return [...set].map(s => JSON.parse(s))
}