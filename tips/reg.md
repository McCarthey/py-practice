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

    match 返回的一个数组，第一个元素是整体匹配结果，然后是各个分组（即括号里）匹配的内容，然后是匹配下标，然后是输入的文本，最后是一个捕获组数组或 undefined

  - 替换

    比如，想把 yyyy-mm-dd 格式，替换成 mm/dd/yyyy：

    ```javascript
    var regex = /(\d{4})-(\d{2})-(\d${2})/;
    var string = "2019-07-26";
    var result = string.replace(regex, "$2/$3/$1");
    // 等价于:
    var result = string.replace(regex, function() {
      return RegExp.$2 + "/" + RegExp.$3 + "/" + RegExp.$1;
    });
    // 也等价于:
    var result = string.replace(regex, function(match, year, month, day) {
      return month + "/" + day + "/" + year;
    });
    ```

- 反向引用

  除了使用相应的 API 来引用分组，也可以在正则本身里引用分组。但只能引用之前出现的分组，即反向引用。

  比如需要写一个正则支持匹配如下三种格式：

  > 2016-06-12
  >
  > 2016/06/12
  >
  > 2016.06.12

  如果用

  ```javascript
  var regex = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
  ```

  虽然会满足要求，但同时也会匹配'2016-06/12'

  如果我们想要求分隔符前后一致，就需要使用反向引用：

  ```javascript
  var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
  ```

  里面的\1，表示的引用之前的那个分组(-|\/|\.)。不管它匹配到什么，\1 都匹配那个同样的具体的字符。\2，\3 同理，分别指代第二个和第三个分组。

  - 括号嵌套怎么办？

    仔细研究：

    ```javascript
    var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
    var string = "1571571577";
    ```

  - \10 表示什么

    \10 表示第 10 个分组

  - 引用不存在的分组会怎样？

    我们在正则里引用了不存在的分组时，正则不会报错，只是匹配反向引用的字符本身:

    ```javascript
    var regex = /\1\2\3\4\5\6\7\8\9/;
    regex.test("\1\2\3\4\5\6\789");
    ```

  - 连字符转成驼峰式：

    ```javascript
    const target = "action-sheet";
    let result = target.replace(/-(\w)/g, ($, $1) => {
      return $1.toUpperCase();
    });
    console.log(result); // "actionSheet"
    ```

- 非捕获分组

  上面出现的分组都会捕获它们匹配到的数据，以便后续引用，因此也称他们是捕获型分组。

  如果只想要括号最原始的功能而不引用它，此时可以使用非捕获分组(?:p)，例如：

  ```javascript
  var regex = /(?:ab)+/g;
  var string = "ababa abbb ababab";
  ```

- 后行断言(?<=y)x

  匹配 x 仅当 x 前面是 y 时。例如可以匹配 restful 风格路由中的资源名称，如下即是匹配 cluster/后面的 clustername：

  ```javascript
  const reg = /(?<=\/cluster\/)[\w-]+/; // ES2018引入，目前只有chrome支持
  const path = "/groups/354/cluster/kubernetes-admin/projects/demo/overview";
  const clustername = path.match(reg)[0];
  ```

- 正则表达式 test() 方法

  - 如果正则表达式设置了全局标志 g，test() 的执行会改变正则表达式的 lastIndex 属性。连续的执行 test()方法，后续的执行将会从 lastIndex 处开始匹配字符串，(exec() 同样改变正则本身的 lastIndex 属性值).
