    
- 构造函数
    
    类实例是由一个特殊的类方法构造的，这个方法名通常和类名相同，被称为构造函数。这个方法的任务就是初始化实例需要的所有信息（状态）。执行new时实际上调用的就是构造函数。构造函数会返回一个对象（也就是类的一个实例）。类构造函数属于类，而且通常和类同名。ES6中可以通过在子类的构造函数中调用super()来直接调用父类的构造函数。
	
- 混入
	
	在继承或者实例化时，JS的对象机制并不会自动执行复制行为。因为JS中只有对象，并不存在可以被实例化的“类”，一个对象并不会被复制到其他对象，他们会被关联起来。为了模拟其他语言中的复制行为，JS开发者提出了混入这一方法，分为显式混入和隐式混入

- [[prototype]]
	
	JavaScript中的对象有一个特殊的[[prototype]]内置属性，实就是对于其他对象的引用。几乎所有的对象在创建时[[Prototype]]属性都会被赋予一个非空的值。对于默认的[[Get]]操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的[[Prototype]]链：
	```javascript
	var anotherObj = {
		a: 2
	}
	// 创建一个关联到anotherObj的对象：Object.create会创建一个对象并把这个对象的[[prototype]]关联到指定的对象
	var myObj = Object.create(anotherObj)
	
	myObj.a // 2
	```
	使用for..in和in操作符检查属性在对象中是否存在时,会向上遍历对象的[[prototype]]链
	
- .prototype对象
	```javascript
	function Foo() {
		// ...
	}
	
	var a = new Foo()
	Object.getPrototypeOf(a) === Foo.prototype; // true
	Foo.prototype.constructor === Foo; // true
	a.constructor === Foo; // true
	```
	这里的Foo.prototype对象是在调用new Foo时创建的，最后被关联到这个Foo.prototype对象上。即a内部的[[prototype]]关联的是Foo.prototype指向的那个对象
	
- 模仿类
	```javascript
	function Foo(name) {
		this.name = name
	}
	
	Foo.prototype.myName = function() {
		return this.name
	}
	
	var a = new Foo('a')
	var b = new Foo ('b')
	
	a.myName()
	b.myName()
	```
	以上代码展示了两种模拟类的技巧：
	1. this.name = name给每个由new Foo()调用生成的对象都添加了name属性
	2. Foo.prototype.myName = ...给Foo.prototype对象添加了一个属性。由于上文提到的在调用new Foo()时，a内部的[[prototype]]关联到了Foo.prototype上，因此当调用a.myName()时，虽然a对象本身不存在myName函数，但是通过委托，在它的上层[[prototype]]链上，即Foo.prototype上存在myName。