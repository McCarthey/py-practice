// 将两个升序数组合并
// 双指针 将每次比较的较小值推入结果数组中
function combine(arr1,arr2){
    let count = arr1.length + arr2.length
    let p1 = 0, p2 = 0
    const result=[]
    for(let i = 0;i < count;i++) {
        if(arr1[p1] < arr2[p2]){
            if(p1 < arr1.length){
                result.push(arr1[p1])
                p1++
            }else{
                result.push(...arr2.slice(p2))
                break
            }
        }else{
            if(p2 < arr2.length){
                result.push(arr2[p2])
                p2++
            }else{
                 result.push(...arr1.slice(p1))
                 break
            }
        }
    }
    console.log(result,p1,p2)

}

combine([1,3,5,6,7,9,10],[2,4,7])
