// 转换对象
var entry = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

// 要求转换成如下对象
var output = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}

function flatObj(obj, propKey = '', result = {}) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            let keyStr = `${propKey}${key}`
            if(Object.prototype.toString.call(obj[key]) === '[object Object]') {
                flatObj(obj[key], keyStr+'.', result)
            } else {
                result[keyStr] = obj[key]
            }
        }
    }
    return result
}

const res = flatObj(entry)
console.log(res)