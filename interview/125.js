/**
 * 第 125 题：如何将[{id: 1}, {id: 2, pId: 1}, ...] 的重复数组（有重复数据）转成树形结构的数组 [{id: 1, child: [{id: 2, pId: 1}]}, ...] （需要去重）
 */
function tree(arr) {
    const res = []
    const map = arr.reduce((res, item) => {
        res[item.id] = Object.assign({}, item)
        return res
    }, {})
    for (const item of Object.values(map)) {
        if (!item.pId) {
            res.push(item)
        } else {
            const parent = map[item.pId]
            parent.child = parent.child || []
            parent.child.push(item)
        }
    }
    return res
}

