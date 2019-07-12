
function print(n) {
    setTimeout(() => {
        if (n === 0) {
            for (let i = 0; i < 100; i++) {
                console.log(i)
            }
        }
    }, Math.floor(Math.random() * 1000)) // 设定条件
}

function print1(n) {
    setTimeout(() => {
        console.log(n)
    }, 0, Math.floor(Math.random() * 1000)) // setTimeout第三个以后的参数都将传递给function作为参数
}

function print2(n) {
    setTimeout(
        (() => {
            console.log(n)
        })(),
        Math.floor(Math.random() * 1000) // 自执行,在node中无效(node中setTimeout的APi与浏览器不同)
    )
}

function print3(n) {
    setTimeout(() => {
        console.log(--i) // 使用全局i,倒序打印
    }, Math.floor(Math.random() * 1000))
}

function print4(n) {
    setTimeout(() => {
        setTimeout(() => {
            console.log(n)
        }, n * 1000)
    }, Math.floor(Math.random() * 1000)) // 新增一层延迟打印 ,就是慢了点儿
}

for (var i = 0; i < 100; i++) {
    print4(i)
}