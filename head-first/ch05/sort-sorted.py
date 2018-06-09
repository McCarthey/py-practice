# sort()会改变原来的数组（排序）
# sorted()会复制一个新数组，进行排序，例如：
data = [2, 3, 6, 1, 5, 4]
data.sort()
print('原数组改变', data)

data2 = [2, 3, 6, 1, 5, 4]
data3 = sorted(data2)
print('原数组是：', data2)
print('排序后的数组是：', data3)
