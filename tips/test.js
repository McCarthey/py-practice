Function.prototype.myBind = function (context) {
  const fn = this
  const restArgs = [...arguments].slice(1)
  return function () {
    const args = [...restArgs, ...arguments]
    return fn.apply(context, args)
  }
}

Function.prototype.myCall = function (context) {
  const ctx = context || window
  ctx.fn = this
  const restArgs = [...arguments].slice(1)
  const result = ctx.fn(...restArgs)
  delete ctx.fn
  return result
}

function myCall(context, ...args) {
  const ctx = context || window
  ctx.fn = this
  const res = ctx.fn(...args)
  delete ctx.fn
  return res
}

function myApply(context, args) {
  const ctx = context || window
  ctx.fn = this
  const res = ctx.fn(...args)
  delete ctx.fn
  return res
}

function myBind(context, ...args) {
  const fn = this
  const restArgs = [...arguments].slice(1)
  return function () {
    return fn.apply(context, [...args, ...restArgs])
  }
}

Function.prototype.myApply = function (context) {
  const ctx = context || window
  ctx.fn = this
  const restArgs = [...arguments][1]
  const result = ctx.fn(...restArgs)
  delete ctx.fn
  return result
}

function myInstanceOf(left, right) {
  if (typeof left !== 'object' || typeof left !== 'function' || left === null)
    return false
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) {
      return false
    }
    if (proto === right.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}

/**
 * https://mp.weixin.qq.com/s/m3a6vjp8-c9a2EYj0cDMmg
 * https://juejin.cn/post/6844903470466629640
 * 注意：由于任务头不同，因此不同的任务需要放入不同的任务队列，
 * 比如区分setTimeout/setImmediate  process.nextTick 和 promise
 */

console.log('golb1')

setTimeout(function () {
  console.log('timeout1')
  process.nextTick(function () {
    console.log('timeout1_nextTick')
  })
  new Promise(function (resolve) {
    console.log('timeout1_promise')
    resolve()
  }).then(function () {
    console.log('timeout1_then')
  })
})

setImmediate(function () {
  console.log('immediate1')
  process.nextTick(function () {
    console.log('immediate1_nextTick')
  })
  new Promise(function (resolve) {
    console.log('immediate1_promise')
    resolve()
  }).then(function () {
    console.log('immediate1_then')
  })
})

process.nextTick(function () {
  console.log('glob1_nextTick')
})
new Promise(function (resolve) {
  console.log('glob1_promise')
  resolve()
}).then(function () {
  console.log('glob1_then')
})

setTimeout(function () {
  console.log('timeout2')
  process.nextTick(function () {
    console.log('timeout2_nextTick')
  })
  new Promise(function (resolve) {
    console.log('timeout2_promise')
    resolve()
  }).then(function () {
    console.log('timeout2_then')
  })
})

process.nextTick(function () {
  console.log('glob2_nextTick')
})
new Promise(function (resolve) {
  console.log('glob2_promise')
  resolve()
}).then(function () {
  console.log('glob2_then')
})

setImmediate(function () {
  console.log('immediate2')
  process.nextTick(function () {
    console.log('immediate2_nextTick')
  })
  new Promise(function (resolve) {
    console.log('immediate2_promise')
    resolve()
  }).then(function () {
    console.log('immediate2_then')
  })
})

function debounce(fn, wait) {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log(this, arguments)
      fn.apply(this, arguments)
      timer = null
    }, wait)
  }
}

function debounce(func, delay) {
  let timer
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
      timer = null
    }, delay)
  }
}

function debounceRightNow(func, wait = 500, immediate = true) {
  let timer, context, args

  // 延迟执行的函数
  const later = () =>
    setTimeout(() => {
      timer = null
      if (!immediate) {
        func.apply(context, args)
        context = null
        args = null
      }
    }, wait)

  return function (...params) {
    // 如果没有定时器，则设定
    if (!timer) {
      timer = later()
      // 如果立即执行，则调用函数
      // 否则缓存执行上下文 和 参数
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

function debounce2(func, wait = 300, immediate = true) {
  // let timer, args, context
  // const later = () =>
  //   setTimeout(() => {
  //     timer = null
  //     if (!immediate) {
  //       func.apply(context, args)
  //       args = null
  //       context = null
  //     }
  //   }, wait)

  // return function (...params) {
  //   if (!timer) {
  //     timer = later()
  //     if (immediate) {
  //       func.apply(this, params)
  //     } else {
  //       args = params
  //       context = this
  //     }
  //   } else {
  //     clearTimeout(timer)
  //     timer = later()
  //   }
  // }
  let timer, context, args

  const later = () =>
    setTimeout(() => {
      timer = null
      if (!immediate) {
        func.apply(context, args)
        context = null
        args = null
      }
    }, wait)

  return function (...params) {
    if (!timer) {
      timer = later()
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

function throttle(func, delay) {
  // let startTime = Date.now()
  // return function () {
  //   let context = this
  //   let currentTime = Date.now()
  //   if (currentTime - startTime >= delay) {
  //     func.apply(context, arguments)
  //     startTime = currentTime
  //   }
  // }
  let startTime = Date.now()
  return function (...params) {
    let currentTime = Date.now()
    if (currentTime - startTime >= delay) {
      func.apply(this, params)
      startTime = currentTime
    }
  }
}

function throttle(func, delay) {
  let flag = true
  return function () {
    if (!flag) return
    flag = false
    setTimeout(() => {
      func.apply(this, arguments)
      flag = true
    }, delay)
  }
}

function throttle(func, delay) {
  let startTime = Date.now()
  return function (...params) {
    let current = Date.now()
    if (current - startTime >= delay) {
      func.apply(this, params)
      startTime = current
    }
  }
}

// 问题 1
// 解析 URL 中的 queryString，返回一个对象 解析异常的 展示 ’‘
// 返回值示例：
// {
//   name: 'coder',
//   age: '20'.
//   callback: 'https://youzan.com?name=test',
//   list: [a, b],
//   json: {str: "abc", num: 123}, // json key 是固定
// }
const testURL =
  'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D'
function parseQueryString(url) {
  const result = {}
  let arr = url.split('?')[1].split('&')
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    const [name, value] = element.split('=')
    const decoded = decodeURIComponent(value)
    if (name.includes('[]')) {
      listName = name.split('[]')[0]
      if (result[listName]) {
        result[listName].push(decoded)
      } else {
        result[listName] = [decoded]
      }
    } else if (decoded.startsWith('{') && decoded.endsWith('}')) {
      try {
        const json = JSON.parse(decoded)
        result[name] = json
      } catch (error) {
        result[name] = decoded
      }
    } else {
      result[name] = decoded
    }
  }
  console.log(result)
  return result
}

console.log(parseQueryString(testURL))

/**
 * 问题 2
 * 将一个json数据的所有key从下划线改为驼峰
 *
 * @param {object | array} value 待处理对象或数组
 * @returns {object | array} 处理后的对象或数组
 */

function mapKeysToCamelCase(data) {
  const result = {}

  for (let key in data) {
    const value = data[key]
    let reg = /\d/
    if (Object.prototype.toString.call(data) === '[object Object]') {
      convert(data[key])
    } else {
    }
  }
  function convert(data) {
    key.replace(/_(\w)/, function () {
      return RegExp.$1.toUpperCase()
    })
  }
}
