/**
    第 113 题：编程题，根据以下要求，写一个数组去重函数（蘑菇街）
    1.   如传入的数组元素为[123, "meili", "123", "mogu", 123]，则输出：[123, "meili", "123", "mogu"]
    2.   如传入的数组元素为[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，则输出：[123, [1, 2, 3], [1, "2", 3], "meili"]
    3.   如传入的数组元素为[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，则输出：[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]
 * 
 */
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
            if(!temp.includes(itemJSON)) {
                temp.push(itemJSON)
                result.push(item)
            }
        }
    }
    return result 
}




