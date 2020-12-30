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

Function.prototype.myApply = function (context) {
  const ctx = context || window
  ctx.fn = this
  const restArgs = [...arguments][1]
  const result = ctx.fn(...restArgs)
  delete ctx.fn
  return result
}

function myInstanceOf(left, right) {
  if (typeof left !== 'object' || typeof left !== 'function' || left === null) return false
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

console.log('golb1');

setTimeout(function () {
  console.log('timeout1');
  process.nextTick(function () {
    console.log('timeout1_nextTick');
  })
  new Promise(function (resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function () {
    console.log('timeout1_then')
  })
})

setImmediate(function () {
  console.log('immediate1');
  process.nextTick(function () {
    console.log('immediate1_nextTick');
  })
  new Promise(function (resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function () {
    console.log('immediate1_then')
  })
})

process.nextTick(function () {
  console.log('glob1_nextTick');
})
new Promise(function (resolve) {
  console.log('glob1_promise');
  resolve();
}).then(function () {
  console.log('glob1_then')
})

setTimeout(function () {
  console.log('timeout2');
  process.nextTick(function () {
    console.log('timeout2_nextTick');
  })
  new Promise(function (resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function () {
    console.log('timeout2_then')
  })
})

process.nextTick(function () {
  console.log('glob2_nextTick');
})
new Promise(function (resolve) {
  console.log('glob2_promise');
  resolve();
}).then(function () {
  console.log('glob2_then')
})

setImmediate(function () {
  console.log('immediate2');
  process.nextTick(function () {
    console.log('immediate2_nextTick');
  })
  new Promise(function (resolve) {
    console.log('immediate2_promise');
    resolve();
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

function debounceRightNow(func, wait = 500, immediate = true) {
  let timer, context, args

  // 延迟执行的函数
  const later = () => setTimeout(() => {
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
  let timer, args, context
  const later = () => setTimeout(() => {
    timer = null
    if (!immediate) {
      func.apply(context, args)
      args = null
      context = null
    }
  }, wait)

  return function (...params) {
    if (!timer) {
      timer = later()
      if (immediate) {
        func.apply(this, params)
      } else {
        args = params
        context = this
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}


// 生意参谋 流量看板 自动点击脚本，兼容低速网络
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time * 1000)
  })
}

async function autoClick() {
  const tabContainer = document.querySelector('.summary-main-index-tab')
  if (!tabContainer) return false
  const tabs = tabContainer.childNodes
  const dataContainer = document.querySelector('#overviewBoardSummaryIndexesTrend')
  await sleep(3)
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].click()
    await isDomExist(dataContainer, '.alife-one-design-sycm-indexes-trend-index-content-container')
    const subTabsContainer = dataContainer.querySelector('.alife-one-design-sycm-indexes-trend-index-content-container')
    await isDomExist(subTabsContainer, '.alife-one-design-sycm-indexes-trend-index-item-multiple-line-selectable', true)
    const subTabs = subTabsContainer.querySelectorAll('.alife-one-design-sycm-indexes-trend-index-item-multiple-line-selectable')
    for (let j = 0; j < subTabs.length; j++) {
      subTabs[j].click()
      await sleep(1)
    }
  }
}


async function isDomExist(target, selector, list = false) {
  return new Promise((resolve) => {
    let timer = null
    const max = 60
    let count = 0
    timer = setInterval(() => {
      const dom = list ? target.querySelector(selector) : target.querySelectorAll(selector)
      if (count >= max) {
        clearInterval(timer)
        resolve()
      }
      if ('length' in dom) {
        if (dom.length !== 0) {
          clearInterval(timer)
          resolve()
        } else {
          count++
        }
      } else if (dom) {
        clearInterval(timer)
        resolve()
      } else {
        count++
      }
    }, 500)
  })
}

const targetNode = document.querySelector('.ebase-ModernFrame__main')

const config = { childList: true, subtree: true };

const callback = async function (mutationsList, observer) {
  const tabContainer = document.querySelector('.summary-main-index-tab')
  if (!tabContainer) return false
  console.log('[start auto click in 2s]')
  observer.disconnect()
  console.log('[disconnect observer]')
  await sleep(2)
  autoClick()
}

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);