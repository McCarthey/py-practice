public class HelloWorld {
    public static void main(String[] args) {
        int n = 100; // 定义int类型变量x,并赋初始值100. 如果不写初始值,则默认值为0
        System.out.println("n = " + n);
        n = 200; // 变量可重新赋值
        System.out.println("n = " + n);

        int x = n; // 将n赋值给变量x
        System.out.println("x = " + x);
        x = x + 100;
        System.out.println("x = " + x);
        System.out.println("n = " + n);

        int i3 = 2_000_000_000; // 加下划线更容易识别
        System.out.println(i3);

        char a = 'A';
        // char zh = '中';
        System.out.println(a);
        // System.out.println(zh);

        final double PI = 3.14; // 根据习惯,常量名通常全部大写
        double r = 5.0;
        double area = PI * r * r;
        System.out.println(area);

        int nx = 2147483640;
        int ny = 15;
        int sum = nx + ny;
        System.out.println(sum); // -2147483641 换算成二进制后相加，结果进1导致最高位变成1,即变为负数。因此应使用long类型以表示范围更广的整数

        int t = 7;
        int t2 = t << 3;
        System.out.println(t2 - t); // 位移求整数的七倍 
    }
}

// class用于定义一个类，public表示这个类是公开的，HelloWorld是类名，大小写敏感
// 这里的main方法有一个参数，参数类型是String[]，参数名是args，public，static用于修饰方法，表示其是一个公开的静态方法，void是方法的返回类型，每行代码用；结束，但缩进不是必须的
// Java规定，main方法是程序的固定入口，Java程序总是从main方法开始执行
