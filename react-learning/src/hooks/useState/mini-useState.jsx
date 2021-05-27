

/**
 * update 是通过环状单向链表组合起来的，实际上调用的是 dispatchActin.bind(null, hook.queue)
 */
function dispatchAction(queue, action) {
  // 创建update
  const update = {
    // 更新执行的函数
    action,
    // 与同一个Hook的其他更新形成链表
    next: null
  }

  // 环状单向链表
  if (queue.pending === null) {
    update.next = update
  } else {
    update.next = queue.pending.next
    queue.pending.next = update
  }
  queue.pending = update

  // 模拟 React 开始调度更新
}

/**
 * 状态如何保存：我们知道，更新产生的update对象会保存在queue中
 * 不同与 ClassComponent 的实例可以存储数据，对于 FunctionComponent，queue 存储在哪里呢？
 * 答案是：FunctionComponent 对应的 Fiber 中
 */
const fiber = {
  // 保存该 FunctionComponent 对应的Hooks链表
  memoizedState: null,
  // 指向App函数
  stateNode: App
}

/**
 * Hook 数据结构
 * fiber.memoizedState 中保存的 Hook 的数据结构，
 * 可以看到，Hook 与 update 类似，都是通过链表链接，不过Hook是无环的单向链表
 * 
 * 注意：每个 useState 对应一个 hook 对象
 * 调用 const [num, updateNum] = useState(0) 时，
 * updateNum （即 dispatchAction）产生的 update 保存在 useState 对应的 hook.queue 中
 */
hook = {
  // 保存 update 的 queue，即上文介绍的 queue
  queue: {
    pending: null
  },
  // 保存 hook 对应的 state
  memoizedState: initialState,
  // 与下一个 Hook 链接形成单向无环链表
  next: null
}

/**
 * 模拟 React 调度更新流程
 * 我们用 isMount 变量指代是 mount 还是 update
 * 
 * 在组件 render 时，每当遇到下一个 useState，我们移动 workInProgressHook
 */
isMount = true

function schedule() {
  // 更新前将 workInProgressHook 重置为 fiber 保存的第一个 Hook
  workInProgressHook = fiber.memoizedState
  // 触发组件 render
  fiber.stateNode()
  // 组件首次 render 为 mount，以后再触发的更新为 update
  isMount = false
}

/**
 * 组件 render 时 useState 返回的 num 为更新后的结果 
 */
function useState(initialState) {
  // 当前 useState 使用的 hook 为被赋值给该变量
  let hook

  if (isMount) {
    // mount 时需要生成 hook 对象
    hook = {
      queue: {
        pending: null
      },
      memoizedState: initialState,
      next: null
    }

    // 将 hook 插入 fiber.memoizedState 链表末尾
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
    } else {
      workInProgressHook.next = hook
    }
    // 移动 workInProgressHook 指针
    workInProgressHook = hook
  } else {
    // update 时从 workInProgressHook 中取出该 useState 对应的hook
    // update 时找到对应 hook
    hook = workInProgressHook
    // 移动 workInProgressHook 指针
    workInProgressHook = workInProgressHook.next
  }

  // update 执行前的初始 state
  let baseState = hook.memoizedState

  if (hook.queue.pending) {
    // 根据 queue.pending 中保存的 update 更新 state
    // 获取 update 环状单向链表中第一个 update
    let firstUpdate = hook.queue.pending.next

    do {
      // 执行 update action
      const action = firstUpdate.action
      baseState = action(baseState)
      firstUpdate = firstUpdate.next

      // 最后一个 update 执行完后跳出循环
    } while (firstUpdate !== hook.queue.pending.next)

    // 清空 queue.pending
    hook.queue.pending = null
  }

  // 将 update action 执行完成后的 state 作为 memoizedState
  hook.memoizedState = baseState

  return [baseState, dispatchAction.bind(null, hook.queue)]
}

/**
 * 抽象一下 React 的事件触发方式
 */

function App() {
  const [num, updateNum] = useState(0)

  console.log(`${isMount ? 'mount' : 'update'} num：`, num)

  return {
    click() {
      updateNum(num => num + 1)
    }
  }
}

/**
 * 这个精简 useState 与 React Hooks 的区别
 * 1. React Hooks 没有使用 isMount 变量，而是在不同时机使用不同的 dispatcher，
 * 即 mount 时和 update 时的 useState 不是用一个函数。
 * 2. React Hooks 有中途跳过 更新 的优化手段
 * 3. React Hooks 有 batchUpdates，当在 click 中触发三次 updateNum，精简 useState 会触发三次，而 React 只会触发一次
 * 4. React Hooks 的 update 有 优先级 的概念，可以跳过不高优先的 update
 */