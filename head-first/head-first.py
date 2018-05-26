# open() BIF
# open() BIF会创建一个迭代器，使用readline()从文件向你的代码输入数据行，一次传入一行数据
test_file = open('test.txt')
# 数据处理
print(test_file.readline(), end='')
# seek()方法返回到文件起始位置。也可以使用tell()
test_file.seek(0)
print(test_file.readline(), end='')
test_file.close()
