function trueTable(n, sentence) {
  console.log(`Q R S P Result\n`)
  for (let i = 0; i < 2 ** n; i++) {
    let raw = i.toString(2).split('')
    for (let j = raw.length; j < 4; j++) {
      raw.unshift('0') // 补零
    }
    let [Q, R, S, P] = raw.map((s) => Boolean(Number(s)))
    let result = Number()
    console.log(Number(Q), Number(R), Number(S), Number(P), result)
  }
}

function core(sentence) {
  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i]
    let stack = new Stack()
    if (char === '(') {
        stack.push()
    }
    if (char === ')') {
    }
  }
}

function Stack() {
  var items = []
  this.push = function (element) {
    items.push(element)
  }
  this.pop = function () {
    return items.pop()
  }
  this.peek = function () {
    return items[items.length - 1]
  }
  this.isEmpty = function () {
    return items.length === 0
  }
  this.size = function () {
    return items.length
  }
  this.clear = function () {
    items = []
  }
  this.print = function () {
    console.log(items.toString())
  }
}

trueTable(4, '(P && Q) || R === !S')
