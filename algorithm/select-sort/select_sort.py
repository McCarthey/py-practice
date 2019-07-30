# 选择排序
def select_sort(list):
    result = []
    for i in range(len(list)):
        smallest_index = findSmallest(list)
        result.append(list.pop(smallest_index))
    return result

# 找到数组中的最小值辅助函数
def findSmallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < smallest:
            smallest = arr[i]
            smallest_index = i
    return smallest_index


print(select_sort([5,3,6,2,10]))