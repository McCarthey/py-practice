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
    for (let i = 0; i < queryArr.length; i++) {
        const queryItemArr = queryArr[i].split('=')
        res.query[`${queryItemArr[0]}`] = queryItemArr[1] ? queryItemArr[1] : ''
    }

    return res
}

function formatElective(url) {

    const urlRes = urlParser(url)
    const elective = urlRes.query.elective
    if (!elective) {
        urlRes.query.elective = []
    } else if (elective.includes(',')) {
        urlRes.query.elective = elective.split(',')
    } else {
        urlRes.query.elective = [elective]
    }
    return urlRes
}

// 浏览器自带函数
function getElective(url) {
    const searchParams = new URLSearchParams(url)
    const elective = searchParams.get('elective')
    if (elective) {
        return elective.split(',').filter(res => res)
    } else {
        return []
    }
}
