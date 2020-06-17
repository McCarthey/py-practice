let tasks = [
  {
    "name": "t1",
    "taskRef": {
      "kind": "Task",
      "name": "persist-param"
    },
  },
  {
    "name": "t21",
    "runAfter": [
      "t1"
    ],
  },
  {
    "name": "t22",
    "runAfter": [
      "t1"
    ],
  },
  {
    "name": "t23",
    "runAfter": [
      "t1"
    ],
  },
  {
    "name": "t31",
    "runAfter": [
      "t21",
    ],
  },
  {
    "name": "t32",
    "runAfter": [
      "t22", "t23"
    ],
  },
  {
    "name": "t41",
    "runAfter": [
      "t31", "t32"
    ],
  }
]

/**
 *  如果task中不存在 id ，则先遍历 tasks 列表，为每个 task 增加一个 id ;
* 如果没有 runAfter 则为头节点、并行分支头节点中的一个，即头节点为一个无 prevId 的普通节点或一个分支节点：
  由于是嵌套结构，因此完全是由后面的节点来判断前一个节点是普通节点还是分支节点；
*/

/**
 * {
 *  id: 1,
 *  name: 't1',
 *  prevId: null,
 *  nextNode: {
 *    id: 2,
 *    prevId: 1,
 *    nextId: null,
 *    nextNode: {},
 *    branches: []
 *  },
 *  nextId: 2,
 *  branches: [],
 * }
 */

const result = {}
function convertTasksToFlow() {
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].id) {
      tasks[i].id = Math.random()
    }
    if (!Object.keys(result).length) { // 头节点逻辑
      if (headers.length === 1) { // 头节点是普通节点
        result = {
          id: headers[0].id,
          data: headers[0],
          nextId: null,
          prevId: null,
          nextNode: {},
          branches: [],
        }
      } else {
        // 头节点是分支节点
      }
    } else {

    }
  }
}

/**
 * 分步拆解
 */

const headers = []
const indexes = []

let obj = {}
if (headers.length === 1) {
  obj = { name: headers[0].name, task: headers }
} else {
  obj = { name: headers[0].name, parallel: headers.map(t => ({ name: t.name, task: [t] })) }
}


// result.push(obj)
// length += headers.length

// const p1 = tasks.filter(t => isArrayEqual(t.runAfter, headers.map(h => h.name)))
// const p2 = tasks.filter(t => isArrayEqual(t.runAfter, p1.map(p => p.name)))

/**
 * 归纳
 */

let tasks2 = [
  {
    "name": "starter",
    "params": [
      {
        "name": "message",
        "value": "$(params.message)"
      }
    ],
    "taskRef": {
      "kind": "Task",
      "name": "persist-param"
    },
    "workspaces": [
      {
        "name": "task-ws",
        "subPath": "init",
        "workspace": "ws"
      }
    ]
  },
  {
    "name": "upper",
    "params": [
      {
        "name": "input-path",
        "value": "init/message"
      }
    ],
    "runAfter": [
      "starter"
    ],
    "taskRef": {
      "kind": "Task",
      "name": "to-upper"
    },
    "workspaces": [
      {
        "name": "w",
        "workspace": "ws"
      }
    ]
  },
  {
    "name": "lower",
    "params": [
      {
        "name": "input-path",
        "value": "init/message"
      }
    ],
    "runAfter": [
      "starter"
    ],
    "taskRef": {
      "kind": "Task",
      "name": "to-lower"
    },
    "workspaces": [
      {
        "name": "w",
        "workspace": "ws"
      }
    ]
  },
  {
    "name": "reporter",
    "params": [
      {
        "name": "result-to-report",
        "value": "$(tasks.upper.results.message)"
      }
    ],
    "runAfter": [
      "upper"
    ],
    "taskRef": {
      "kind": "Task",
      "name": "result-reporter"
    }
  },
  {
    "name": "validator",
    "runAfter": [
      "reporter",
      "lower"
    ],
    "taskRef": {
      "kind": "Task",
      "name": "validator"
    },
    "workspaces": [
      {
        "name": "files",
        "workspace": "ws"
      }
    ]
  }
];

// TODO: 待修改，不满足并行task中存在串行的情况，即runAfter中不应该判断数组全等
function convert(tasks) {
  const result = []
  let length = 0
  function core(lastTasks) {
    let p = []
    if (!lastTasks.length) {
      p = tasks.filter(t => !t.runAfter)
    } else {
      p = tasks.filter(t => isArrayEqual(t.runAfter, lastTasks.map(t => t.name)))
    }

    if (!p.length) return []
    let obj = {}
    if (p.length === 1) {
      obj = { name: p[0].name, task: p }
    } else {
      obj = { name: p[0].name, parallel: p.map(t => ({ name: t.name, task: [t] })) }
    }
    result.push(obj)
    length += p.length
    if (length === tasks.length) {
      return result
    } else {
      core(p)
    }
  }
  core([])
  console.log('[result]', result)
}

// 判断两个数组中的元素是否完全相同，顺序可不同
function isArrayEqual(arr1 = [], arr2 = []) {
  let copy = JSON.parse(JSON.stringify(arr2))
  if (arr1.length === arr2.length) {
    for (let i = 0; i < arr1.length; i++) {
      const index = copy.indexOf(arr1[i])
      if (index > -1) {
        copy.splice(index, 1)
      } else {
        return false
      }
    }
    return true
  }
  return false
}

// 判断 数组A 是否是 数组B 的子集
function isArrayInclude(source = [], target = []) {
  source.every(i => target.includes(i))
}
