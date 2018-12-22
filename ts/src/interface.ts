/**
 * LabelledValue 接口就好比一个名字，用来描述上面例子里的要求。它代表了有一个 label 属性且类型为 string 的对象。
 */
interface LabelledValue {
    label: string
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label)
}

let myObj = {size: 10, label: 'Size 10 Object'}
printLabel(myObj)

/**
 * 可选属性：接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在。可选属性在应用"options bags"模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。
 */
interface SquareConfig {
    color?: string
    width?: number
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: 'white', area: 1000}
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}

let newSquare = createSquare({color: 'black'})
console.log(newSquare)

/**
 * 只读属性：一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用 readonly 来指定只读属性
 */
interface Point {
    readonly x: number
    readonly y: number
}

let p1: Point = {x: 10, y: 20}
// p1.x = 5 // error!

let arr: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = arr
// ro[0] = 12 // error!
// ro.push(5) // error!
// ro.length = 100 // error!
// a = ro // error!  c 
