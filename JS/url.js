function urlParser(url) {
    const res = {
        originAndPath: '',
        query: {}
    }

    const isQuestionMark = url.split('?')
    const originAndPath = isQuestionMark.shift()
    res.originAndPath = originAndPath
    if (isQuestionMark.length < 1) {
        // 当没有?时，返回
        return res
    }
    const queryStr = isQuestionMark.join('?') // 第一个问号后的参数字符串
    const queryArr = queryStr.split('&')
    for(let i = 0; i < queryArr.length; i++) { 
        const queryItemArr = queryArr[i].split('=')
        res.query[`${queryItemArr[0]}`] = queryItemArr[1] ? queryItemArr[1] : ''
    }

    return res
}

new URLSearchParams(paramsString) // 浏览器自带的url查询参数解析函数
new URL(urlString) // 使用URL构造函数将url字符串转换为可以操作的url对象