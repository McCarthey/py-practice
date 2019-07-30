- 逻辑结构
    - 集合结构
    - 线性结构
    - 树形结构
    - 图形结构
- 物理结构(存储结构)
    - 顺序存储结构：

        是把数据元素存放在地址连续的存储单元里，其数据间的逻辑关系和物理关系是一致的。

        如数组，但是对于经常变化修改的数据，不适合使用数组存储

    - 链式存储结构

        是把数据元素存放在任意的存储单元里，这组存储单元可以是连续的，也可以是不连续的。数据元素的存储关系并不能反映其逻辑关系，因此需要用一个**指针**存放数据元素的地址，这样通过地址就可以找到相关联数据元素的位置。
- 数据类型

    是指一组性质相同的值的集合及定义在此集合上的一些操作的总称。

    C语言中，按照取值的不同，数据类型可以分为两类：

    原子类型：是不可以再分解的基本类型，包括整型、实型、字符型等。

    结构类型：由若干个类型组合而成，是可以再分解的。例如，整型数组是由若干整型数据组成的。



- 算法

    算法是解决特定问题求解步骤的描述，在计算机中表现为指令的有限序列，并且每条指令表示一个或多个操作。

- 算法的特性：
    - 输入
    - 输出
    - 有穷性
    - 确定性
    - 可行性

    算法设计的要求：正确性，可读性，健壮性，高效率，低存储量

- 算法效率的度量方法

    - 渐进增长： 输入规模n在没有限制的情况下，只要超过一个数值N，这个函数就总是大于另一个函数，我们称函数是渐近增长的。即，给定一个两个函数f(n)和g(n)，如果存在一个整数N，使得对于所有的n>N，f(n)总是大于g(n)，那么f(n)的增长渐进快于g(n)。同使，随着n的增大，后面的常数项是不影响最终的算法变化的，所以可以忽略这些假发常数。甚至可以忽略掉与最高次项相乘的常数。**综上，判断算法效率时，只需要关注最高阶项的阶数即可**

    - 算法时间复杂度：

        语句总的执行次数T(n)是关于问题规模n的函数，进而分析T(n)随n的变化情况并确定T(n)的数量级。算法的时间复杂度也是就是算法的时间量度，记作：T(n)=O(f(n))，表示随问题规模n的增大，算法执行时间的增长率和f(n)的增长率相同，称作算法的渐进时间复杂度，简称时间复杂度。

        - 推导大O阶方法

            1. 用常数1取代运行时间中的所有加法常数
            2. 在修改后的运行次数函数中，只保留最高阶项
            3. 如果最高阶项存在且不是1，则去除与这个项相乘的常数
        
        - 常数阶

            无论常数是多少，都记作O(1)。对于分支结构而言，无论真假，执行的次数是恒定的，不会随着n的变化而发生变化，因此时间复杂度也是O(1)。

        - 线性阶

            关键在于分析循环结构的运行情况。记为O(n)

        - 对数阶

            ```C
            int count = 1;
            while(count < n)
            {
                count = count * 2
            }
            ```
            由于每次count乘2之后，就距离n更近了一步。因此，2^x=n，求出x=log2n。所以这个循环的时间复杂度为O(logn)
        
        - 平方阶

            嵌套循环
            ```C
            int i, j;
            for(i = 0; i < n; i++)
            {
                for(j = i; j < n; j++)
                {}
            }
            ```
            需要循环次数n + (n-1) + (n-2) + ... + 2 + 1 = (n + 1) * n / 2。
            用推导大O阶的方法，没有加法常数不予考虑 -> 只保留最高阶项n ^ 2 / 2 -> 去除这个项相乘的常数1/2，最终这段代码时间复杂度为O(n^2)

        - 常用的时间复杂度耗时大小：

            O(1)<O(logn)<O(n)<O(nlogn)<O(n2)<O(n3)<O(2n)<O(n!)<O(nn)

- 线性表(List)

    零个或多个数据元素的有限序列。第一个元素无前驱，最后一个元素无后继，其他每个元素都有且只有一个前驱和后继。线性表元素的个数n(n >= 0)定义为线性表的长度，当n=0时，成为空表。

    - 线性表的顺序存储结构

        用一段地址连续的存储单元依次存储线性表的数据元素。

        数组长度与线性表长度：

        > **数组长度**指存放线性表的存储空间的长度，存储分配后这个量一般不变。
        **线性表长度**是线性表中数据元素的个数，随着线性表插入和删除操作的进行，这个量是变化的。因此线性表的长度应该小于等于数组的长度。


        - 地址计算方法

            加上占用的是c个存储单元，那个线性表中第i+1个数据元素的存储位置和第i个数据元素的存储位置满足下列关系：
            > Loc(ai+1)=Loc(ai)+c

            所以对于第i个数据元素ai的存储位置可以由a1推算得出：
            > Loc(ai)=Loc(a1)+(i-1)*c
        
        - 操作

            存取：可以随时算出线性表中任意位置的地址，不管是第几个，都是相同的时间，因此时间复杂度为O(1)。通常把具有这一特点的存储结构称为随机存储结构。

            插入与删除：插入/删除操作需要移动插入/删除位置后面的元素，平均移动次数需要(n-1)/2，因此时间复杂度为O(n)。

        - 线性表顺序存储结构的优缺点

            优点：
            - 无需为表示表中元素之间的逻辑关系而增加额外的存储空间
            - 可以快速地存取表中任意位置的元素

            缺点:
            - 插入和删除操作需要移动大量元素
            - 当线性表长度变化较大时，难以确定存储空间的容量
            - 造成存储空间的“碎片”

    - 线性表的链式存储结构      

        - 操作：

            读取：需要从头节点开始遍历，指针不断向后移动，找到节点后返回数据。因此时间复杂度是O(n)。由于单链表结构中没有定义表长，所以不能事先知道循环多少次，因此也就不方便使用for循环。主要核心思想是“工作指针后移”。

            插入：s->next = p->next; p->next = s; 将待插入的节点的后继结点指针指向原后继结点，然后将原节点的后继结点指针指向待插入节点；（**注意：不可调换顺序**）。时间复杂度O(n)。

            删除：p->next = p->next->next; 即绕过p的后继结点，将p的后继结点改为p的后继的后继结点。（**注意：C中需要手动释放被删除的结点内存**）。时间复杂度O(n)。

        - 整表创建

            创建单链表的过程就是一个动态生成链表的过程，即从“空表”的初始状态起，依次建立各元素节点，并逐个插入链表。
    
    - 单链表结构与顺序存储结构优缺点

        |                |存储分配方式      |时间性能            |空间性能     
        -----------------|-----------------|-------------------|-------------
        顺序存储|顺序存储结构用一段连续的存储单元一次存储线性表的数据元素|查找O(1) 插入/删除O(n)|需要预分配存储空间，大了浪费，小了发生上溢
        单链表|单链表采用链式存储结构，用一组任意的存储单元存放线性表的元素|查找O(n) 插入/删除O(1)|不需要分配存储空间，只要有就可以分配，元素个数不受限制

    - 结论

        - 若线性表需要频繁查找，很少进行插入和删除操作，宜采用顺序存储结构。若需要频繁插入和删除时，宜采用单链表结构。
        - 当线性表中的元素个数变化较大或者根本不知道有多大时，最好用单链表结构，这样可以不需要考虑存储空间的大小问题。

- 循环链表

    将单链表中终端结点的指针端由空指针改为指向头结点，就使整个单链表形成了一个环，这种头尾相接的单链表称为单循环链表，简称循环链表。

    循环链表和单链表的主要差异就在于循环的判断条件上，原来是判断p->next是否为空，现在则是p->next不等于头结点，则循环未结束。

