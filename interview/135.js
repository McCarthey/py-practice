/**
 * 在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。
 * 例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。
 */
function sortBalls(balls) {
    const yellowArr = []
    const redArr = []
    const blueArr = []
    balls.split('').forEach(ball => {
        switch (ball) {
            case '黄':
                yellowArr.push(ball)
                break
            case '红':
                redArr.push(ball)
                break
            case '蓝':
                blueArr.push(ball)
                break
        }
    });
    return yellowArr.concat(redArr).concat(blueArr).join('')
}

/** 善于使用sort/map  */
function sortBalls2(balls) {
    const map = {
        '黄': 0,
        '红': 1,
        '蓝': 2
    }
    return balls.split('').sort((a,b) => map[a] - map[b]).join('')
}