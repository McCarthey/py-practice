const posts = [
    { id: 1, upVotes: 2 },
    { id: 2, upVotes: 89 },
    { id: 3, upVotes: 1 }
]

const totalUpvotes = posts.reduce((totalUpvotes, currentPost) => {
    totalUpvotes + currentPost.upVotes, 0
})

console.log(totalUpvotes)


function factorial(num) {
    if (num < 1) {
        return 1
    } else {
        return num * factorial(num - 1)
    }
}

/* 
    可以使用arguments.callee，解决函数名紧耦合的问题 
    arguments.callee是一个指针，指向拥有这个arguments对象的函数
    但是可读性差，已不推荐使用
*/

function factorial(num) {
    if (num < 1) {
        return 1
    } else {
        return num * arguments.callee(num - 1)
    }
}

const trueFactorial = factorial

factorial = function() {
    return 0
}

trueFactorial(4)

/**
 * 函数对象的属性：calller。这个属性中保存着调用当前函数的函数的引用，如果在全局作用域中调用当前函数，它的值为null
 */
function outer() {
    inner()
}

function inner() {
    console.log(inner.caller) // 会打印inner的调用者--outer函数的源代码
    console.log(arguments.callee.caller) // 同上(严格模式无法使用caller,callee,arguments)
}

outer()


/**
 * 函数属性和方法
 * 函数的length表示函数希望接受的命名参数的个数
 */

function sayName(name) {
    console.log(name)
}

function sum(num1, num2) {
    return num1 + num2
}

function sayHi() {
    console.log('hi')
}

console.log(sayName.length, sum.length, sayHi.length)

/**
 * 每个函数都包含两个方法：apply()和call()
 * 这两个方法都是在特定的作用域中调用函数，实际上等同于设置函数体内this对象的值
 * apply接受参数数组,call参数需要明写出来
 */

function sum(num1, num2) {
    return num1 + num2
}

function callSum1(num1, num2) {
    return sum.apply(this, arguments)
}

function callSum2(num1, num2) {
    return sum.call(this, num1 ,num2)
}

console.log(callSum1(10, 10))
console.log(callSum2(10, 10))

 /**
  * 使用apply()和call()扩充函数运行的作用域,
  * 使用它们的最大好处就是对象不需要与方法有任何耦合关系
  */
window.color = 'red'
var o = {color: 'blue'}
function sayColor() {
    console.log(this.color)
}

sayColor()

sayColor.call(this)
sayColor.call(window)
sayColor.call(o)

/**
 * bind()方法。该方法会创建一个函数的实例,其this值会被绑定到传给bind()函数的值
 */
window.color = 'red'
var o = {color: 'blue'}
function sayColor() {
    console.log(this.color)
}

var objectSayColor = sayColor.bind(o)

objectSayColor()

/**
 * 函数的toLocaleString()、toString()和valueOf()方法均会返回函数代码
 */
sayColor.toString()
sayColor.toLocaleString()
sayColor.valueOf()