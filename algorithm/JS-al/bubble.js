function ArrayList() {
    var array = []
    this.insert = function(item) {
        array.push(item)
    }
    this.toString = function() {
        return array.join()
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
}

function swap(arr, j, k) {
    ;[arr[j], arr[k]] = [arr[k], arr[j]]
}

// 测试
var array = new ArrayList()
array.insert(3)
array.insert(8)
array.insert(1)
array.insert(9)
array.insert(0)
array.insert(5)
