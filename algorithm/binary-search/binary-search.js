/**
 * 查找元素在有序数组中的序号
 */
function binarySearch(list, target) { 
    let low = 0,
        high = list.length - 1

    while (low <= high) {
        const mid = Math.floor((high + low) / 2)
        const midItem = list[mid]
        if (target < midItem) {
            high = mid - 1
        } else if (target === midItem) {
            return mid
        } else {
            low = mid + 1
        }
    }
    return null
}