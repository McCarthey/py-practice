# 正则

## 括号

参考 -> [正则表达式括号的作用](https://zhuanlan.zhihu.com/p/27355118)

括号在正则表达式中的作用：提供分组，便于引用

- 分组

  匹配连续出现的"ab"，需要使用/(ab)+/

  ```javascript
  var regex = /(ab)+/g;
  var string = "ababa abbb ababab";
  console.log(string.match(regex)); // ["abab", "ab", "ababab"]
  ```

- 分支结构

  在多选分支结构(p1|p2)中应用。

  ```javascript
  var regex = /^I love (JavaScript|Regular Expression)$/;
  console.log(regex.test("I love JavaScript")); // true
  console.log(regex.test("I love Regular Expression")); // true
  ```

- 引用分组

    可以进行数据提取、替换等操作

    - 提取数据：

        比如提取出年、月、日：

        ```javascript
        var regex = /(\d{4})-(\d{2})-(\d{2})/;
        var string = "2019-07-26";
        console.log(string.match(regex));
        //[ '2019-07-26','2019','07','26',index: 0, input: '2019-07-26', groups: undefined ]
        ```
        match返回的一个数组，第一个元素是整体匹配结果，然后是各个分组（即括号里）匹配的内容，然后是匹配下标，然后是输入的文本，最后是一个捕获组数组或undefined

    - 替换

        比如，想把yyyy-mm-dd格式，替换成mm/dd/yyyy：
        ```javascript
        var regex = /(\d{4})-(\d{2})-(\d${2})/
        var string = '2019-07-26'
        var result = string.replace(regex, "$2/$3/$1")
        // 等价于:
        var result = string.replace(regex, function(){
            return RegExp.$2 + '/' + RegExp.$3 + '/' + RegExp.$1
        })
        // 也等价于:
        var result = string.replace(regex, function(match, year, month, day){
            return month + '/' + day + '/' + year
        })
        ```
- 反向引用

    除了使用相应的API来引用分组，也可以在正则本身里引用分组。但只能引用之前出现的分组，即反向引用。    

    比如需要写一个正则支持匹配如下三种格式：
    > 2016-06-12
    > 
    > 2016/06/12
    > 
    > 2016.06.12

    如果用
    ```javascript
    var regex = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/
    ```
    虽然会满足要求，但同时也会匹配'2016-06/12'

    如果我们想要求分隔符前后一致，就需要使用反向引用：
    ```javascript
    var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/
    ```
