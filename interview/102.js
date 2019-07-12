function cal7(int) {
   const result =  parseInt([int.toString(7), '0'].join(''), 7) 
   console.log(result)
   return result
}

cal7(3)

 // Number.toString()方法接受基数作为参数,转换成相应进制的字符串形式
 // 然后将末尾补0,即左移一位,将数放大[基数]倍
 // 组合成字符串后通过parseInt('string', [radix])将其作为[基数]转换成10进制