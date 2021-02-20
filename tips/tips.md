- 判断 div 是否滚动到底部

  ```javascript
  // 用于判断div是否滚动到底部
  if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    console.log("已经滚动到底");
  }
  ```

- 页面滚动

  - window.scrollBy(x-coord, y-coord): 在窗口中按指定的偏移量滚动文档
  - window.scrollBy(options): options 是一个包含三个属性的对象：top, left, behavior(可选'smooth', 'instant')
  - Element.scrollHeight 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。
  - Element.clientHeight 只读属性，对于没有定义 CSS 或者内联布局盒子的元素为 0，否则，它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距。

* 行内元素空隙

  两个 width:50%的行内元素（inline-block）并排放置，中间会有间隙（这个间隙来自你的标记中行内元素间的空白），因此第二个元素会换到下一行
  要删除这个间隙，需要在 HTML 中通过注释删除空白（右）
  例如：

  ```html
  <div class="half">50% wide</div>
  <!-- -->
  <div class="half">50% wide</div>
  ```

- 善用 Array.prototype.every 和 filter 会节省很多代码
- vue 中 computed 属性中默认只设置了 getter 函数，我们还可以添加 setter 函数
- 以下样式可以在 webkit 浏览器中模拟 macOS 中的滚动条样式:
- vuex 中的 getters 相当于其 state 的计算属性，常用于派生一些状态
- 擅用 vue 中 mixins 选项，将重复的逻辑抽出，混入到需要的组件中:

  ```javascript
  // mixin 作为Modal,Tooltip组件的公共逻辑部分
  const toggle = {
    data() {
      return {
        isShow: false,
      };
    },
    methods: {
      toggleShow() {
        this.isShow = !this.isShow;
      },
    },
  };

  // Modal组件
  const Modal = {
    template: "#modal",
    mixins: [toggle],
    components: {
      appChild: Child,
    },
  };
  // tooltip组件
  const Tooltip = {
    template: "#tooltip",
    mixins: [toggle],
    components: {
      appChild: Child,
    },
  };
  ```

  ```javascript
  // 可以合并mixin的生命周期: mixin的生命周期先执行，再执行vue实例的生命周期
  const hi = {
    mounted() {
      console.log("mixin mounted");
    },
  };

  new Vue({
    el: "#app",
    mixins: [hi],
    mounted() {
      console.log("vue instance mounted");
    },
  });

  // mixin mounted
  // vue instance mounted
  ```

- 标记语句

  ```javascript
  label: statement;
  ```

  可以和 break 或 continue 语句一起使用。标记就是在一条语句前面加个可以引用的标识符，通常用于跳出循环。

- webkit 内核模仿 mac 的滚动条样式
  ```css
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 4px;
  }
  ```
- 更新思想：

  当需要更新 Objec 中的数据(比如需要更新某一对 key/value 时)时，如果无法使用 key 来确定更新的数据，那么就可以采用先删除、再新增的策略

  gitlab 的 variables API 同样如此，由于其开放 API 设计本身的问题，无法通过 key 来唯一更新某一 variable，因此可以采取批量删除、批量创建的方式，达到更新的目的（事实上 gitlab 本身也是这样实现的）。

- 最近 DOM API 中的 Element.scrollIntoView() 可以通过传入配置对象来实现平滑滚动（不再需要 jQuery 了）：

  ```css
  elem.scrollIntoView({
      behavior: 'smooth'
  });
  ```

  有一个全新的 CSS 属性（仍在工作草案中），可以用简单的一行代码改变整个页面滚动的行为:

  ```css
  html {
    scroll-behavior: smooth;
  }
  ```

- position: sticky; 粘性定位 需要指定 top,bottom,left,right 之一才可以实现粘性效果 - 利用 css shape-outside 可以让内联元素以不规则的形状进行外部排列（可以实现刘海屏的适配）
  且元素必须是浮动元素，以下是绕开刘海屏的实现

  ```css
  .shape {
    float: left;
    shape-outside: polygon(
      0 0,
      0 150px,
      16px 154px,
      30px 166px,
      30px 314px,
      16px 326px,
      0 330px,
      0 0
    );
  }
  ```

- 多行省略
  块级元素，webkit 浏览器有效，其他浏览器需指定最大高度

  ```css
  width: 308px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
  word-wrap: normal;
  ```

- placeholder 颜色

  ```css
  element::-webkit-input-placeholder {
    color: #cda777 !important;
  }

  element::-moz-placeholder {
    color: #cda777 !important;
  }

  element:-moz-placeholder {
    color: #cda777 !important;
  }

  element::-ms-input-placeholder {
    color: #cda777 !important;
  }
  ```

- window 对象

  调用 window.close()，可以关闭当前页面

- PWA
  serviceWorker 除了由浏览器触发更新之外，还应用了特殊的缓存策略：如果该文件 24 小时没有更新，当触发更新时，会强制更新。也就意味着最坏情况下 service Worker 会每天更新一次。
  serviceWorker 标准中给出了 ServiceWorkerRegistrantion.update()放法，调用该方法会导致立即调用 Service worker。但 chrome 貌似还是不会跳过 http 缓存，此处实现和标准尚存差异。

- 判断对象是否为空{}
  利用 Object.keys 遍历对象的可枚举属性，并返回一个由属性名组成的数组，通过判断这个数组的长度来检查对象是否是空

- 判断是否是数组

  Array.isArray(obj)， 返回值为 true 或 false

  ```javascript
  Array.isArray([]); // true
  // 不支持Array.isArray()方法的ployfill（不支持Array.isArray方法的宿主环境多半不支持箭头函数-_-||）：
  if (!Array.isArray) {
    Array.isArray = (arg) =>
      Object.prototype.toString.call(arg) === "[object Array]";
  }
  ```

  ```javascript
  const obj = {};
  Object.keys(obj).length === 0;
  ```

- 边框渐变

  ```
      border-image: linear-gradient()
  ```

  能够实现盒子边框的颜色渐变，但此时 border-radius 属性无效，故无法简单地实现一个圆角边框渐变效果

- word-wrap 由于和 word-break 属性语意过于相似，故在 css3 规范中更名为 overflow-wrap，但只有 chrome/safari 支持

- map

  ```javascript
  let list = [1, 3, 5, 76, 123, 412, 3];
  let result = list.map((v) => (v = v * 2));
  console.log(result); // [2, 6, 10, 152, 246, 824, 6]
  ```

- node child processes 模块
  利用 child_process 模块的 exec 对象写 shell 脚本，需要注意：

  ```javascript
  exec("shell命令", (err, stdout, stderr) => {
    if (err) throw err;
    // 命令执行成功后要做的事情
  });
  ```

- 外链

  ```
  target="_blank"
  ```

  当使用 target="\_blank" 链接至另一个页面时，新页面将与您的页面在同一个进程上进行。如果新页面正在执行开销极大的 JavaScript，您的页面性能可能会受影响。
  此外，target="\_blank" 也是一个安全漏洞。新的页面可以通过 window.opener 访问您的窗口对象，并且它可以使用 window.opener.location = newURL 将您的页面导航至不同的网址。（可怕）

  一般情况下，当您在新窗口或标签中打开一个外部链接时，始终添加 rel="noopener"

  ```html
  <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>
  ```

- 引用资源预加载

  `<link>`元素的 rel 属性的属性值 preload 能够让你在你的<head>元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即可需要的。对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。例如：

  ```html
  <link rel="preload" href="style.css" as="style" />
  <link rel="preload" href="main.js" as="script" />
  ```

  使用 as 来指定将要预加载的内容的类型，将使得浏览器能够： - 更精确地优化资源加载优先级。 - 匹配未来的加载需求，在适当的情况下，重复利用同一资源。 - 为资源应用正确的内容安全策略。 - 为资源设置正确的 Accept 请求头。

- 伪元素
  :before 和:after 是在 CSS2.1 中发布的。起初伪元素的语法是使用一个冒号“:”，但是随着 web 的发展，在 CSS3 中伪元素使用两个冒号“::”——也就变成了::before 和::after——以便将它与伪类区分开（如:hover，:active 等）。然而，不管你使用单冒号还是双冒号，浏览器都能识别它们。但是**IE8 只支持单冒号的格式**，如果你想要保持广泛的浏览器兼容性，使用单冒号会更安全。
  可以给伪元素添加任何样式。伪元素默认为**内联元素**，因此若要指定宽高，则需声明 display:block;。最好使用 background 属性来设置伪元素的背景图片，这比直接在 content 中使用 url()更容易控制。即使不使用 content 属性，也必须写上，可设置为空，否则伪元素无法正常工作。

  我们可以结合使用伪元素和伪类：

  ```css
  blockquote:hover:after,
  blockquote:hover:before {
    background-color: #555;
  }
  ```

  :focus-whitin 伪元素表示一个元素获得焦点，或，该元素的后代元素获得焦点，即元素自身或者它的某个后代匹配:focus 伪类。例如，当用户在表单中某个`<input>` 域上获得焦点，会高亮整个表单。

  应用：
  参见本项目 html-css-js 目录下的 pseudo-element.html 中的卡片阴影样式

* 滚动到页底加载更多的实现
  可以使用 intersectionObserver 实现
  思路：
* 页面底部放置一个 id 为 load-more 的元素
* 使用 intersectionObserver.observer 监听这个元素，这个元素一旦出现，就将分页数+1，发送请求
  注意：
* 因为一开始是没有数据的，因此 load-more 元素不显示，此时无法设置 intersectionObserver.observer 监听，会报错
* 注意开始监听的时机，不可重复监听，页面销毁/没有更多数据时，要取消监听
  实现：
  设置一个 load-more 元素，此时 showLoadMore===fasle ，即不显示加载更多

```html
<p id="next-page" class="load-text" v-if="showLoadMore">
  {{loading?'Loading...':'Load More'}}
</p>
```

异步 ajax 函数如下：

```javascript
async getList(btn) {
    ...
    try {
        this.loading = true   // 开始loading
        const res = await this.vxgetList({
            fromDate: +new Date(this.startTime) / 1000,
            toDate: +new Date(this.endTime) / 1000,
            pageIdx: this.page
        })
        if (res.length === 0) {        // 如果响应的数据数组为0，即没有更多数据，此时不再显示load-more元素，同时取消对他的监听
            const loadMoreEle = document.querySelector('#next-page')
            this.intersectionObserver.unobserve(
                loadMoreEle
            )
            this.showLoadMore = false
        }

        if (btn === 'submit') {       // 如果是首次请求（或者更改搜索条件），则响应数组直接为数据渲染数组
            this.content = res
        } else {
            this.content = this.content.concat(res) // 否则则将这次的响应拼接在之前的数据后
        }
        if (this.page === 1) {       // 如果是首次请求（或者更改搜索条件）,则显示load-more元素，同时开始对他进行监听
            this.showLoadMore = true
            setTimeout(() => {
                this.intersectionObserver.observe(
                    document.querySelector('#next-page')
                )
            }, 2000);
        }
        this.loading = false           // loading结束，页数索引++
        this.page++
    } catch (e) {
        this.loading = false
    }
},

// 初始化监听函数
const intersectionObserver = new IntersectionObserver((entries) => {
    // 如果不可见，就返回 ; 如果正在发送请求 也返回
    if (entries[0].intersectionRatio <= 0) return;
    if (this.loading) return;
    this.getList()
});
this.intersectionObserver = intersectionObserver
```

优势：

- 传统的交集检测涉及到事件监听以及 Element.getBoundingClientRect() 的使用，这个代码是运行在主线程中的，会造成性能问题
- 代码简洁，浏览器会对其做优化
  缺点：
- 浏览器兼容性
- 规格写明，IntersectionObserver 的实现，应该采用 requestIdleCallback()，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。

* css 实现弹框居中

```css
.dialog_box {
  /* 弹框样式 */
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 400px;
  height: 300px;
  background: #fff;
}
.dialog_container {
  /* 遮罩层 */
  text-align: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
/* 垂直居中关键 */
.dialog_container::after {
  display: inline-block;
  content: "";
  width: 0;
  height: 100%;
  vertical-align: middle;
}
```

首先用 100vw, 100vh 撑满整个视图窗口, 颜色设置透明度, 位置固定在视口左上角, 层级要比页面内容高。
水平居中：设置遮罩容器的 text-align: center; 弹框的 display: inline-block;（弹框长宽随意设置）
垂直居中：实现的关键在于遮罩容器的伪元素::after。该伪元素 display: inline-block; 使其与弹框同一行; 宽度为 0, 高度设置为 100%, 最最关键的属性就是 vertical-align: middle;
这样弹框和伪元素就在同一行内实现了垂直居中。伪元素的宽度为 0，因此不会影响弹框的水平居中

- 利用 flex 实现居中

  ```css
  .parent {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  ```

  ```html
  <div class="parent">
    <span>child</span>
  </div>
  ```

- font-display 属性:

参考[文章](https://developers.google.com/web/updates/2016/02/font-display)戳这里
大意：
在网络字体没有加载完成时，页面字体的表现

- cookie
  服务器通过设置 cookie 属性为 httpOnly，则可以防止浏览器端使用 JS 访问

- v-show VS v-if
  v-if 是真正的条件渲染，如果为 false 的话，DOM 元素不会渲染上。而且如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
  v-show 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

- vue 轮播动画效果实现
  思路：
  一个宽度固定的容器，作为用于展示轮播图的窗口；
  容器里包裹着一个由将要展现的元素（通常是图片）组成的超长容器；
  通过两个按钮来控制前一个/后一个元素；
  维护一个 current 变量，用于记录当前元素展示的序号；
  当前元素改变时，通过改变超长容器的类名来动态改变他的 left 值，以控制窗口展示的元素。
  适当添加动画效果即可

优势：
配合 vue/react 以及 sass/less 使用，仅需少量代码即可实现轮播效果，简单

劣势：
可拓展性、可移植性不强

- 关于 table 布局？
  td display: inline-block;

- p 元素文字强制不换行

```css
white-space: nowrap;
```

- 图片 png 与 jpg
  在无需透明度的情况下 可以抽离掉 png 图片的 alpha 通道以减少体积；或者换成 jpg，能有效缩减体积

- 判断浏览器是否支持 webp 图片

```javascript
var isSupportWebp =
  !![].map &&
  document
    .createElement("canvas")
    .toDataURL("image/webp")
    .indexOf("data:image/webp") == 0;

console.log(isSupportWebp);
```

- 对象扩展运算符...

```javascript
var player = { name: "Jack", age: 24, job: "engineer", country: "china" };
var newPlayer = { ...player, name: "Sam", age: 25 };
console.log(newPlayer); // {name: 'Sam', age: 25, job: 'engineer', country: 'china'}
```

对象扩展运算符可以用以复制/继承另一个对象，并改写他的属性，类似于 Object.assign()，因此上下两部分代码等价:

```javascript
var player = { name: "Jack", age: 24, job: "engineer", country: "china" };
var newPlayer = Object.assign({}, player, { name: "Sam", age: 25 });
console.log(newPlayer); // {name: 'Sam', age: 25, job: 'engineer', country: 'china'}
```

- 构造函数模式的劣势
  例如，本库中 data-structure 目录下的 stack.js 中，使用构造函数模式模拟了栈（具体实现请看代码，此处略）

```javascript
function Stack(){
    ...
}

const stack1 = new Stack()
const stack2 = new Stack()
```

此处初始化两个栈的实例对象。单看代码是没有问题的，简单明了。但是，这两个实例的方法是不同的函数引用，也就是说构造函数的每个方法都要在每个实例上重新创建一遍，可如此检验：

```javascript
console.log(stack1.pop === stack2.pop); // false
```

因此，不同实例上的同名函数是不相等的。可将构造函数中的方法移动到全局，在构造函数内部引用，这样就可以使不同的实例共享相同的方法了。但是这种方式并不推荐，因为会增加很多全局函数，而且这些函数仅是为了给某个对象调用，显然不合理，因此构造函数模式比较适合单例场景。这些问题可由原型模式解决。

- 对称加密与非对称加密

[浅显易懂](https://mp.weixin.qq.com/s/T0e-Zu-SPK0g_ng8Or-APg)
对称加密：服务器与客户端使用同样的规则加密解密信息

非对称加密：服务器发送给客户端一个加密规则，客户端用此（公钥）对信息进行加密，服务器用自己的私钥解密。

非对称加密如何相信用于加密的公钥？通过可以使用可信任的第三方的签名，即证书，来保证其不可伪造性

非对称加密更慢，消耗更多性能，因此非对称加密只用来加密用于确定对称加密的密码信息（对称加密的规则）,剩下的使用更高效的对称加密通信

- Git 多人协作工作模式
  - 首先，可以试图用 git push origin branch-name 推送自己的修改；
  - 如果推送失败，则因为远程分支比你的本地更新，需要先用 git pull 试图合并；
  - 如果合并有冲突，则解决冲突，并在本地提交；
  - 没有冲突或者解决掉冲突后，再用 git push origin branch-name 推送就能成功！
  - 如果 git pull 提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令 git branch --set-upstream branch-name origin/branch-name。

* 元素滚动到底部

场景：监听并打印新消息，假设消息窗口元素节点为 msgBox，只需在消息监听函数里加上 msgDiv.scrollTop = msgDiv.scrollHeight，即可实现滚动到底部

```javascript
    socketMessageEvent(e) {
        console.log(`Message from server: ${e.data}`)
        // 打印消息数据，并滚动到底部
        this.msg.push(e.data)
        this.msgBox.scrollTop = this.msgBox.scrollHeight
    },
```

- document 对象

  document 对象上有一些实用的属性：

  - title: 可以通过 document.title 读取并设置页面标题，读取的即是`<title>`元素中的文本，但是不会改变页面中的`<title>`元素
    ```javascript
    const oldTitle = document.title;
    document.title = "New page title";
    ```
  - URL: URL 属性包含当前页面的完整标题，即地址栏中显示的 URL，读取时等同 window.location.href
    ```javascript
    document.URL === window.location.href;
    ```
  - domain: domain 属性值包含页面的域名
  - referrer： referrer 属性保存着链接到当前页面的那个页面的 URL。

  其中 title，domain 属性是可以设置的，但是出于安全限制，domain 不能被设置成 URL 中不包含的域

- DOM 操作相关

getElementsByTagName()方法会返回一个 HTMLCollections 对象，该对象与 NodeList 非常相似。可以使用[]或 item()访问该对象中的项。其中[]中可以是数字索引，或字符串。字符串代表要查找的元素的 name 属性的值，方便查找已命名的元素，等同于调用 namedItem(name)方法。

要想获得全部元素组成的 HTMLCollection，如下：

```javascript
var allElements = document.getElementsByTagName("*");
```

- python 字符串模板
  较新的 python 版本模板字符串可以这样写：

```python
    f'Your email is {email} , your password is ***'
```

简洁，类似于 ES6

- 大厂的页面黑白效果怎样实现的

  ```css
  filter: grayscale(100%); /* 一行代码即可 */
  ```

- css 动画小技巧
  场景：想要做出动画持续 2s，停顿 2s 后再循环的效果
  思路：设置好关键帧的位置

```css
.step-bar-line {
  animation: 4s ease-in-out infinite grow;
}
@keyframes grow {
  0% {
    width: 0;
  }
  50% {
    width: 232px;
  }
  100% {
    width: 232px;
  }
}
```

让总时长等于 4s，那么前 2s 就是动画持续时间，后 2s 的状态和动画结束时状态一致（在这儿停顿 XD），这样就实现了停顿 2s 的效果

- 重排和重绘
  - 部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算。这被称为**重排**。注意这里至少会有一次重排-初始化页面布局。
  - 由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新。这样的更新被称为**重绘**。
    任何改变用来构建渲染树的信息都会导致一次重排或重绘
  - 添加、删除、更新 DOM 节点
  - 通过 display: none 隐藏一个 DOM 节点-触发重排和重绘
  - 通过 visibility: hidden 隐藏一个 DOM 节点-只触发重绘，因为没有几何变化
  - 移动或者给页面中的 DOM 节点添加动画
  - 添加一个样式表，调整样式属性
  - 用户行为，例如调整窗口大小，改变字号，或者滚动。
  ```javascript
  var bstyle = document.body.style; // cache
  bstyle.padding = "20px"; // 重排+重绘
  bstyle.border = "10px solid red"; // 另一次重排+重绘
  bstyle.color = "blue"; // 没有尺寸变化，只重绘
  bstyle.backgroundColor = "#fad"; // 重绘
  bstyle.fontSize = "2em"; // 重排+重绘
  // 新的DOM节点 - 重排+重绘
  document.body.appendChild(document.createTextNode("dude!"));
  ```
- 最小化重排/重绘

  - 不要逐个变样式。对于静态页面来说，明智且兼具可维护性的做法是改变类名而不是样式。对于动态改变的样式来说，相较每次微小修改都直接触及元素，更好的办法是统一在 cssText 变量中编辑。

  ```javascript
  // bad
  var left = 10,
    top = 10;
  el.style.left = left + "px";
  el.style.top = top + "px";
  // better
  el.className += " theclassname";
  // 当top和left的值是动态计算而成时...
  // better
  el.style.cssText += "; left: " + left + "px; top: " + top + "px;"; // obj.style.cssText += '' 用于设置元素的css属性，提高页面渲染性能；注意要累加，否则会把之前的cssText覆盖掉
  ```

  - 通过 documentFragment 来保留临时变动
  - 复制你即将更新的节点，在副本上工作，然后将之前的节点和新节点交换
  - 通过 display:none 属性隐藏元素（只有一次重排重绘），添加足够多的变更后，通过 display 属性显示（另一次重排重绘）。通过这种方式即使大量变更也只触发两次重排。
  - 不要频繁计算样式。如果你有一个样式需要计算，只取一次，将它缓存在一个变量中并且在这个变量上工作。看一下下面这个反例：

  ```javascript
  // no-no!
  for (big; loop; here) {
    el.style.left = el.offsetLeft + 10 + "px";
    el.style.top = el.offsetTop + 10 + "px";
  }
  // better
  var left = el.offsetLeft,
    top = el.offsetTop;
  esty = el.style;
  for (big; loop; here) {
    left += 10;
    top += 10;
    esty.left = left + "px";
    esty.top = top + "px";
  }
  ```

  - 通常情况下，考虑一下渲染树和变更后需要重新验证的消耗。举个例子，使用绝对定位会使得该元素单独成为渲染树中 body 的一个子元素，所以当你对其添加动画时，它不会对其它节点造成太多影响。当你在这些节点上放置这个元素时，一些其它在这个区域内的节点可能需要重绘，但是不需要重排。

- 网页生成的过程

  1. HTML 代码转化成 DOM
  2. CSS 代码转化成 CSSOM（CSS Object Model）
  3. 结合 DOM 和 CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
  4. 生成布局（layout），即将所有渲染树的所有节点进行平面合成 （**耗时**）
  5. 将布局绘制（paint）在屏幕上 （**耗时**）

  "**生成布局**"（flow）和"**绘制**"（paint）这两步，合称为"**渲染**"（render）。

  **网页生成的时候，至少会渲染一次。用户访问的过程中，还会不断重新渲染。**以下三种情况，会导致网页重新渲染：

        - 修改DOM
        - 修改样式表
        - 用户事件（比如鼠标悬停、页面滚动、输入框键入文字、改变窗口大小等等）

  **重新渲染，就需要重新生成布局和重新绘制。前者叫做"重排"（reflow），后者叫做"重绘"（repaint）。**

  需要注意的是，**"重绘"不一定需要"重排"**，比如改变某个网页元素的颜色，就只会触发"重绘"，不会触发"重排"，因为布局没有改变。但是，**"重排"必然导致"重绘"**，比如改变一个网页元素的位置，就会同时触发"重排"和"重绘"，因为布局改变了。

  一般来说，样式的写操作之后，如果有下面这些属性的读操作，都会引发浏览器立即重新渲染:

  ```
      offsetTop/offsetLeft/offsetWidth/offsetHeight
      scrollTop/scrollLeft/scrollWidth/scrollHeight
      clientTop/clientLeft/clientWidth/clientHeight
      getComputedStyle()
  ```

  所以，从性能角度考虑，尽量不要把读操作和写操作，放在一个语句里面:

  ```
      // bad
      div.style.left = div.offsetLeft + 10 + "px";
      div.style.top = div.offsetTop + 10 + "px";

      // good
      var left = div.offsetLeft;
      var top  = div.offsetTop;
      div.style.left = left + 10 + "px";
      div.style.top = top + 10 + "px";
  ```

  一般的规则是：

  ```
      样式表越简单，重排和重绘就越快。
      重排和重绘的DOM元素层级越高，成本就越高。
      table元素的重排和重绘成本，要高于div元素
  ```

- CentOS 7 下安装 python3
  参考[CentOS 7 下安装 python3](https://segmentfault.com/a/1190000009922582)

- 小程序、小游戏 Serverless

- 水平垂直居中

  - 已知高度宽度元素的水平垂直居中

    - 绝对定位与负边距实现

    ```css
    #container {
      position: relative;
    }

    #center {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -50px 0 0 -50px;
    }
    ```

    - 绝对定位与 margin

    ```css
    #container {
      position: relative;
    }

    #center {
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    ```

  - 未知高度和宽度元素的水平垂直居中

    - 当要被居中的元素是 inline 或者 inline-block 元素

    ```css
    #container {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }

    #center {
    }
    ```

    - Css3 的 transform

    ```css
    #container {
      position: relative;
    }

    #center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    ```

    - flex

    ```css
    #container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #center {
    }
    ```

- 弹出层弹出后背景不可滑动/滚动

  ```css
  .no-scroll {
    position: fixed;
    overflow: hidden;
  }
  ```

  此时页面视窗固定，但是内容会返回到顶端，因此这里需要记录一下当前的滚动值，可以写在 vuex 的 mutation 中

  ```javascript
  let bodyEl = document.body;
  let top = 0;
  export default {
    setShowingDlg(state, showing) {
      state.isShowingDlg = showing;
      if (showing) {
        top = window.scrollY;
        bodyEl.style.position = "fixed";
        bodyEl.style.top = `${-top}px`;
      } else {
        bodyEl.style.position = "";
        bodyEl.style.top = "";

        window.scrollTo(0, top); // 回到原先的高度
      }
    },
  };
  ```

- web 移动端调用自带短信功能

  ```javascript
  isIos() {
      return this.$util.getBrowserVersion().isIos()
  },
  isAndroid() {
      return this.$util.getBrowserVersion().isAndroid()
  },
  smsLink() {
      let link = ''
      if (this.isIos) {
          link = `sms:&body=${this.inviteText}`
      } else if (this.isAndroid) {
          link = `sms:?body=${this.inviteText}`
      } else {
          link = `sms:;body=${this.inviteText}`
      }
      return link
  },
  ```

- ios 设备 div 点击无反应的兼容措施
  在 ios 设备中，div 这种语义化不强的标签，默认是没有点击事件的。因此需要给 div 添加一个空的 onlick=""事件监听，或者添加 css 属性：cursor:pointer; ios 设备才会处理他的点击事件
- border 为 0.5px 的时候各个浏览器兼容性变现不同
- 设置父元素 height: 0; overflow: visiable; background: red;子元素负责撑开高度，但是父元素的兄弟元素则会紧跟排列，可以实现部分遮挡的效果
- ios 的-webkit-tap-highlight-color 属性：当你点击一个链接或者通过 Javascript 定义的可点击元素的时候，它就会出现一个半透明的灰色背景。-webkit-tap-highlight-color: rgba(0, 0, 0, 0.5); 可以设置 alpha 为 0 来禁用该属性
- iphoneX 底部充满适配
  [参考](https://aotu.io/notes/2017/11/27/iphonex/index.html)
  ```html
  <!-- 新增 viweport-fit 属性，使得页面内容完全覆盖整个窗口： -->
  <meta name="viewport" content="width=device-width, viewport-fit=cover" />
  ```
  ```css
  body {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  ```
- HTTP 请求中的 form data 和 request payload

  在使用 axios 时，axios 默认的 header 中 content-type: application/json，此时 post 请求传上去的数据是在 request payload 中的，后端需要在这里取；
  当设置 content-type: application/x-www-form-urlencoded 时，此时 post 请求是以 Form data 方式上传的，需要对 form data 做序列化处理（如使用 qs 库），后端需要解析序列化后的数据

- axios 的响应拦截器中统一错误处理与特殊错误处理

  思路：统一错粗处理放在 setTimeout 中作为宏任务在下一次事件循环中执行，为 error.response 增加一个控制 setTimeout 中逻辑是否执行的 flag 方法，并将这个 flag 方法添加到 error.response 上随着 Promise.reject({...error.response, flag}) 传出去，这样可以在调用请求的 service 层、或者业务组件层调用捕获 reject 传出的错误，在不需要统一错误处理的业务组件或整个 service 层中即可调用 error.flag ，即隐藏统一错误处理。

  ```javascript
  const errorHandler = (errorRes) => {
    let showErrorNotice = true;
    const hideErrorNotice = () => (showErrorNotice = false);
    setTimeout(() => {
      if (showErrorNotice) {
        const code = data.code || status;
        openErrorNotification({ code, msg: CODE_MESSAGE[`${code}`] });
      }
    });

    return { ...errorRes, hideErrorNotice };
  };

  // 使用时，在catch中捕获异常，调用 e.hideErrorNotice() 方法，即可隐藏统一错误处理提示
  try {
    const res = await getData(user); // getData接口一定要return Promise.reject(e) 否则捕获的错误并不是http请求导致的错误
  } catch (e) {
    e.hideErrorNotice();
  }
  ```

- 判断空字符串" "

  ```javascript
  const message = " ";
  if (message.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
    console.log("Message cannot be empty!");
  }
  ```

- 字符串 slice, substring, substr 区别

  slice, substring 参数均为(start [, end])，返回从 start 到 end(不包含)的子字符串，即包左不包右，区别在于：

  - substring 允许 start 大于 end，如

    ```javascript
    let str = "stringify";

    // 这些对于 substring 是相同的
    str.substring(2, 6); // "ring"
    str.substring(6, 2); // "ring"

    // 但对 slice 是不同的
    str.slice(2, 6); // "ring"（一样）
    str.slice(6, 2); // ""（空字符串）
    ```

  - slice 支持负参数，它们被视为 0

  str.substr(start [, length]) 返回字符串从 start 开始的给定 length 的部分。start 可为负数，从结尾算起，例如：

  ```javascript
  str.substr(2, 4); // "ring"
  str.substr(-4, 2); // "gi"
  ```

- 字符串 codePointAt，String.fromCodePoint

  - codePointAt(pos)：返回位置在 pos 处的字符 UTF-16 编码：
    ```javascript
    let str = "Widget with id";
    str.codePointAt(2); // 100
    ```
  - String.fromCodePoint(code)：通过数字 code 创建字符：
    ```javascript
    String.fromCodePoint(90); // Z
    ```

- facebook pixel
  用法同 GA
- 属性描述符
  对象里目前存在的属性描述符有两种主要形式：**数据描述符**和 **存取描述符**。数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。存取描述符是由 getter-setter 函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者。
  数据描述符和存取描述符均具有 configurable 和 enumerable
  数据描述符具有 value，writable
  存取描述符具有 get，set
  如果一个描述符不具有 value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value 或 writable)和(get 或 set)关键字，将会产生一个异常。

  ```javascript
  let person = { name: "Mike", age: 18 };
  Object.defineProperty(person, "name", {
    value: "Lily",
  });
  console.log(person); /* {name: "Lily", age: 18} */

  Object.defineProperty(person, "fullName", {
    get() {
      return "Lily White";
    },
    set(newVal) {
      this.name = newVal;
    },
  });

  console.log(person.fullName); /* "Lily White" */
  person.fullName = "Mike White";
  console.log(person); /* {name: "Mike White", age: 18} */
  ```

- Vue 响应式原理

  ```javascript
  let data = { price: 5, quantity: 2 };
  let target = null;
  class Dep {
    constructor() {
      this.subscribers = [];
    }

    depend() {
      if (target && !this.subscribers.includes(target)) {
        this.subscribers.push(target);
      }
    }

    notify() {
      this.subscribers.forEach((sub) => sub());
    }
  }
  Object.keys(data).forEach((key) => {
    let internalValue = data[key];

    const dep = new Dep();

    Object.defineProperty(data, key, {
      get() {
        dep.depend();
        return internalValue;
      },
      set(newVal) {
        internalValue = newVal;
        dep.notify();
      },
    });
  });
  function watcher(myFun) {
    target = myFun;
    target();
    target = null;
  }
  watcher(() => {
    data.total = data.price * data.quantity;
  });
  console.log("total = " + data.total);
  data.price = 20;
  console.log("total = " + data.total);
  data.quantity = 10;
  console.log("total = " + data.total);
  ```

  使用 Proxy 实现响应式

  ```javascript
  let deps = new Map(); /* 创建一个Map对象 */
  Object.keys(data).forEach((key) => {
    /* 为每个属性都设置一个依赖实例 并放入deps中 */
    deps.set(key, new Dep());
  });
  class Dep {
    constructor() {
      this.subscribers = [];
    }

    depend() {
      if (target && !this.subscribers.includes(target)) {
        this.subscribers.push(target);
      }
    }

    notify() {
      this.subscribers.forEach((sub) => sub());
    }
  }
  let data_without_proxy = data; /* 保存源对象 */
  data = new Proxy(data_without_proxy, {
    /* 重写数据以在中间创建一个代理 */
    get(obj, key) {
      deps.get(key).depend();
      return obj[key];
    },
    set(obj, key, newVal) {
      obj[key] = newVal;
      deps.get(key).notify();
      return true;
    },
  });
  ```

  如你所见，我们创建了一个变量 data_without_proxy 来作为源对象的副本，在覆盖源对象时来使用副本创建一个 Proxy 对象。第二个参数是包含了 get()和 set()这两个陷阱函数属性的 handler 对象。

  get(obj, key) => 是在访问属性时调用的函数。第一个参数 obj 为原始对象（data_without_proxy），第二个参数是被访问属性的 key。这里面调用了与特定属性关联的特定方法（Dep class 中的 depend()）。最后，使用 return obj[key]返回与该 key 相关的值。

  set(obj, key, newVal) => 中前两个参数与 get 的相同，第三个参数是新的修改值，然后，我们将新值设置给 obj[key] = newVal 修改的属性上，并调用 notify()方法。

- 设置 animation-fill-mode
  ```css
  animation-fill-mode: none; 动画执行前后不改变任何样式，默认
  animation-fill-mode: forwards; 目标保持动画最后一帧的样式，最后一帧是哪个取决于animation-direction和animation-iteration-count
  animation-fill-mode: backwards; 动画采用相应第一帧的样式，保持animation-delay
  animation-fill-mode: both; 动画将会执行 forwards 和 backwards 执行的动作
  ```
- microtask macrotask
- 继承
- 正则
- http
- apply,call,bind

- 内联写在 html 属性中的 js 语句，如:
  ```html
  <div onclick="showUserInfo('Mike','25','I'm a boy')"></div>
  <!-- 这里使用的单引号和双引号会引起bug，正确的做法是将I'm中的单引号转义成html转义字符&#39; 特别是当这些值都是由javascript动态传过来的时候，一定要注意使用html的转义字符-->
  ```
- 前后端跨域带 cookie 联调
  前端：ajax 请求时，需要写明 withCredentials: true
  后端：服务器(Nginx)需要配置 Access-Control-Allow-Credentials: true 才能获得前端的 cookie，但是此时 **Access-Control-Allow-Origin 不能为'\*'**，可以配置成前端的本地的开发服务器地址
  这样设置后不知为何偶尔还是会带不上 cookie，因此开发环境可以再设置一个 proxy 代理
- 原生图片懒加载

  ```javascript
  // 监听底部轮播 图片懒加载
  var userWrap = document.querySelector(".users");
  var intersectionObserver = new IntersectionObserver(function (entries) {
    if (entries[0].intersectionRatio <= 0) return;

    console.log("Loaded swiper");
    intersectionObserver.unobserve(userWrap);
    var imgs = userWrap.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var dataSrc = imgs[i].getAttribute("data-src");
      imgs[i].setAttribute("src", dataSrc);
    }
  });
  ```

- Chrome 中的断点调试

  - [基本使用](https://developers.google.com/web/tools/chrome-devtools/javascript?hl=zh-cn)
  - [更多断点调试方式](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints?hl=zh-cn)

- vue 的 vm.\$nextTick()

  将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

  ```javascript
  new Vue({
    // ...
    methods: {
      // ...
      example: function () {
        // 修改数据
        this.message = "changed";
        // DOM 还没有更新
        this.$nextTick(function () {
          // DOM 现在更新了
          // `this` 绑定到当前实例
          this.doSomethingElse();
        });
      },
    },
  });
  ```

- 线程 VS 进程
- 判断是否是 iphoneX XR XS

  ```javascript
  /* iPhone X */
  const isIPhoneX = /iphone/gi.test(window.navigator.userAgent) &&
  &
  2
  /* iPhone XS Max */
  const isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) &&
              window.devicePixelRatio && window.devicePixelRatio === 3 &&
              window.screen.width === 414 && window.screen.height === 896
  /* iPhone XR */
  const isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) &&
              window.devicePixelRatio && window.devicePixelRatio === 2 &&
              window.screen.width === 414 && window.screen.height === 896

  console.log('是否是iphoneX XR XS', isIPhoneX || isIPhoneXSMax || isIPhoneXR)
  return isIPhoneX || isIPhoneXSMax || isIPhoneXR
  ```

- 浏览器内核

  - Trident(IE 内核)：
    IE8 的 JavaScript 引擎是 Jscript，IE9 开始用 Chakra，这两个版本区别很大，Chakra 无论是速度和标准化方面都很出色。Edge 的是新内核 EdgeHTML。
  - Gecko(Firefox 内核)：

    Netscape6 开始采用的内核，后来的 Mozilla FireFox(火狐浏览器) 也采用了该内核，Gecko 的特点是代码完全公开，其 JavaScript 引擎是 SpiderMonkey。

  - Presto(Opera 前内核) (已废弃)：

    Opera12.17 及更早版本曾经采用的内核，现已停止开发并废弃。

  - Webkit(Safari 内核,Chrome 内核原型,开源):
    它是苹果公司自己的内核，也是苹果的 Safari 浏览器使用的内核。 Webkit 引擎包含 WebCore 排版引擎及 JavaScriptCore 解析引擎，均是从 KDE 的 KHTML 及 KJS 引擎衍生而来。Google Chrome、360 极速浏览器以及搜狗高速浏览器高速模式也使用 Webkit 作为内核(在脚本理解方面，Chrome 使用自己研发的 V8 引擎)。WebKit 内核在手机上的应用也十分广泛，例如 Google 的手机 Gphone、 Apple 的 iPhone， Nokia’s Series 60 browser 等所使用的 Browser 内核引擎，都是基于 WebKit。
    **很多人错误的把 Webkit 叫做 Chrome 内核，其实 Chrome 浏览器的内核一开始叫 Chromium，后来又变成了 Blink 了，苹果的 Safari 才是从一开始就叫 Webkit，后来又升级为 Webkit2 的。**
  -

- ios clipboard.js 兼容性处理

  - 在指定点击的元素时，如果是 button 元素，ios 默认是可以点击的，没有任何问题；如果是 div,p 等元素，ios 默认他们是不具备点击行为的，因此需要在这些元素上添加 onclick=""属性，让他们可以点击，否则无法完成点击复制的操作。或者指定 css 属性 cursor: pointer;也可以达到相同的目的

- v-cloak 指令

  这个指令保持在元素上直到关联实例结束编译。如可以设置 css:

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕，也就是解决{{ 插值 }}闪烁的问题

  ```html
  <div v-cloak>{{ message }}</div>
  ```

- indexedDB

  localforage 库虽然好用，但是还需优化，比如可以维护一个数组，用于存放变化的键，同步到 indexedDB 后，数组清空

- 滚动问题

  需求：一个可以滚动的<div>标签，里面有很多个子元素标签，需要滚动定位到特定的标签元素

  解决：

  ```javascript
  const scrollDiv = document.querySelector(".scrollDiv");
  const targetDiv = document.querySelector(".target");
  scrollDiv.scrollTo(0, target.offsetTop);
  ```

  配合 css 平滑滚动效果更好

  ```css
  .scrollDiv {
    scroll-behavior: smooth;
  }
  ```

- Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。
- Set 内部判断两个值是否不同，使用的算法类似于精确相等运算符(===)，不会发生类型转换，与 === 主要的区别在于 Set 判断 NaN 等于自身：

  ```javascript
  let s = new Set([1, "5", 5, NaN, NaN, "test"]);
  console.log(s); // Set(5) {1, "5", 5, NaN, "test"}
  ```

  另外，两个对象总是不相等的

  ```javascript
  let s = new Set();
  s.add({});
  s.size; // 1

  s.add({});
  s.size; // 2
  ```

  Array.from 方法可以将 Set 结构转为数组

  ```javascript
  const items = new Set([1, 2, 3, 4, 5]);
  let list = Array.from(items);
  console.log(list); // [1, 2, 3, 4, 5]
  ```

  因此，数组去重的方法还可以这样写：

  ```javascript
  function dedupe(array) {
    return Array.from(new Set(array));
  }

  dedupe([1, 1, 2, 3]); // [1,2,3]
  ```

- Set 的遍历操作
  需要特别指出的是，Set 的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
  由于 Set 结构没有键名，只有键值（或者说键名和键值是用一个值），所以 keys 方法和 values 方法的行为完全一致

  ```javascript
  let set = new Set(["red", "green", "blue"]);
  for (let i of set.keys()) {
    // 返回键名的遍历器
    console.log(i);
  }
  // red
  // green
  // blue
  for (let i of set.values()) {
    // 返回键值的遍历器
    console.log(i);
  }
  // red
  // green
  // blue
  for (let i of set.entries()) {
    // 返回键值对的遍历器
    console.log(i);
  }
  // ["red", "red"]
  // ["green", "green"]
  // ["blue", "blue"]
  ```

  Set 结构默认可遍历，它的默认遍历器生成函数就是它的 values 方法，因此可以直接 for...of 遍历 set

  ```javascript
  Set.prototype[Symbol.iterator] === Set.prototype.values; // true

  for (let i of set) {
    console.log(i);
  }
  // red
  // green
  // blue
  ```

- WeakSet

  WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
  首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

  ```javascript
  const ws = new WeakSet();
  ws.add(1); // Uncaught TypeError: Invalid value used in weak set
  ws.add(Symbol()); // Uncaught TypeError: Invalid value used in weak set
  ```

  WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。WeakMap 同理。

- Map

  为了解决对象中的键只能是字符串的问题，ES6 引入了 Map 数据结构。类似于对象，也是键值对的集合，但是键的范围不限于字符串。

  ```javascript
  const m = new Map();
  const o = { p: "Hello World" };

  m.set(o, "content");
  m.get(o); // "content"

  m.has(o); // true
  m.delete(o); // true
  m.has(o); // false
  ```

  使用 Map 结构的 set 方法，将对象 o 当作 m 的一个键，然后又用 get 方法读取这个键，接着用 delete 删除了这个键。

  Map 构造函数接受数组作为参数，该数组的成员是一个个表示键值对的数组：

  ```javascript
  const map = new Map([
    ["name", "张三"],
    ["title", "Author"],
  ]);

  map.size; // 2
  map.has("name"); // true
  map.get("name"); // "张三"
  ```

  实际上执行的是下面的算法：

  ```javascript
  const items = [
    ["name", "张三"],
    ["title", "Author"],
  ];

  const map = new Map();
  items.forEach(([key, value]) => map.set(key, value));
  ```

  注意，只有对同一个对象的引用，Map 结构才将其视为同一个键：

  ```javascript
  const map = new Map();

  map.set(["a"], 555);
  map.get(["a"]); // undefined
  ```

  上面的 set 和 get 方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此 get 方法无法读取该键，返回 undefined。

  同理，同样的值的两个实例，在 Map 结构中被视为两个键。

  ```javascript
  const map = new Map();

  const k1 = ["a"];
  const k2 = ["a"];

  map.set(k1, 111);
  map.set(k2, 222);

  map.get(k1); // 111
  map.get(k2); // 222
  ```

  因此，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就是为两个键。

  不同于对象，Map 的键可以为任意类型

  ```javascript
  const PERMISSION_MAP = new Map([
    [10, "Guest"],
    [20, "Reporter"],
    [30, "Developer"],
    [40, "Maintainer"],
    [50, "Owner"],
  ]);

  // 使用时
  PERMISSION_MAP.get(10);
  ```

* proxy

  ```javascript
  let obj = {
    a: 1,
  };

  let proxyObj = new Proxy(obj, {
    get: function (target, prop) {
      return prop in target ? target[prop] : 0;
    },
    set: function (target, prop, value) {
      target[prop] = 888;
    },
  });

  console.log(proxyObj.a); // 1
  console.log(proxyObj.b); // 0

  proxyObj.a = 666;
  console.log(proxyObj.a); // 888
  ```

  设置 handler 拦截重写 set, get 方法

* 离线 web push

  注册 sw -> 询问通知权限 -> （同意后）获取订阅信息 -> 将订阅信息发送给服务器 -> 等待推送

  - 获取订阅信息：

    浏览器向 push service（google/firefox 或者其他提供了 push service 服务的服务商）请求订阅信息，生成的订阅信息包括 endpoint 、keys

  - 将订阅信息发送给服务器：

    将上一步的订阅信息（endpoint 、keys）发送个服务器，服务器将其与用户关联

  - service worker 中需要增加监听 push 的回调，通常是显示通知

  **注意：** 服务器 push 消息时一定要添加 ttl 参数，否则 push service 不会保存该信息，即浏览器关闭时是无法收到 ttl = 0 的消息通知的！

* 简单请求与非简单请求

  [参见阮一峰老师的 CORS 博文](http://www.ruanyifeng.com/blog/2016/04/cors.html)

- 页面可见性 API

  标签栏的显示隐藏会触发 visibilitychange 事件

  ```javascript
  document.addEventListener("visibilitychange", () => {
    // 监听document的显隐，控制标题
    if (!document.hidden) {
      // ...
    }
  });
  ```

- 判断数值是否有穷

  - 全局 isFinite() 函数

    全局 isFinite() 函数用来判断被传入的参数值是否为一个有限数值（finite number）。在必要情况下，参数会首先转为一个数值。

  - Number.isFinite() 方法

    Number.isFinite() 方法用来检测传入的参数是否是一个有穷数（finite number）。和全局的 isFinite() 函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 true。

- 试图向数组添加数字字符串属性

  ```javascript
  var myArray = ["test", 1, 2];
  myArray["3"] = 3;
  ```

  会导致 myArray 数组新增一个元素

- antd-vue

  [Ant Design of Vue](https://vue.ant.design/docs/vue/introduce-cn/)

- BFC

  BFC，即，**块格式化上下文**，是 Web 页面的可视化 CSS 渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。BFC 是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个 BFC 中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。

- Element.classList

  Element.classList 是一个只读属性，是替代 element.className 作为空格分隔的字符串访问元素的类列表的一种方便的方法。可以是调用 add()，和 remove()方法修改它。

  - add: 添加指定的类
  - remove：删除的指定的类
  - item：按集合中的索引返回类值
  - toggle：当只有一个参数时：切换 class value; 即如果类存在，则删除它并返回 false，如果不存在，则添加它并返回 true；当存在第二个参数时：如果第二个参数的计算结果为 true，则添加指定的类值，如果计算结果为 false，则删除它。
  - contains：检查元素的类属性中是否存在指定的类值
  - replace：用一个新类代替已有类

- Nginx 反向代理

  在计算机网络中，反向代理是代理服务器的一种。服务器根据客户端的请求，从其关系的一组或多组后端服务器（如 Web 服务器）上获取资源，然后再将这些资源返回给客户端，客户端只会得知反向代理的 IP 地址，而不知道在代理服务器后面的服务器集群的存在[1]。

  ```
  location /testapi/ {
      proxy_pass   http://127.0.0.1:8888/;
  }
  ```

  主要作用：

  - 对客户端隐藏服务器（集群）的 IP 地址
  - 安全：作为应用层防火墙，为网站提供对基于 Web 的攻击行为（例如 DoS/DDoS）的防护，更容易排查恶意软件等
  - 为后端服务器（集群）统一提供加密和 SSL 加速（如 SSL 终端代理）
  - 负载均衡，若服务器集群中有负荷较高者，反向代理通过 URL 重写，根据连线请求从负荷较低者获取与所需相同的资源或备援
  - 对于静态内容及短时间内有大量访问请求的动态内容提供缓存服务
  - 对一些内容进行压缩，以节约带宽或为网络带宽不佳的网络提供服务
  - 减速上传
  - 为在私有网络下（如局域网）的服务器集群提供 NAT 穿透及外网发布服务
  - 提供 HTTP 访问认证[2]
  - 突破互联网封锁（不常用，因为反向代理与客户端之间的连线不一定是加密连线，非加密连线仍有遭内容审查进而遭封禁的风险；此外面对针对域名的关键字过滤、DNS 缓存污染/投毒攻击乃至深度数据包检测也无能为力）

* 负载均衡

  负载平衡（Load balancing）是一种计算机技术，用来在多个计算机（计算机集群）、网络连接、CPU、磁盘驱动器或其他资源中分配负载，以达到最优化资源使用、最大化吞吐率、最小化响应时间、同时避免过载的目的。 使用带有负载平衡的多个服务器组件，取代单一的组件，可以通过冗余提高可靠性。负载平衡服务通常是由专用软件和硬件来完成。 主要作用是将大量作业合理地分摊到多个操作单元上进行执行，用于解决互联网架构中的高并发和高可用的问题。

- nginx http 请求重定向到 https（方法众多）

  - 497 错误
    ```
    error_page 497  https://$host$uri\?$args\;
    ```

- 域名

  一级域名即为顶级域名，如 catdogs.club，mccarthey.top 等；

  二级域名为 www.catdogs.club，admin.mccarthey.top 等；

- npx

  原理：运行的时候，会到 node_modules/.bin 路径和环境变量\$PATH 里面，检查命令是否存在。

  npx 可以调用项目内部安装的模块。
  老方法：

  ```
  $ node-modules/.bin/mocha --version
  ```

  用 npx：

  ```
  $ npx mocha --version
  ```

  npx 可以避免全局安装模块。

  ```
  $ npx create-react-app my-react-app
  ```

  上面代码运行时，npx 将 create-react-app 下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载 create-react-app。

- 位移操作符

  按位移动会先将操作数转换为大端字节序顺序(big-endian order)的 32 位整数,并返回与左操作数相同类型的结果。**右操作数应小于 32 位，否则只有最低 5 个字节会被使用**。

  ```javascript
  1 << 32; // 1
  1 << 31; // -2147483648
  1 << 30; // 1073741824
  ```

- Math.sign()

  Math.sign() 函数返回一个数字的符号, 指示数字是正数，负数还是零。

  ```javascript
  Math.sign(3); //  1
  Math.sign(-3); // -1
  Math.sign("-3"); // -1
  Math.sign(0); //  0
  Math.sign(-0); // -0
  Math.sign(NaN); // NaN
  Math.sign("foo"); // NaN
  Math.sign(); // NaN
  ```

  ployfill:

  ```javascript
  function sign(x) {
    x = +x; // 转换为数字
    if (x === 0 || Number.isNaN(x)) {
      // 0或NaN都返回自身，-0 === 0
      return x;
    }
    return x > 0 ? 1 : -1; // 整数返回1, 负数返回-1
  }
  ```

* throw

  throw 后可以跟任意类型，适合在请求时候，抛出服务器的响应，在 catch 中捕获，当成错误处理，拿到错误信息、错误码等。

* textarea 的样式

  为 textarea 设置以下样式，可以去掉其默认边框、默认右下角小三角符号、选中时的外边框，使其看起来像是一个内容创作区域

  ```css
  textarea: {
    overflow: visible;
    height: calc(100vh - 80px);
    font-size: 18px;
    padding: 16px;
    resize: none;
    border: none;
    outline: none;
  }
  ```

* 为第三方页面添加 jQuery 方便调试

```javascript
const s = document.createElement("script");
s.src = "https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js";
document.body.appendChild(s);
```

- egg.js 简介

  - 控制器：负责解析用户的输入，处理后返回相应的结果。

    框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：

    - 获取用户通过 HTTP 传递过来的请求参数
    - 校验、组装参数
    - 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求
    - 通过 HTTP 将结果响应给用户

  - 服务：服务就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

    - 保持 Controller 中的逻辑更加简洁
    - 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用
    - 将逻辑和展现分离，更容易编写测试用例

- npm 常识

  - npm ci：

    类似于 npm install，但多用于自动化环境，如测试、持续集成和部署。比常规的 npm install 快很多，也更严格。特点：

    - 项目必须有 package-lock.json;
    - npm ci 只能一次安装正个项目，无法添加单个依赖项；
    - 如果已经存在 node_modules，则在 npm ci 前将自动删除 node_modules；
    - 它不会写入 package.json 或 package-lock.json，安装基本上是冻结的；

  - peerDependencies 作用

    目的是提示宿主环境去安装满足插件 peerDependencies 所指定依赖的包，然后在插件 import 或 require 所依赖的包时，永远都引用宿主环境统一安装的 npm 包，最终解决插件与所依赖包不一致的问题。

- coverage

  chrome59 之后推出的 css/js 代码覆盖率检测工具，检查文件中未使用的代码，以优化性能。

- JPEG 压缩模式

  分为基线（顺序）、渐进式和无损

  - baseline（基线，又叫顺序）:最常见的简单的自上而下的方式编码和解码，也就是你常常看到一张图片从上倒下慢慢显示出来的情形。
  - 渐进式：将图像划分为多个扫描区域。第一次扫描以模糊或低质量设置显示图像，后续扫描可提高图像质量，也就是常常看到有些图片由模糊边高清的情形。
  - 无损：删除 EXIF 数据、优化图像的 Huffman 表或者重新扫描图像可达到无损压缩的目的。

  渐进式的优势在于用户可以很快看到一张模糊的图片，然后决定是否继续等待加载，比基线加载的用户体验好很多。

- BigInt

  在 JavaScript 中，Number 可以准确表达的最大数字是 253-1，大于等于 253 的所有数字可以使用 BigInt 表达。

  定义 BigInt 变量时，可以在一个整数后面加 n，如 10n；或者调用 BigInt()函数

  ```javascript
  const theBiggestInt = 9007199254740991n;
  // ↪ 9007199254740991n

  const alsoHuge = BigInt(9007199254740991);
  // ↪ 9007199254740991n

  const hugeButString = BigInt("9007199254740991");
  // ↪ 9007199254740991n
  ```

  BigInt 不能和 Number 一起混合运算，两者必须转换成同一种类型。当 BigInt 转成 Number 时小心丢失精度。

- Web Component

  可以使用[polymer](https://github.com/Polymer/polymer)体验 wc 组件

  或者用[stencil](https://github.com/ionic-team/stencil)，支持 tsx 写法，不必写原生的 html 字符串

  ```
  polymer serve --npm
  ```

  然后将其 Readme 中的代码片段复制成一个 html 文件即可

- for 循环嵌套顺序

  当循环次数相同时，外层循环次数越少的性能越好。

- parseInt(招行 2019/03 笔试题)

  ```javascript
  ["10", "10", "10", "10", "10"].map(parseInt);
  // [ 10, NaN, 2, 3, 4 ]
  ```

  传入 parseInt 的是 map 的两个参数 curValue, index, 即 parseInt('10', 0), parseInt('10', 1), parseInt('10', 2) ...

- github 中使用 emoji

  直接在 issue, commit 中使用即可[emoji](https://www.webfx.com/tools/emoji-cheat-sheet/)

- npm-script 在 mac 和 win 平台的差异

  如要在一段 npm 脚本中执行多个项目的启动，例如:

  ```json
  "start": "npm run pro1 & npm run pro2 & npm run pro3"
  ```

  在 Mac 上，这样做的没问题的，但是到了 win 上，就只会执行 npm run pro1，因为 cmd.exe 不认得‘&’程序后台执行的符号。

  解决办法：使用 npm-run-all 库即可完美结局 win 上无法执行的问题

- HTML id

  关于 html 中的 id 属性：使用除 ASCII 字母、数字、\_、- 和 . 以外的字符可能会造成兼容性问题，因为 HTML 4 中不允许使用它们。虽然这个限制在 HTML5 中被解除了，但为兼容性考虑 ID 应该以字母开头。

  在 gatsby.js 构建的文档页面中，发现在元素 id 为中文时，默认的设置无法使页面内锚点成功跳转，而 id 为英文时则一切正常。

  解决办法：将中文的 id 进行 encodeURI 编码后，即可正常使用锚点跳转。

  **注：**在 vuePress 中进行锚点跳转时，发现其元素 id 为中文的情况下，依然正常，有待研究。

- HTTP PATCH 方法

  patch 方法时，当要传入的 data 是 json 类型时，请求头中的 content-type 可以写成 application/merge-patch+json

  ```
  methods: 'PATCH',
  headers: {
    'content-type': 'application/merge-patch+json'
  }
  ```

- box-shadow： inset

  如果没有指定 inset，默认阴影在边框外，即阴影向外扩散。

  使用 inset 关键字会使得阴影落在盒子内部，这样看起来就像是内容被压低了。 此时阴影会在边框之内 (即使是透明边框）、背景之上、内容之下。

- prefetch VS preload

  [参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Link_prefetching_FAQ)。

  经测试，如果 prefetch 的资源放在了 head 中，会比 webp(图片)资源先加载，会阻塞图片的渲染。

- win10 虚拟桌面

  现象：打游戏时偶尔误触 win 键（+其他键）就悲剧地切到了第二个桌面。

  win + Tab：虚拟桌面的列表

  win + Ctrl + D ：创建新的虚拟桌面

  win + Ctrl + F4：删除当前虚拟桌面

  win + Ctrl + 左/右方向键：切换到相邻的虚拟桌面

- css 非选择器

  例如：

  ```css
  a.active {
    border-radius: 100px;
    box-shadow: 0 8px 16px 0 rgba(85, 188, 138, 0.36);
    background-color: #55bc8a;
    border-color: #55bc8a;
  }
  a:hover:not(.active) {
    color: #55bc8a;
  }
  ```

  即可排除类名为 active 的 <a> 标签的 hover 时的样式 </a>

- css +选择器

  B + E: 用于匹配 B 元素的下一个兄弟元素 E

  例如：

  ```css
  .groupItem {
    position: relative;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
    transition: all 0.3s ease-in-out;
  }
  .groupItem + .groupItem {
    margin-top: 12px;
  }
  ```

  即可设置除第一个 groupItem 元素外的其他所有 groupItem 元素的上外边距为 12px

- HTML5 a 标签实现下载

  ```html
  <a href="/static/img1.jpg" download="下载图片">下载</a>
  ```

  在 href 属性中填入 URL，并指定 download 属性，即可实现下载资源。如果给 download 属性赋值，则会影响下载的文件名。

  **注意**，该属性适用于同源 URL，否则默认跳转。尽管 HTTP URL 需要位于同一源中，但是可以使用 blob: URL 和 data: URL ，以方便用户下载使用 JavaScript 生成的内容（例如使用在线绘图 Web 应用程序创建的照片）。

  此时，就需要使用 blob: URL 或 data: URL 进行兼容处理：

  ```typescript
  const download = (href: string, name = "pic") => {
    const eleLink = document.createElement("a");
    eleLink.download = name;
    eleLink.href = href;
    eleLink.click();
    eleLink.remove();
  };

  export const downloadByData = (url: string, name: string) => {
    const image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(image, 0, 0, image.width, image.height);
      const ext = image.src
        .substring(image.src.lastIndexOf(".") + 1)
        .toLowerCase();
      const dataURL = canvas.toDataURL(`image/${ext}`);
      download(dataURL, name);
    };
  };

  // 使用时
  <a onClick={() => downloadByData(imageUrl, "图片名")}>下载图片</a>;
  ```

- html 缓存解决办法

  [参考 github 上 antd 的 issue](https://github.com/ant-design/ant-design-pro/issues/1365#issuecomment-384496088)

- encodeURI 和 encodeURIComponent 区别

  两者都可以对 URI 进行编码，使用一到四个转义序列来表示字符串中的字符的 UTF-8 编码

  encodeURI 不会替换以下字符：;、,、/、?、:、@、&、=、+、\$、字母、数字、-、\_、.、!、~、\*、'、(、)、#

  encodeURIComponent 会转义除了字母、数字、(、)、.、!、~、\*、'、-和\_之外的所有字符。

- VSCode 中查找/替换字符串

  可以点击使用‘正则表达式’来进行高级查找

  比如，我需要将复制过来的 JSON 数据字符串转成 TS 的接口中的 string："(\S+)" 替换成 string（改进版：'(?!@)(\S\*)'，可以匹配''，而且不会匹配'@/type/xxxx'之类的引用文件）

- VSCode 项目插件及设置

  项目根目录下创建.vscode 目录，编写其中的 setting.json、extensions.json 文件，

  ```json
  // setting.json
  {
    "search.exclude": {
      "**/node_modules": true,
      "dist": true,
      "yarn.lock": true
    },
    "editor.formatOnSave": true,
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[markdown]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact"
    ],
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true
    },
    // 使用 stylelint 自身的校验即可
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false
  }
  ```

  ```json
  // extension.json
  {
    "recommendations": [
      "jerryhong.autofilename",
      "streetsidesoftware.code-spell-checker",
      "dsznajder.es7-react-js-snippets",
      "dbaeumer.vscode-eslint",
      "eamodio.gitlens",
      "esbenp.prettier-vscode",
      "stylelint.vscode-stylelint",
      "ms-vscode.vscode-typescript-tslint-plugin"
    ]
  }
  ```

  使用时在插件扩展中

- ES6 中 String.prototype.startsWith()

  接受两个参数

  ```javascript
  str.startsWith(searchString[, position])
  ```

  如果在字符串的开头找到了给定的字符则返回 true；否则返回 false。

- Javascript 引擎

  - Interpreter（解释器） VS Compiler（编译器）

    - Interpreter 逐行读取代码并立即执行
    - Compiler 读取整个代码，进行一些优化，然后生成优化后的代码

    区别：

    - Interpreter 逐行将源代码转换为等效的机器代码
    - Compiler 在一开始就将所有源代码转换为机器代码

    优缺点：

    - Interpreter 的优点是无需等待编译即可立即执行代码。这对浏览器中运行 JS 提供了极大的便利，因为所有用户都不想浪费时间在等待代码编译这件事上。但是，当有大量的 JS 代码需要执行时会运行地比较慢。比如一个两常数相加的函数被调用了 10000 次，他的输出始终是个常数，这时 Interpreter 还是逐行执行，就会比较慢。

      同样的情况下，Compiler 可以通过用函数执行结果代替循环来进行一些优化，优化后的代码会使用更短的时间执行完。

  - JIT（Just In Time）Compiler

    它是 Interpreter 和 Compiler 的结合，现今的大多数浏览器都在更快、更高效地实现此功能。

  - Parser

    Parser 是一种通过各种 JavaScript 关键字来识别、分析和分类程序各个部分的解析器。例如，它可以区分代码是一个方法还是一个变量。

  - AST（抽象语法树）

    AST 是基于 Parser 的分类构造树状结构。AST 将被提供给 Interpreter 生成 ByteCode 。ByteCode 可被执行，用户无需等待。

  - Profiler （分析器）

    Profiler 将查找可以被优化的代码，然后将它们传递给 Compiler。Compiler 生成优化代码的同时，浏览器暂时用 ByteCode 执行操作。并且，一旦 Compiler 生成了优化代码，优化代码将完全替换掉临时的 ByteCode。

  - ByteCode

    作为机器代码，ByteCode 不能被所有计算机理解及执行。它仍需要像虚拟机或 V8 引擎这样的中间件才能将其转换为机器可读的语言。

* 所以 JavaScript 是一门解释型语言吗

  JavaScript 是但不完全是一门解释型语言。JS 诞生初只有 Interpreter。但是现在的引擎不仅包括了 Interpreter，还有 Compiler。因此，严格来说，这完全取决于引擎是如何实现的。

* css 动画与硬件加速

  如果要实现一个小球向左平移运动 200px，可以用改变 top 属性实现，也可以用 translate 来实现。但是两者实现效果在性能上的表现完全不同。

  - layer（层）

    层的意义在于，当我们改变一个容器的样式时，只影响它自己，无需重绘，直接通过在 GPU 中改变纹理的属性来改变样式。

    因此，从层的角度来看浏览器的渲染过程：

    1. 获取 DOM 并将其分割为多个层(RenderLayer)
    2. 将每个层栅格化，并独立的绘制进位图中
    3. 将这些位图作为纹理上传至 GPU
    4. 复合多个层来生成最终的屏幕图像(终极 layer)

    类似与 ps 中的图层。我们可以将某个 css 动画或某个 js 交互效果抽离到一个单独的渲染层，来达到加速渲染的目的。

    #### 创建层

    - `3d transform`属性
    - `backface-visibility`为`hidden`的元素
    - 使用加速视频解码的 `<video>` 元素
    - 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 `<canvas>` 元素
    - 混合插件(如 Flash)
    - 对 opacity、transform、fliter、backdrop-filter 应用了 animation 或者 transition（需要是 active 的 animation 或者 transition，当 animation 或者 transition 效果未开始或结束后，合成层也会失效）
    - will-change 设置为 opacity、transform、top、left、bottom、right（其中 top、left 等需要设置明确的定位属性，如 relative 等）
    - 元素有一个包含复合层的后代节点(换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里)
    - 元素有一个 z-index 较低且包含一个复合层的兄弟元素(换句话说就是该元素在复合层上面渲染)

    在 webkit 内核的浏览器中，如果有上述情况，就会创建一个独立的层(layer)。可以借助 chrome 浏览器开发者工具中的 layers 和 rendering 结合来查看页面中有哪些独立的层。

  - 性能对比

    通过改变 top 属性的方式每一帧的绘制都要经过不停的 rending 和 painting；

    而通过改变 translate 的方式则不需要，因为它借助了 GPU 加速。

  - 适当使用硬件加速

    过度开启硬件加速会适得其反：

    1. 内存。创建一个新的渲染层，需要消耗额外的内存和管理资源，如果渲染层的个数过多，很容易引起内存问题，这一点在移动端浏览器上尤为明显，可以引起电池耗电量的上升，降低电池的寿命。所以，一定要牢记不要让页面的每个元素都使用硬件加速，当且仅当需要的时候才为元素创建渲染层。
    2. 使用 GPU 渲染会影响字体的抗锯齿效果。文本在动画期间有可能会显示的模糊。

- Promise.allSettled()

  随着 ES2020 发布后，可使用，主流浏览器中仅 IE 不兼容（IE 也不主流了-\_-||）。
  该方法返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

  相比 Promise.all()，更适合想知道每个 promise 结果时使用它，而不是遇到 reject 就结束了。

* Base64 编码、解码

  window:

  atob()，btoa()方法均在 window 对象上

      **atob():** 解码一个 Base64 字符串。

      **btoa():** 从一个字符串或者二进制数据编码一个 Base64 字符串。

  node:

  node 中直接使用 Buffer 即可实现：

  ```javascript
  Buffer.from("中文大侠").toString("base64");
  // '5Lit5paH5aSn5L6g'
  Buffer.from("5Lit5paH5aSn5L6g", "base64").toString("utf-8");
  // '中文大侠'
  ```

- Number.prototype.toString([radix])

  返回指定 Number 对象的字符串表示形式。

  可选参数 radix：指定要用于数字到字符串的转换基数，必须从 2 到 36 （0-z 共 36 个），如果未指定，则默认 10。

- css background-position：

  当使用 background-size: cover 时，最好调整一下 background-position，以至于图片中的主体可以呈现在合适的位置上（设计希望的位置）

- yarn 安装 node-sass 失败时

  - 第一步：更改镜像源
    ```
    yarn config set registry https://registry.npm.taobao.org -g
    ```
  - 第二步：配置 node-sass 的二进制包镜像地址
    ```
    yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
    ```

- Array.prototype.flatMap()

  将数组内元素打平

  ```javascript
  let a = [[1], [2], [3], [4, 5]];
  a.flatMap((i) => i); // [1, 2, 3, 4, 5]
  ```

- https 证书安装

  以 Nginx 为例：

  在云服务器控制台下载证书，上传到服务器，如果 nginx 没有安装 ssl 模块，则需要在源目录出安装 ssl 模块，再配置 conf 文件，重启后生效

- 目前 Javascript 中共有 8 种数据类型，其中 7 种基本类型：String, Number, BigInt, null, undefined, Boolean, Symbol，以及 Object
- Cmder 修改默认打开路径：

  - setting/Startup/Tasks
  - 选择需要修改的 task（比如{bash::bash}）
  - 在参数后新增（前面有空格）,即可将默认打开路径修改为 /d/

    ```
     -new_console:d:D:\
    ```

- JSON.stringify

  参考[文章](https://mp.weixin.qq.com/s/X7pzcNo_CTM-syS-sfHwwg)

  - 可传递第二个参数

- JSON Merge Patch & JSON Patch

- [Math.sign(x)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)

  是 Math 的静态方法，判断参数是**正数、负数、正零、负零、NaN**。将对传入的参数隐式类型转换成数字类型。

  - Polyfill

    ```javascript
    if(!Math.sign) {
      Math.sign = function (x) {
        x = +x // 转换为数字类型
        if (x === 0 || isNaN(x)) { // 0, -0, NaN直接返回
          return x
        }
        return x > 0 : 1 ? -1
      }
    }
    ```

    优雅版：

    ```javascript
    Math.sign = function (x) {
      return (x > 0) - (x < 0) || +x; // - 优先级高于 || ，因此可以不加最外层括号
    };
    ```

  - 应用：翻转带符号的整数

    ```javascript
    const reverseNumber = (x) =>
      Number((x * Math.sign(x)).toString().split("").reverse().join("")) *
      Math.sign(x);
    ```

  - atob/btoa 中文转码问题

    btoa 方法仅支持 ASCII 编码，我们在转换中文的时候就需要先将中文转换为 ASCII 字符序列，再通过 btoa 进行 base64 编码, 借助 encodeURIComponent 和 decodeURIComponent 方法:

    ```javascript
    window.btoa(encodeURIComponent("中文"));
    // "JUU0JUI4JUFEJUU2JTk2JTg3"
    decodeURIComponent(window.atob("JUU0JUI4JUFEJUU2JTk2JTg3"));
    // "中文"
    ```

    以上方法仅支持中文转码，特殊字符仍旧是乱码，因此借助 unescape 和 escape 实现增强版：

    ```javascript
    function utf8_to_b64(str) {
      return window.btoa(unescape(encodeURIComponent(str)));
    }

    function b64_to_utf8(str) {
      return decodeURIComponent(escape(window.atob(str)));
    }

    utf8_to_b64("✓ à la mode"); // "4pyTIMOgIGxhIG1vZGU="
    b64_to_utf8("4pyTIMOgIGxhIG1vZGU="); // "✓ à la mode"
    utf8_to_b64("I \u2661 Unicode!"); // "SSDimaEgVW5pY29kZSE="
    b64_to_utf8("SSDimaEgVW5pY29kZSE="); // "I ♡ Unicode!"
    ```

    由于 escape / unescape 方法已被标准废弃，故不建议再使用，因此稳定增强版来了：

    ```javascript
    function b64DecodeUnicode(str) {
      // Going backwards: from bytestream, to percent-encoding, to original string.
      return decodeURIComponent(
        atob(str)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    }
    ```

- form 中的 button 默认 type="submit"

  在 form 中的 button 元素，如果不指定 type 属性，则 type 默认为 submit，默认行为会将表单数据提交给服务器；如果不想默认提交，则应指定 button 的 type="button"，这样就不会有默认事件；

- CSS3 根据子元素数量为其定义不同样式

  [参考](https://lightcss.com/styling-children-based-on-their-number-with-css3/)

- 根据字符串生成唯一确定的 hex 颜色

  ```javascript
  export const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };
  ```

- 国内 github 镜像提速:

  github.com.cnpmjs.org 替换 github.com 即可

  ```
  git clone https://github.com.cnpmjs.org/golang/tools.git
  ```

- lodash 的*.pickBy, *.omitBy 方法返回一个使得断言函数为真的对象：

  ```javascript
  var object = { a: 1, b: "2", c: 3 };

  _.pickBy(object, _.isNumber); // {'a': 1, 'c': 3}
  _.omitBy(object, _.isNumber); // {'b' : '2'}
  ```

- window.crypto.getRandomValues

  cryptoObj.getRandomValues(typedArray) 方法让你可以获取符合密码学要求的安全的随机值。其中 typedArray 是一个基于整数的 TypedArray，它可以是 Int8Array、Uint8Array、Int16Array、 Uint16Array、 Int32Array 或者 Uint32Array。在数组中的所有的元素会被随机数重写。**生成的随机数储存在 typedArray 数组上。** 即 cryptoObj.getRandomValues 方法会改变传入的 typedArray 参数。

- chromium 中 setTimeout 的 4ms 设置逻辑：

  ```c++
  static const int maxIntervalForUserGestureForwarding = 1000; // One second matches Gecko.
  static const int maxTimerNestingLevel = 5;
  static const double oneMillisecond = 0.001;
  // Chromium uses a minimum timer interval of 4ms. We'd like to go
  // lower; however, there are poorly coded websites out there which do
  // create CPU-spinning loops.  Using 4ms prevents the CPU from
  // spinning too busily and provides a balance between CPU spinning and
  // the smallest possible interval timer.
  static const double minimumInterval = 0.004;
  ```

  ```c++
  double intervalMilliseconds = std::max(oneMillisecond, interval * oneMillisecond);
  if (intervalMilliseconds < minimumInterval && m_nestingLevel >= maxTimerNestingLevel)
    intervalMilliseconds = minimumInterval;
  ```

  由此可知在 chromium 中下列代码的输出：

  ```javascript
  setTimeout(() => console.log(5), 5);
  setTimeout(() => console.log(4), 4);
  setTimeout(() => console.log(3), 3);
  setTimeout(() => console.log(2), 2);
  setTimeout(() => console.log(1), 1);
  setTimeout(() => console.log(0), 0);

  // 1
  // 0
  // 2
  // 3
  // 4
  // 5
  ```

- [在线 AST](https://astexplorer.net/#/Z1exs6BWMq)
- [eventSource](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/EventSource)

- [逗号操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comma_Operator)：

  [参考文章](https://javascriptweblog.wordpress.com/2011/04/04/the-javascript-comma-operator/)，才知道逗号可以做为操作符，而不仅仅是分隔符，例如：

  ```javascript
  // 实现斐波那契数列
  function Fab(n) {
    for (var i = 2, r = [0, 1]; i < n; r.push(r[i - 1] + r[i - 2]), i++);
    return r;
  }

  Fab(15);
  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
  ```

  不同于`&&`和`||`操作符，逗号操作符会执行两边的表达式，即：

  ```markdown
  // (LHE: left hand expression, RHE right hand expression)

  LHE && RHE

  1. Always evaluate LHE
  2. If LHE is true, evaluate RHE

  LHE || RHE

  1. Always evaluate LHE
  2. If LHE is false, evaluate RHE

  LHE, RHE

  1. Always evaluate LHE
  2. Always evaluate RHE
  ```

- 空值合并运算符（nullish-coalescing-operator）

  ```javascript
  const name = data?.spec?.template?.spec?.metadata?.name ?? "defaultName";
  ```

  如果它左侧表达式的结果是 undefined，name 就会取右侧的 defaultName；
  如果使用 || 短路操作符的话，当左侧表达式的值是 0 、空字符串等 [falsy 值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)，结果就不同了，因此还需要额外判断。
  故 ?? 就是为了取代 ||，来设置默认值的。

  falsy：

  - false
  - 0
  - -0
  - 0n
  - "", '', ``
  - null
  - undefined
  - NaN

- chrome 扩展杂记

  [chrome create new tab](https://developer.chrome.com/docs/extensions/reference/tabs/#method-create)
  [chrome message passing 新 API 全指南](https://juejin.cn/post/6844903823115304973)

- Webpack

  [Webpack 中文文档](https://webpack.docschina.org)

  - [DefinePlugin](https://webpack.docschina.org/plugins/define-plugin/)

    允许在编译时创建配置的全局常量

- Parcel

  [Parcel 中文文档](https://zh.parceljs.org/getting_started.html)
  如果遇到 regeneratorRuntime is not defined 的报错时，是使用了 async/await 导致的， 可在 package.json 中设置
  browserslist 来解决，如：

  ```json
  {
    "browserslist": ["last 1 Chrome version"]
  }
  ```
