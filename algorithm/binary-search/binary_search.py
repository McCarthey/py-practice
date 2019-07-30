def binary_search(list, target):
    low = 0
    high = len(list) - 1

    while low < high:
        mid = (high + low) // 2 # ‘//’无论是否整除，返回的都是int
        guess = list[mid]
        if target < guess:
            high = mid - 1
        if target == guess:
            return mid
        else:
            low = mid + 1
    return None

print(binary_search([1,2,3,4,5,6,7,9,10,11], 5))