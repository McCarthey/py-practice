/**
 * 有一堆扑克牌，将牌堆第一张放到桌子上，再将接下来的牌堆的第一张放到牌底，如此往复；

    最后桌子上的牌顺序为： (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；

    问：原来那堆牌的顺序，用函数实现。
 */

/**
 * 逆向恢复手中的牌
 * @param {*} 逆向序列 桌牌 arr 
 */
function recover(arr) {
    const res = []
    while (arr.length > 0) {
        if (res.length) {
            res.push(res.shift())
        }
        const item = arr.pop()
        res.push(item)
    }
    return res
}

/**
 * 正向生成桌上的牌
 * @param {*} 正向序列 手牌 arr 
 */
function positive(arr) {
    const res = []
    while (arr.length > 0) {
        const item = arr.pop()
        res.push(item)
        if (arr.length) {
            arr.unshift(arr.pop())
        }
    }
    return res
}
