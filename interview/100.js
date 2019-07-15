function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
}
Foo.prototype.a = function() {
    console.log(3)
}
Foo.a = function() {
    console.log(4)
}
Foo.a(); // 4 
let obj = new Foo(); // 将obj的[[prototype]]指向Foo, 
obj.a(); // 2 由于Foo函数内制定了this.a = function () {}, 因此a方法确实存在于obj对象上, 因此屏蔽了原型链上的a方法(3)
Foo.a(); // 1 由于Foo函数执行过了 因此Foo.a指向的函数也改变了, 变成了4

