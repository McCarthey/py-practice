/**
 * 接口：
 * TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
 */
interface Person {
    name: string
    age: number
}

let tom: Person = {
    name: 'Tom',
    age: 25,
} // 定义的变量的属性必须和接口一致，多一些、少一些都不可以

/**
 * 接口的可选属性:
 * 有时不希望完全匹配一个形状，即可以使用可选属性
 */
interface Police {
    car: boolean
    gun?: boolean
}

let bob: Police = {
    car: true,
}

/**
 * 接口的任意属性：
 */
interface Student {
    name: string
    age: number
    [propName: string]: any
}

let alice: Student = {
    name: 'Alice',
    age: 12,
    gender: 'female'
}

// 一旦定义了任意属性，那么确定属性和可选属性都必须是它的类型的在子集： 下面会报错

// interface Teacher {
//     name: string
//     age: number
//     [propName: string]: string 
// }

// let ryan: Teacher = {
//     name: 'Ryan',
//     age: 34,
//     gender: 'male'
// }

/**
 * 只读属性————该属性只能在创建时被赋值：
 */
interface Gun {
    readonly id: number
    name: string
    producer: string
}

let ak47: Gun = {
    id: 41,
    name: 'AK47',
    producer: 'RU'
}

// ak47.id = 43 // 不可修改只读属性，会报错

/**
 * ===============================================================
 */

/**
 * 联合类型：表示取值可以为多种类型的一种
 */
let myFavoriteNumber: string | number
myFavoriteNumber = 6
myFavoriteNumber = 'six'
// myFavoriteNumber = true // 类型不在联合类型定义中，报错

/** 
 * 当TS不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
*/
// function getLength(something: number | string) {
//     return something.length    // 报错！因为number类型不存在length属性
// }

function convertToString(something: number | string) {
    return something.toString() // 成功！因为number, string都有toString()方法
}

/**
 * ===============================================================
 */

/**
 * 函数类型
 */
let sum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
} // 注意此处箭头的含义： 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

/**
 * 用接口定义函数形状
 */
interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string): boolean {
    return source.includes(subString)
}

/**
 * 函数的可选参数
 * 需要注意：可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必须参数了
 */
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return `${firstName} ${lastName}`
    } else {
        return firstName
    }
}

let catdog = buildName('Cat', 'Dog')
let cat = buildName('Cat')

/**
 * 剩余参数
 * 注意： rest 参数只能是最后一个参数（和ES6中相同）
 */
// function push(array, ...items) {
//     items.forEach(item => {
//         array.push(item)
//     })
// }

// let a = []
// push(a, 1, 2, 3)

// 事实上,items是一个数组,所以我们可以用数组的类型来定义它：
function push(array: any[], ...items: any[]): void {
    items.forEach(item => {
        array.push(item)
    })
}

let a = []
push(a, 1, 2, 3)

/**
 * 重载: 重载允许一个函数接受不同数量或类型的参数时，做出不同的处理
 */
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('')
    }
}
// 上例中我们重复定义了多次函数reverse，前两次是函数定义，最后一次是函数实现


/** 
 * 声明语句: 当我们使用第三方库的时候，需要告诉ts编译器，库的全局变量是什么，例如jQuery
*/
declare var jQuery: (selector: string) => any;
jQuery('#foo')
// 上例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。
// 也可以使用let / const关键字声明，一般来说，全局变量都是禁止修改的常量，所以大部分都应该使用const 而不是let 或者 var


/**
 * 声明文件：通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件，例如：
 * // src/jQuery.d.ts
 * declare var jQuery: (selector: string) => any;
 * // 声明文件必需以 .d.ts 为后缀。
 * 除了声明全局变量之外，我们可以通过interface / type来声明一个全局类型，方便在其他文件中使用：
 * interface AjaxSettings {
 *  methods?: 'GET' || 'POST',
 *  data?: any;
 * }
 * declare namespace jQuery {
 *  function ajax(url: string, settings?: AjaxSettings): void
 * }
 */



