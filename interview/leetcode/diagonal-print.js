/* 给定一个二维数字，沿对角线（右上角）打印结果，如：
  [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
    [13,14,15,16]
  ]
  打印结果
  4
  3,8
  2,7,12
  1,6,11,16
  5,10,15
  9,14
  13
*/
// 以下解法仅适用于方阵：从右上角开始打印
function diagonalPrint(array) {
  const n = array.length
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < n - i; j++) {
      console.log(array[j][i + j])
    }
  }
  for (let i = 1; i <= n - 1; i++) {
    for (let j = 0; j < n - i; j++) {
      console.log(array[i + j][j])
    }
  }
}