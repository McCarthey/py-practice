# open() BIF
# open() BIF会创建一个迭代器，使用readline()从文件向你的代码输入数据行，一次传入一行数据
# import os
# 检查是否存在测试用的文件
# os.path.exists('test.txt')
from nester import print_lol
try:
    test_file = open('test.txt', encoding='utf8')
    # 数据处理
    print(test_file.readline(), end='')
    # seek()方法返回到文件起始位置。也可以使用tell()
    test_file.seek(0)
    # 开始循环遍历
    man = []
    other = []
    print('-----------分割线，开始循环遍历--------------')
    for line in test_file:
        # 多重赋值 split([sep[, maxsplit]]) maxsplit是可选参数，指定要分割的数量，默认是要到分隔符就会分割
        # 注意：这里和Javascript的split()方法的
        # 不使用额外的判断语句 使用try/except机制捕获错误，这种异常处理机制可以关注代码真正需要做什么，而不必担心问题出在哪里
        # if not line.find(":") == -1:
        try:
            (role, line_spoken) = line.split(':', 1)
            # strip()方法可以去除字符串首位空白符
            line_spoken = line_spoken.strip()
            if role == 'Man':
                man.append(line_spoken)
            elif role == 'Other Man':
                other.append(line_spoken)
        # 可以指定运行时的错误类型
        except ValueError:
            print('发生错误了')
            pass

    test_file.close()
# 可以指定运行时的错误类型
except IOError:
    print('test.txt is missing!')

# open() BIF打开磁盘文件时候，默认是读模式（r）,可以指定写模式（w）
# 如果要写一个文件，但该文件不存在，则会自动创建，然后进行写操作
try:
    with open('man_data.txt', 'w', encoding="utf8") as man_out:
        print_lol(man, out_file=man_out)
        print(man)
    with open('other.txt', 'w', encoding="utf8") as other_out:
        print_lol(other, out_file=other_out)
        print(other)
    # print() BIF可以将指定的变量数据保存到指定的文件对象(加上file=file_object)
    # 如果在文件关闭前发生了IOError，则文件始终不会被关闭！会导致数据被破坏
    print('file write success!')
except IOError as err:
    print('file error: ' + str(err))

try:
    data = open('missing.txt')
    print(data.readline(), end='')
except IOError as err:
    print('file error: ' + str(err))
finally:
    # locals() BIF会返回当前作用域中定义的所有名的一个集合
    if 'data' in locals():
        # 需要检查data是否存在，否则会报错
        data.close()


# 杂事儿
'''两个width:50%的行内元素（inline-block）并排放置，中间会有间隙（这个间隙来自你的标记中行内元素间的空白），因此第二个元素会换到下一行
   要删除这个间隙，需要在HTML中通过注释删除空白（右）
   例如：
   <div class="half">50% wide</div><!-- --><div class="half">50% wide</div>
   或者删除两元素间的空白即可
'''
# 杂事儿
''' - 善用Array.prototype.every 和 filter 会节省很多代码
    - vue中computed属性中默认只设置了getter函数，我们还可以添加setter函数
    
    - 以下样式可以在webkit浏览器中模拟macOS中的滚动条样式:
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #c1c1c1;
        border-radius: 4px;
    }  
    
    - 最近DOM API 中的 Element.scrollIntoView() 可以通过传入配置对象来实现平滑滚动（不再需要jQuery了）：
    elem.scrollIntoView({
        behavior: 'smooth'
    });
    有一个全新的 CSS 属性（仍在工作草案中），可以用简单的一行代码改变整个页面滚动的行为:
    html {
        scroll-behavior: smooth;
    }
    
    - position: sticky; 粘性定位 需要指定top,bottom,left,right之一才可以实现粘性效果
    - 利用css shape-outside 可以让内联元素以不规则的形状进行外部排列（可以实现刘海屏的适配）
      且元素必须是浮动元素，以下是绕开刘海屏的实现
    .shape {
        float: left;
        shape-outside: polygon(0 0, 0 150px, 16px 154px, 30px 166px, 30px 314px, 16px 326px, 0 330px, 0 0);
    }
'''
