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

const tasks = [
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
const headers = tasks.filter(t => !t.runAfter)
console.log('[headers]: ', headers)
const result = []
if (headers.length === 1) {
  result.push({ name: headers[0].name, task: headers[0] })
}
console.log('[result]: ', result)
