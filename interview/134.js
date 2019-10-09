/** 求两个日期中间的有效日期
 * 如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】
 */
function getDates(startDate, endDate) {
    let startDateStamp = +new Date(startDate) // 可以使用 Date.parse(startDate) 完成日期的解析
    const endDateStamp = +new Date(endDate) // 可以使用 Date.parse(endDate) 完成日期的解析
    const DAY_MS = 86400000
    const result = []
    while(startDateStamp <= endDateStamp) {
        const date = (new Date(startDateStamp).toLocaleDateString()).replace(/\//g,'-')
        result.push(date)
        startDateStamp += DAY_MS
    }
    return result
}

/* Date.prototype.toLocaleString()方法支持locales和options参数，能指定使用哪种语言的格式化规则
参见MDN https://beta.developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
*/