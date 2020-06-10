// 数据结构转换
const lsStages = [
  {
    "task": [
      {
        "id": "0.04544260961166002",
        "name": "",
        "steps": []
      }
    ],
    "name": "t1"
  },
  {
    "name": "default-0",
    "parallel": [
      {
        "task": [
          {
            "id": "0.2278022131175632",
            "name": "",
            "steps": []
          }
        ],
        "name": "t21"
      },
      {
        "task": [
          {
            "id": "0.8284162129597143",
            "name": "",
            "steps": []
          }
        ],
        "name": "t22"
      },
      {
        "task": [
          {
            "id": "0.408525882716652",
            "name": "",
            "steps": []
          }
        ],
        "isActive": true,
        "name": "t23"
      }
    ]
  },
  {
    "name": "default-2",
    "parallel": [
      {
        "task": [
          {
            "id": "0.8852757275511915",
            "name": "",
            "steps": []
          }
        ],
        "name": "t31"
      },
      {
        "task": [
          {
            "id": "0.9879143340018486",
            "name": "",
            "steps": []
          }
        ],
        "name": "t32"
      }
    ]
  }
]

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
      "t21", "t22", "t23"
    ],
  },
  {
    "name": "t32",
    "runAfter": [
      "t21", "t22", "t23"
    ],
  },
]

/**
* 如果没有 runAfter 则为头节点、并行头节点中的一个；
*/

/**
 * 分步拆解
 */
// const result = []
// let length = 0
// const headers = tasks.filter(t => !t.runAfter)
// let obj = {}
// if (headers.length === 1) {
//   obj = { name: headers[0].name, task: headers }
// } else {
//   obj = { name: headers[0].name, parallel: headers.map(t => ({ name: t.name, task: [t] })) }
// }
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