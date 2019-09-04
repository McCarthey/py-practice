/** 求两个日期中间的有效日期
 * 如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】
 */
function getDates(startDate, endDate) {
    let startDateStamp = +new Date(startDate)
    const endDateStamp = +new Date(endDate)
    const DAY_MS = 86400000
    const result = []
    while(startDateStamp < endDateStamp) {
        const date = (new Date(startDateStamp).toLocaleDateString()).replace(/\//g,'-')
        result.push(date)
        startDateStamp += DAY_MS
    }
    return result
}
