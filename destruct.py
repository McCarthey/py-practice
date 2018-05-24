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

# python星号表达式，类似于js中的运算展开符(...)
record = ('test', 24, '6', '8')
name, age, *lucky_number = record
print(name, age, lucky_number)
