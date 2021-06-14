/**
 * 如 url = 'http://www.domain.com/?user=anonymous&id=123&id=456.23&city=%E5%8C%97%E4%BA%AC&enabled'
 * 执行 parseParam(url) 后的结果为
 * { user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
  }
 */
function parseParam(url) {
    const paramsObj = {}
    const isNumber = /^-?\d+(\.\d+)?$/   // 判断是否是数
    const search = /(.+)\?(.+)/.exec(url)[2]   // 问号分割字符串，获取查询参数部分
    const searchArr = search.split('&')
    searchArr.forEach(e => {
        const keyAndVal = e.split('=')
        if (keyAndVal.length === 1) {
            paramsObj[keyAndVal[0]] = true
        } else {
            let value = decodeURIComponent(keyAndVal[1])
            value = isNumber.test(value) ? parseFloat(value) : value
            if (paramsObj.hasOwnProperty(keyAndVal[0])) {
                if (Array.isArray(paramsObj[keyAndVal[0]])) {
                    paramsObj[keyAndVal[0]] = [...paramsObj[keyAndVal[0]], value]
                } else {
                    paramsObj[keyAndVal[0]] = [paramsObj[keyAndVal[0]], value]
                }
            } else {
                paramsObj[keyAndVal[0]] = value
            }
        }
    });
    return paramsObj
}