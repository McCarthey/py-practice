import React, { useMemo, useContext } from 'react'

function Tree() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme

  return <ExpensiveTree className={theme} />
}

/**
 * 由于AppContext中包含很多与theme无关的state，导致每次其他无关的state更新，
 * Tree 都会重新 render，进而 ExpensiveTree 组件也会重新 render
 */

/**
 * 使用 useMemo 优化 ExpensiveTree：
 * 将返回的 ExpensiveTree 作为 useMemo 返回值，theme 作为依赖项
 * 这样，即使 AppContext 改变导致 Tree 反复 render，ExpensiveTree 也只会在 theme 改变后 render
 */
function Tree() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme

  return useMemo(() => {
    return <ExpensiveTree className={theme} />
  }, [theme])
}

/**
 * 原理解析：
 * 1. useMemo 会将第一个参数（函数）的返回值保存在组件对应 fiber 中，只有依赖项（第二个参数）变化后，
 * 才会重新调用第一个参数（函数）计算一个新值
 * 2. 函数组件的返回值是JSX对象，同一个函数组件调用多次，返回的是多个 不同 的 JSX 对象（即使 props 未变，但 JSX 是新的引用）
 *
 * 以上 useMemo 用法实际上是在函数组件对应的 fiber 中缓存了一个完整的 JSX 对象
 */