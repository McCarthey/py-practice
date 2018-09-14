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
}

// 测试
var array = new ArrayList()
array.insert(3)
array.insert(8)
array.insert(1)
array.insert(9)
array.insert(0)
array.insert(5)