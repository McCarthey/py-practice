// 布尔
let isDone : boolean = false;

// 数字
let decLiteral : number = 6;
let hexLiteral : number = 0xf00d;
let binaryLiteral : number = 0b1010;
let octalLiteral : number = 0o744;

// 字符串
let personName : string = 'bob';
let age : number = 37;
let sentence : string = `Hello, my name is ${personName}.

I'll be ${age + 1} years old next month.`;

// 数组
let list : number[] = [1, 2, 3];
// 数组泛型
let anotherList : Array < number > = [1, 2, 3];

// 元组：各元素的类型不必相同
let x : [string, number];
x = ['hello', 10];
// x = [10, 'hello']; // Error
console.log(x[0].substr(1))
// console.log(x[1].substr(1)) // Error,'number' does not have 'substr' x[2] =
// 'world'; // ok, 字符串可以赋值给(string | number)类型
console.log(x[1].toString()) // ok, 'string'和'number'都有toString方法
// x[6] = true; // Error, 布尔不是(string | number)类型 枚举 enum enum 类型是对 JavaScript
// 标准数据类型的一个补充。像c#一样，使用枚举类型可以为一组数值赋予友好的名字。 默认情况下，从0开始为元素编号。也可以手动指定成员的数值。可以改成从 1
// 开始编号。也可以分别赋值
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4
}
let c : Color = Color.Blue
console.log(c)
// 枚举的好处是你可以由枚举的值得到它的名字。
let colorName : string = Color[4]

console.log(colorName)

// Any 当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：
let notSure : any = 4
notSure = "maybe a string instead"
notSure = false

let anyList : any[] = [1, true, "free"]
anyList[1] = 100

// Void 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
function warnUser() : void {
  console.log('This is my warning message');
}

let unusable : void = undefined // 声明一个void类型的变量没有什么作用，因为你只能给它赋值undefined和null

// Null 和 Undefined
let u : undefined = undefined
let n : null = null // 默认情况下null和undefined是所有类型的子类型。

// Never 表示的是你那些永不存在的值的类型。类型是任何类型的子类型。
function error(message : string) : never {throw new Error(message)}

function fail() {
  return error("Something failed")
}

function infiniteLoop() : never {
  while(true) {}
}

// Object 类型。object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
function create(o: object | null): void {
  console.log(o)
};

create({pop: 0})
create(null)

// create(42) // Error