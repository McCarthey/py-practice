/**
 * 有一堆扑克牌，将牌堆第一张放到桌子上，再将接下来的牌堆的第一张放到牌底，如此往复；

    最后桌子上的牌顺序为： (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；

    问：原来那堆牌的顺序，用函数实现。
 */
function sort(arr) {
    const res = []
    let mid = Math.floor(arr.length / 2)
    res.push(arr[mid])
    if (arr.length % 2 === 1) {
        for (let j = 1; j <= mid; j++) {
            res.push(arr[mid + j])
            res.push(arr[mid - j])
        }
    } else {
        for (let j = 1; j < mid; j++) {
            res.push(arr[mid - j])
            arr[mid + j] && res.push(arr[mid + j])
        }
    }
    return res
}

// 7, 8, 6, 9, 5, 10, 4, 11, 3, 12, 2, 13, 1  -> 1   13, 7, 8, 6, 9, 5, 10, 4, 11, 3, 12, 2 => 1,2  12, 13, 7, 8, 6, 9, 5, 10, 4, 11, 3 => ... 1,2,3,...,13
// 1,2,3,4,5 -> 5   4,1,2,3
// 4,1,2,3 -> 5,3  2,4,1
// 2,4,1 -> 5,3,1 4,2
// 4,2 -> 5,3,1,2,4

// a0 ,a1, a2, a3, a4 => a4,a2,a0,a1,a3    mid = 2
// a0 ,a1, a2, a3, a4, a5 => a5   a4,a0,a1,a2,a3 => a5, a3   a2,a4,a0,a1 ... =>  a5, a3, a1, a0, a2, a4   mid = 3

