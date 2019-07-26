
/**
    第 113 题：编程题，根据以下要求，写一个数组去重函数（蘑菇街）
    1.   如传入的数组元素为[123, "meili", "123", "mogu", 123]，则输出：[123, "meili", "123", "mogu"]
    2.   如传入的数组元素为[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，则输出：[123, [1, 2, 3], [1, "2", 3], "meili"]
    3.   如传入的数组元素为[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，则输出：[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]
 * 
 */

// 使用JSON.stringify的弊端就是属性顺序的问题，如{a:1, b:2} 和 {b:2, a:1}
function dedup(array) {
    const result = []
    const temp = []
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (typeof item !== 'object') {
            if (!temp.includes(item)) {
                temp.push(item)
                result.push(item)
            }
        } else {
            const itemJSON = JSON.stringify(item)
            if (!temp.includes(itemJSON)) {
                temp.push(itemJSON)
                result.push(item)
            }
        }
    }
    return result
}


// 不使用JSON.stringify版本: 低配版对象深层比较 
// 注意使用instanceof判断是否是对象时需要注意该对象是否是通过Object.create(null)得到的。
function isEqual(obj1, obj2) {
    const type1 = isObject(obj1)
    const type2 = isObject(obj2)
    if (!type1 || !type2) {
        return obj1 === obj2
    }

    if ((typeof obj1.length === 'undefined' && typeof obj2.length === 'number') || (typeof obj1.length === 'number' && typeof obj2.length === 'undefined')) {
        return false
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    }

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            const t1 = isObject(obj1[key])
            const t2 = isObject(obj2[key])
            if (t1 && t2) {
                const equal = isEqual(obj1[key], obj2[key])
                if (!equal) {
                    return equal
                }
            } else if (obj1[key] !== obj2[key]) {
                return false
            }
        }
    }
    return true
}

function isObject(val) {
    return val !== null && typeof val === 'object'
}

function dedup(array) {
    const result = []
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (typeof item !== 'object' && !result.includes(item)) {
            result.push(item)
        } else {
            for (let index = 0; index < result.length; index++) {
                const ele = result[index]
                if (!isEqual(ele, item)) {
                    if (index === result.length - 1) {
                        result.push(item)
                        break
                    }
                    continue
                } else {
                    break
                }
            }
        }
    }
    return result
}

