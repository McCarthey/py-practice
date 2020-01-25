/**
 * 给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],
 * 其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。不能使用除法。
 */

/**
 * 思路，构建矩阵，对角线的值为1，则B[i]即为每行的乘积，可以先计算下三角，再计算上三角
 * [
 *   [1, A1, A2, ..., An-2, An-1],  
 *   [A0, 1, A2, ..., An-2, An-1],  
 *   [A0, A1, 1, ..., An-2, An-1],  
 *   ...
 *   [A0, A1, A2, ..., 1, An-1],  
 *   [A0, A1, A2, ..., An-2, 1],  
 * ]
 */

function getMultiplyArray(array) {
  const result = []
  result[0] = 1
  for (let i = 1; i < array.length; i++) {
    result[i] = result[i - 1] * array[i - 1]
  }
  let upperMultiply = 1
  for (let i = array.length - 2; i >= 0; i--) {
    upperMultiply = upperMultiply * array[i + 1]
    result[i] = result[i] * upperMultiply
  }
  return result
}


function multiply(array) {
  const result = [];
  if (Array.isArray(array) && array.length > 0) {
    // 计算下三角
    result[0] = 1;
    for (let i = 1; i < array.length; i++) {
      result[i] = result[i - 1] * array[i - 1];
    }
    // 乘上三角
    let temp = 1;
    for (let i = array.length - 2; i >= 0; i--) { // 因最后一行已经得到正确结果，故从倒数第二行开始
      temp = temp * array[i + 1];
      result[i] = result[i] * temp;
    }
  }
  return result;
}