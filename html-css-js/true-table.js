function trueTable() {
  console.log(`Q R S P Result\n`)
  for (let i = 0; i < 2 ** 4; i++) {
    let raw = i.toString(2).split('')
    for (let j = raw.length; j < 4; j++) {
      raw.unshift('0') // 补零
    }
    let [Q, R, S, P] = raw.map((s) => Boolean(Number(s)))
    let result = Number((P && Q) || R === !S)
    console.log(Number(Q), Number(R), Number(S), Number(P), result)
  }
}

trueTable()
