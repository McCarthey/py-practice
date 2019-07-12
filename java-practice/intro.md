## 名词解释
- Java SE: Standard Edition
- Java EE: Enterprise Edition
- Java ME: Micro Edition
- JDK: Java Development kit, 将Java源码编译成Java字节码, JDK包含JRE, 编译器, 调试器等开发工具
- JRE: Java Runtime Environment, 即运行Java字节码的虚拟机。

- 大小写敏感：Java 是大小写敏感的，这就意味着标识符 Hello 与 hello 是不同的。
- 类名：对于所有的类来说，类名的首字母应该大写。如果类名由若干单词组成，那么每个单词的首字母应该大写，例如 MyFirstJavaClass 。
- 方法名：所有的方法名都应该以小写字母开头。如果方法名含有若干单词，则后面的每个单词首字母大写。
- 源文件名：**源文件名必须和类名相同**。当保存文件的时候，你应该使用类名作为文件名保存（切记 Java 是大小写敏感的），文件名的后缀为 .java。（如果文件名和类名不相同则会导致编译错误）。
- 主方法入口：所有的 Java 程序由 public static void main(String []args) 方法开始执行。
- class用于定义一个类，public表示这个类是公开的，HelloWorld是类名，大小写敏感
- 这里的main方法有一个参数，参数类型是String[]，参数名是args，public，static用于修饰方法，表示其是一个公开的静态方法，void是方法的返回类型，每行代码用；结束，但缩进不是必须的
- Java规定，main方法是程序的固定入口，Java程序总是从main方法开始执行
- 注释和js中用法相同，只不过特殊的多行注释可以用于自动创建文档

## 如何执行Java程序

Java源码本质上是一个文本文件，我们需要先用javac把HelloWorld.java编译成字节码文件HelloWorld.class，然后，用Java命令执行这个字节码文件，因此流程为：

```bash
javac HelloWorld.java
```
此时不会有任何输出，当前目录下会产生一个HelloWorld.class文件。执行HelloWorld.class:

```bash
java HelloWorld
```
注意此处给虚拟机传递的参数HelloWorld是我们定义的类名，虚拟机自动查找对应的class文件并执行.

当然，在java 11后新增的功能，是允许直接运行一个单文件源码
```bash
java HelloWorld.java
```

## 变量类型

### 基本数据类型
基本数据类型是CPU可以直接进行运算的类型,有以下几种:
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

整形类型,Java只定义了带符号的整型,因此,最高位的bit表示符号位(0正1负),根据各个类型占据的字节数可推算其能表示的最大范围:
- byte: 2^(8-1): -128 ~ 127
- short: 2^(16-1): -32768 ~ 32767
- int: 2^(32-1): -2147483648 ~ 2147483647
- long: 2^(64-1): -9223372036854775808‬ ~ 92233720368547758087