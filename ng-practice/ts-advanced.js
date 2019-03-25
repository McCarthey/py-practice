/**
 * ts进阶
 */
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
/**
 * 类：
 * TS中的类除了ES6中的用法外，还实现了ES7的部分提案：
 * - 实例属性
 * - 静态属性
 * -
 */
/**
 * 实例属性：
 * ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义：
 */
var Animal = /** @class */ (function () {
    function Animal() {
        this.name = 'Jack';
        // ...
    }
    return Animal;
}());
var aA = new Animal();
console.log(aA.name);
