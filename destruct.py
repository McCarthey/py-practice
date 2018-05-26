# 变量数目与需要结构的数据的数目必须相等 多或者少都会报错
p = (4, 5, 9)
x, y, z = p
# x, y = p (报错)
# x, y, z, a = p (报错)
print(x, y, z)

# 可以使用不用的变量名去占位，只要该变量名没在其他地方引用即可
s = 'hello'
x, y, _, _, _ = s
print(x, y)

# python星号表达式，类似于js中的运算展开符(...)，结构出来的变量是列表类型
record = ('test', 24, '6', '8')
name, age, *lucky_number = record
print(name, age, lucky_number)

*info, lucky_number = record
print(info, lucky_number)

# 利用星号表达式迭代元素为可变长元组的序列
records = [('foo', 1, 2), ('bar', 'hello'), ('foo', 3, 4)]


def do_foo(x, y):
    print('foo', x, y)


def do_bar(s):
    print('bar', s)


for tag, *args in records:
    if tag == 'foo':
        do_foo(*args)
    elif tag == 'bar':
        do_bar(*args)

# 利用星号表达式分割字符串
line = 'nobody:*:-2:-2:Unprivileged User:/var/empty:/usr/bin/false'
name, *_, homedir, sh = line.split(":")
print(name, homedir, sh)


