# open() BIF
# open() BIF会创建一个迭代器，使用readline()从文件向你的代码输入数据行，一次传入一行数据
# import os
# 检查是否存在测试用的文件
# os.path.exists('test.txt')
try:
    test_file = open('test.txt')
    # 数据处理
    print(test_file.readline(), end='')
    # seek()方法返回到文件起始位置。也可以使用tell()
    test_file.seek(0)
    # 开始循环遍历
    print('-----------分割线，开始循环遍历--------------')
    for line in test_file:
        # 多重赋值 split([sep[, maxsplit]]) maxsplit是可选参数，指定要分割的数量，默认是要到分隔符就会分割
        # 注意：这里和Javascript的split()方法的
        # 不使用额外的判断语句 使用try/except机制捕获错误，这种异常处理机制可以关注代码真正需要做什么，而不必担心问题出在哪里
        # if not line.find(":") == -1:
        try:
            (role, line_spoken) = line.split(':', 1)
            print(role, end='')
            print(' said:', end='')
            print(line_spoken, end='')
        # 可以指定运行时的错误类型 
        except ValueError:
            print('发生错误了')
            pass

    test_file.close()
# 可以指定运行时的错误类型 
except IOError:
    print('test.txt is missing!')
