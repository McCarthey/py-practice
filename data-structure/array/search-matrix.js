/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // 1. 暴力法
  //  for (let i = 0; i < matrix.length; i++) {
  //    const row = matrix[i];
  //    for (let j = 0; j < row.length; j++) {
  //      const num = row[j];
  //      if(num === target) return true
  //    }
  //  } 
  //  return false
  // 2. 线性指针移动法
  let row = 0
  let col = matrix[0].length - 1
  while (col >= 0 && row < matrix.length) {
    if (matrix[row][col] === target) return true
    if (matrix[row][col] > target) {
      col--
    } else {
      row++
    }
  }
  return false
};
// @lc code=end

