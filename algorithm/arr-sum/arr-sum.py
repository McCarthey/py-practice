def arr_sum(arr):
    if len(arr) == 0:
        return 0
    else:
        return arr[0] + arr_sum(arr[1:])
    
print(arr_sum([1,2,3,4]))
        