function ArrayList() {
    var array = []
    this.insert = function (item) {
        array.push(item)
    }
    this.toString = function () {
        return array.join()
    }
    var swap = function (arr, j, k) {
        [arr[j], arr[k]] = [arr[k], arr[j]]
    }
    // 冒泡算法，性能最差
    this.bubbleSort = function () {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length - 1; j++) {
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1)
                }
            }
        }
    }
    // 改进后的冒泡算法: 已排序后的不进行比较
    this.modifyBubbleSort = function () {
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
    this.selectionSort = function () {
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
    this.insertionSort = function () {
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
    this.mergeSort = function () {
        var mergeSortRec = function (array) {
            var length = array.length
            if (length === 1) {
                return array
            }
            var mid = Math.floor(length / 2),
                left = array.slice(0, mid),
                right = array.slice(mid, length)

            return merge(mergeSortRec(left), mergeSortRec(right))
        }

        var merge = function (left, right) {
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

    /**
     * 快速排序: 分治算法，
     * 1. 从数组中选择中间一项作为主元
     * 2. 创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。移动左指针直到我们找到一个比主元大的元素，接着，移动右边指针直到找到一个比主元小的元素，然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后，这一步叫做划分操作。
     * 3. 算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的子数组）重复之前的两个步骤，直至数组已完全排序。
     * 
     * （注：主元的选择将影响算法的表现）
     */
    this.quickSort = function () {
        var quick = function (array, left, right) {
            var index
            if (array.length > 1) {
                index = partition(array, left, right)

                if (left < index - 1) {
                    quick(array, left, index - 1)
                }

                if (index < right) {
                    quick(array, index, right)
                }
            }
        }

        var partition = function (array, left, right) {
            var pivot = array[Math.floor((left + right) / 2)],
                i = left,
                j = right
            while (i <= j) {
                while (array[i] < pivot) {
                    i++
                }
                while (array[j] > pivot) {
                    j--
                }
                if (i <= j) {
                    swap(array, i, j)
                    i++
                    j--
                }
            }
            return i
        }

        quick(array, 0, array.length - 1)
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


    // 测试ES自带的sort方法
    (function testSort() {
        var array = []
        for (var i = 0; i < 100000; i++) {
            array.push(Math.round(Math.random() * 100000))
        }
        console.time('time')
        array.sort((a, b) => {
            return a - b // 如果小于0，a排在b之前; 等于0，a和b的相对位置不变；大于0，b排在a之前；
        })
        console.timeEnd('time')
    }())