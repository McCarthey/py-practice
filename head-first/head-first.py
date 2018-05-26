# open() BIF
# open() BIF会创建一个迭代器，使用readline()从文件向你的代码输入数据行，一次传入一行数据
test_file = open('test.txt')
# 数据处理
print(test_file.readline(), end='')
# seek()方法返回到文件起始位置。也可以使用tell()
test_file.seek(0)
# 开始循环遍历
print('-----------分割线，开始循环遍历--------------')
for line in test_file:
    # 多重赋值 split([sep[, maxsplit]]) maxsplit是可选参数，指定要分割的数量，默认是要到分隔符就会分割
    (role, line_spoken) = line.split(':',1)
    print(role, end='')
    print(' said:', end='')
    print(line_spoken, end='')

test_file.close()
