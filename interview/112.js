// 转换对象
var entry = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}

// 要求转换成如下对象
var output = {
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

function nested(obj) {
    Object.keys(obj).map(k => {
        getNested(k)
    })

    return obj

    function getNested(key) {
        const idx = key.lastIndexOf('.')
        const value = obj[key]
        if (idx !== -1) {
            delete obj[key]
            const mainKey = key.substring(0, idx)
            const subKey = key.substring(idx + 1)
            if (obj[mainKey] === undefined) {
                obj[mainKey] = { [subKey]: value }
            } else {
                obj[mainKey][subKey] = value 
            }
            if(/\./.test(mainKey)) {
                getNested(mainKey)       
            }
        }
    }
}

nested(entry)