function ArrayList() {
    var array = []
    this.insert = function(item) {
        array.push(item)
    }
    this.toString = function() {
        return array.join()
    }
    var swap = function(arr, j, k) {
        [arr[j], arr[k]] = [arr[k], arr[j]]
    }
    // 冒泡算法，性能最差
    this.bubbleSort = function() {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length - 1; j++) {
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1)
                }
            }
        }
    }
    // 改进后的冒泡算法: 已排序后的不进行比较
    this.modifyBubbleSort = function() {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1)
                }
            }
        }
    }
    /**
     * 选择排序：找到数据结构中最小值并将其放在第一位，接着找第二小的值，放在第二位
     * 假定最小值索引值，然后遍历，更新最小值索引，如果最小值索引已更新，则交换原索引和新索引，即找到当前列表的最小值
     * 循环以上步骤（最后一次不必执行，因为列表中只有最后一项，必然已经排序）
     */
    this.selectionSort = function() {
        var indexMin
        for (var i = 0; i < array.length - 1; i++) {
            indexMin = i
            for (var j = i; j < array.length; j++) {
                if (array[indexMin] > array[j]) {
                    indexMin = j
                }
            }
            if (indexMin !== i) {
                swap(array, indexMin, i)
            }
        }
    }
    /**
     * 插入排序：每次排一个数组项，判断数组项应该插入的位置
     * 算法假定第一项已排序，从第二项开始，将每项的索引和值赋给两个临时变量
     * 如果前一项大于当前项的值，则将前一项的值赋给当前项，
     */
    this.insertionSort = function() {
        var j, temp
        for (var i = 1; i < array.length; i++) {
            j = i
            temp = array[i]
            while (j > 0 && array[j - 1] > temp) {
                array[j] = array[j - 1]
                j--
            }
            array[j] = temp
        }
    }
    /**
     * 归并排序：分治算法，将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并为较大的数组，直到最后只有一个排序完毕的大数组
     * 归并时候，采用双指针，每次比较都将两个数组中较小值推入结果中，一旦有一个数组遍历完，就把剩下的数组的元素依次推入结果中
     */
    this.mergeSort = function() {
        var mergeSortRec = function(array) {
            var length = array.length
            if (length === 1) {
                return array
            }
            var mid = Math.floor(length / 2),
                left = array.slice(0, mid),
                right = array.slice(mid, length)

            return merge(mergeSortRec(left), mergeSortRec(right))
        }

        var merge = function(left, right) {
            var result = [],
                il = 0,
                ir = 0

            while (il < left.length && ir < right.length) {
                if (left[il] < right[ir]) {
                    result.push(left[il++])
                } else {
                    result.push(right[ir++])
                }
            }
            
            while (il < left.length) {
                result.push(left[il++])
            }
            
            while (ir < right.length) {
                result.push(right[ir++])
            }
            
            return result
        }
        
        array = mergeSortRec(array)
    }
}

// 测试性能
function createNonSortedArray(size) {
    var array = new ArrayList()
    for (var i = 0; i < size; i++) {
        array.insert(Math.round(Math.random() * size))
    }
    return array;
}
var array = new createNonSortedArray(10000)
console.time('time')
array.selectionSort()
console.timeEnd('time')