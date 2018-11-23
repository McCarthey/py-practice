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
x = [10, 'hello']; // Error