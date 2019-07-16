## 名词解释

- Java SE: Standard Edition
- Java EE: Enterprise Edition
- Java ME: Micro Edition
- JDK: Java Development kit, 将 Java 源码编译成 Java 字节码, JDK 包含 JRE, 编译器, 调试器等开发工具
- JRE: Java Runtime Environment, 即运行 Java 字节码的虚拟机。

- 大小写敏感：Java 是大小写敏感的，这就意味着标识符 Hello 与 hello 是不同的。
- 类名：对于所有的类来说，类名的首字母应该大写。如果类名由若干单词组成，那么每个单词的首字母应该大写，例如 MyFirstJavaClass 。
- 方法名：所有的方法名都应该以小写字母开头。如果方法名含有若干单词，则后面的每个单词首字母大写。
- 源文件名：**源文件名必须和类名相同**。当保存文件的时候，你应该使用类名作为文件名保存（切记 Java 是大小写敏感的），文件名的后缀为 .java。（如果文件名和类名不相同则会导致编译错误）。
- 主方法入口：所有的 Java 程序由 public static void main(String []args) 方法开始执行。
- class 用于定义一个类，public 表示这个类是公开的，HelloWorld 是类名，大小写敏感
- 这里的 main 方法有一个参数，参数类型是 String[]，参数名是 args，public，static 用于修饰方法，表示其是一个公开的静态方法，void 是方法的返回类型，每行代码用；结束，但缩进不是必须的
- Java 规定，main 方法是程序的固定入口，Java 程序总是从 main 方法开始执行
- 注释和 js 中用法相同，只不过特殊的多行注释可以用于自动创建文档

## 如何执行 Java 程序

Java 源码本质上是一个文本文件，我们需要先用 javac 把 HelloWorld.java 编译成字节码文件 HelloWorld.class，然后，用 Java 命令执行这个字节码文件，因此流程为：

```bash
javac HelloWorld.java
```

此时不会有任何输出，当前目录下会产生一个 HelloWorld.class 文件。执行 HelloWorld.class:

```bash
java HelloWorld
```

注意此处给虚拟机传递的参数 HelloWorld 是我们定义的类名，虚拟机自动查找对应的 class 文件并执行.

当然，在 java 11 后新增的功能，是允许直接运行一个单文件源码

```bash
java HelloWorld.java
```

## 变量类型

### 基本数据类型

基本数据类型是 CPU 可以直接进行运算的类型,有以下几种:

- 整数类型: byte, short, int, long
- 浮点数类型: float, double
- 字符类型: char
- 布尔类型: boolean

不同数据类型占用的字节数不同,

- byte: 1(恰好是一个字节)
- short: 2
- int: 4
- long: 8
- float: 4
- double: 8
- char: 2

整形类型:

Java 只定义了带符号的整型,因此,最高位的 bit 表示符号位(0 正 1 负),根据各个类型占据的字节数可推算其能表示的最大范围:

- byte: 2^(8-1): -128 ~ 127
- short: 2^(16-1): -32768 ~ 32767
- int: 2^(32-1): -2147483648 ~ 2147483647
- long: 2^(64-1): -9223372036854775808‬ ~ 92233720368547758087

注意,同一个数的不同进制的表示是完全相同的,例如 15 = 0xf = 0b1111

浮点类型:

- float 类型,需要加上 f 后缀,可最大表示 3.4\*10^38,
- double 类型,可最大表示 1.79\*10^308

```java
float f1 = 3.14f;
float f2 = 3.14e38f;
double d = 1.79e308;
double d2 = -1.79e308;
double d3 = 4.9e-324;
```

布尔类型:

只有 true 和 false 两个值,布尔类型理论上只需要 1bit,但是通常 JVM 内部会把 boolean 表示为 4 字节整数

```java
boolean b1 = true;
boolean b2 = false;
boolean isGreater = 5 > 3; // true
int age = 12;
boolean isAdult = age >= 18; // false
```

字符类型:

Java 的 char 类型除了可以表示标准的 ASCII 外,还可以表示一个 Unicode 字符:

```java
public class Main {
    public static void main(String[] args) {
        char a = 'A';
        char zh = '中';
        System.out.println(a);
        System.out.println(zh);
    }
}
```

注意,**char 类型使用单引号', 且仅有一个字符, 要和使用双引号"的 String 类型区分开**

常量:

定义变量的时候,如果加上 final 修饰符,变量就成了常量:

```java
final double PI = 3.14; // 根据习惯,常量名通常全部大写
double r = 5.0;
double area = PI * r * r;
System.out.println(area);
```

var 关键字:

如果想省略变量类型，可以使用var关键字：
```java
var sb = new StringBuilder()
```
编译器会根据赋值语句自动推断出变量sb的类型是StringBuilder

变量的作用范围：

变量作用域是该变量所在的{}包含的语句块。

- 整数运算

整数的数值表示不但是精确的，而且整数运算永远是精确的，除法也一样。（**注：整数的除法对于除数为0时运行时将报错，但编译不会报错。**）

- 溢出

要特别注意，整数由于存在范围限制，如果计算结果超出了范围，就会产生溢出，而溢出不会出错，却会得到一个奇怪的结果：

```java
public class Main {
    public static void main(String[] args) {
        int x = 
    } 
}
```

- 自增/自减

n++, n--, ++n

- 位移运算


