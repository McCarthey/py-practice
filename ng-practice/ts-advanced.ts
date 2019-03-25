
/**
 * ts进阶
 */

/**
 * 类型别名:可以创建类别，常用于联合类型。
 */
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n
    } else {
        return n()
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
class Animal {
    name = 'Jack'

    constructor() {
        // ...
    }
}

let aA = new Animal()
console.log(aA.name)

/**
 * 静态方法：
 * ES7 提案中，可以使用 static 定义一个静态方法（不会被实例继承，直接由类来调用，但是可以被子类继承）:
 */
class Foo {
    static bar() {
        this.baz()
    }
    static baz() {
        console.log('hello')
    }

    bar() {
        console.log('world')
    }
}

Foo.bar() // 'hello', 静态方法可以和非静态方法重名

class Bar extends Foo {}
Bar.bar() // 'hello' 静态方法可以被子类继承，也可以通过super.classMethod()在子类上调用

/**
 * 实例属性：
 * 之前是通过在构造函数中的this.XXX定义，现在可以直接定义在class的顶部：
 */
class Dog {
    name = 'Jack';

    constructor() {
        // ...
    }
}

let dog = new Dog();
console.log(dog.name); // Jack   

/**
 * 静态属性：
 * 静态属性指的是class本身的属性，而不是实例上的属性（js中目前是提案，ts中已经实现）
 */
class MyClass {
    static myStaticProp = 42

    constructor() {
        console.log(MyClass.myStaticProp)
    }
} 