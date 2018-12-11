// 布尔
let isDone: boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
let personName: string = 'bob';
let age: number = 37;
let sentence: string = `Hello, my name is ${personName}.

I'll be ${ age + 1} years old next month.`;

// 数组
let list: number[] = [1, 2, 3];
// 数组泛型
let anotherList: Array<number> = [1, 2, 3];

// 元组：各元素的类型不必相同
let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello']; // Error
console.log(x[0].substr(1))
// console.log(x[1].substr(1)) // Error,'number' does not have 'substr'

x[2] = 'world'; // ok, 字符串可以赋值给(string | number)类型
console.log(x[1].toString()) // ok, 'string'和'number'都有toString方法
// x[6] = true; // Error, 布尔不是(string | number)类型 


// 枚举 enum
// enum 类型是对 JavaScript 标准数据类型的一个补充。像c#一样，使用枚举类型可以为一组数值赋予友好的名字。
// 默认情况下，从0开始为元素编号。也可以手动指定成员的数值。可以改成从 1 开始编号
enum Color { Red=1, Green, Blue }
let c: Color = Color.Green
console.log(c)