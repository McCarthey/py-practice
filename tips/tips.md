# 记一些杂事儿

```javascript
// 用于判断div是否滚动到底部
if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    console.log('已经滚动到底')
}
```

# 杂事儿

两个 width:50%的行内元素（inline-block）并排放置，中间会有间隙（这个间隙来自你的标记中行内元素间的空白），因此第二个元素会换到下一行
要删除这个间隙，需要在 HTML 中通过注释删除空白（右）
例如：

```html
<div class="half">50% wide</div><!-- --><div class="half">50% wide</div>
```

# 杂事儿

-   善用 Array.prototype.every 和 filter 会节省很多代码 - vue 中 computed 属性中默认只设置了 getter 函数，我们还可以添加 setter 函数

-   以下样式可以在 webkit 浏览器中模拟 macOS 中的滚动条样式:

```css
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 4px;
}
```

-   最近 DOM API 中的 Element.scrollIntoView() 可以通过传入配置对象来实现平滑滚动（不再需要 jQuery 了）：

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

-   position: sticky; 粘性定位 需要指定 top,bottom,left,right 之一才可以实现粘性效果 - 利用 css shape-outside 可以让内联元素以不规则的形状进行外部排列（可以实现刘海屏的适配）
    且元素必须是浮动元素，以下是绕开刘海屏的实现

```css
.shape {
    float: left;
    shape-outside: polygon(0 0, 0 150px, 16px 154px, 30px 166px, 30px 314px, 16px 326px, 0 330px, 0 0);
}
```

-   多行省略
    块级元素，webkit 浏览器有效，其他浏览器需指定最大高度

```css
width: 308px;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
word-break: break-word;
word-wrap: normal;
```

-   placeholder 颜色

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

块级元素，webkit 浏览器有效，其他浏览器需指定最大高度

```css
width: 308px;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
word-break: break-word;
word-wrap: normal;
```

-   window 对象

调用 window.close()，可以关闭当前页面

-   PWA
    serviceWorker 除了由浏览器触发更新之外，还应用了特殊的缓存策略：如果该文件 24 小时没有更新，当触发更新时，会强制更新。也就意味着最坏情况下 service Worker 会每天更新一次。
    serviceWorker 标准中给出了 ServiceWorkerRegistrantion.update()放法，调用该方法会导致立即调用 Service worker。但 chrome 貌似还是不会跳过 http 缓存，此处实现和标准尚存差异。

*   判断对象是否为空{}
    利用 Object.keys 遍历对象的可枚举属性，并返回一个由属性名组成的数组，通过判断这个数组的长度来检查对象是否是空

```
    const obj = {}
    Object.keys(obj).length === 0
```

-   边框渐变

```
    border-image: linear-gradient()
```

能够实现盒子边框的颜色渐变，但此时 border-radius 属性无效，故无法简单地实现一个圆角边框渐变效果

-   word-wrap 由于和 word-break 属性语意过于相似，故在 css3 规范中更名为 overflow-wrap，但只有 chrome/safari 支持

-   map

```javascript
let list = [1, 3, 5, 76, 123, 412, 3]
let result = list.map(v => (v = v * 2))
console.log(result) // [2, 6, 10, 152, 246, 824, 6]
```

-   node child processes 模块
    利用 child_process 模块的 exec 对象写 shell 脚本，需要注意：

```javascript
exec('shell命令', (err, stdout, stderr) => {
    if (err) throw err
    // 命令执行成功后要做的事情
})
```

-   外链

```
target="_blank"
```

当使用 target="\_blank" 链接至另一个页面时，新页面将与您的页面在同一个进程上进行。如果新页面正在执行开销极大的 JavaScript，您的页面性能可能会受影响。
此外，target="\_blank" 也是一个安全漏洞。新的页面可以通过 window.opener 访问您的窗口对象，并且它可以使用 window.opener.location = newURL 将您的页面导航至不同的网址。（可怕）

一般情况下，当您在新窗口或标签中打开一个外部链接时，始终添加 rel="noopener"

```html
<a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>
```

-   引用资源预加载
    <link>元素的rel属性的属性值preload能够让你在你的<head>元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即可需要的。对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。例如：

```html
 <link rel="preload" href="style.css" as="style">
 <link rel="preload" href="main.js" as="script">
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
应用：
参见本项目html-css-js目录下的 pseudo-element.html 中的卡片阴影样式


- 滚动到页底加载更多的实现
可以使用intersectionObserver实现
思路：
- 页面底部放置一个id为load-more的元素
- 使用intersectionObserver.observer监听这个元素，这个元素一旦出现，就将分页数+1，发送请求
注意：
- 因为一开始是没有数据的，因此load-more元素不显示，此时无法设置intersectionObserver.observer监听，会报错
- 注意开始监听的时机，不可重复监听，页面销毁/没有更多数据时，要取消监听
实现：
设置一个load-more元素，此时 showLoadMore===fasle ，即不显示加载更多
```html
<p id="next-page" class="load-text" v-if="showLoadMore">{{loading?'Loading...':'Load More'}}</p>
```
异步ajax函数如下：
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
- 规格写明，IntersectionObserver的实现，应该采用requestIdleCallback()，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。



- css实现弹框居中
```css
    .dialog_box {  /* 弹框样式 */
        display: inline-block;
        vertical-align: middle;
        position: relative;
        width: 400px;
        height: 300px;
        background: #fff;
    }
    .dialog_container {  /* 遮罩层 */
        text-align: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.35);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
    /* 垂直居中关键 */
    .dialog_container::after {
        display: inline-block;
        content: '';
        width: 0;
        height: 100%;
        vertical-align: middle;
    }
```
首先用100vw, 100vh撑满整个视图窗口, 颜色设置透明度, 位置固定在视口左上角, 层级要比页面内容高。
水平居中：设置遮罩容器的text-align: center; 弹框的display: inline-block;（弹框长宽随意设置）
垂直居中：实现的关键在于遮罩容器的伪元素::after。该伪元素display: inline-block; 使其与弹框同一行; 宽度为0, 高度设置为100%, 最最关键的属性就是vertical-align: middle;
这样弹框和伪元素就在同一行内实现了垂直居中。伪元素的宽度为0，因此不会影响弹框的水平居中


- font-display 属性:

参考[文章](https://developers.google.com/web/updates/2016/02/font-display)戳这里
大意：
在网络字体没有加载完成时，页面字体的表现


- cookie
服务器通过设置cookie属性为httpOnly，则可以防止浏览器端使用JS访问

- v-show  VS  v-if
v-if是真正的条件渲染，如果为false的话，DOM元素不会渲染上。而且如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
v-show不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

- vue轮播动画效果实现
思路：
一个宽度固定的容器，作为用于展示轮播图的窗口；
容器里包裹着一个由将要展现的元素（通常是图片）组成的超长容器；
通过两个按钮来控制前一个/后一个元素；
维护一个current变量，用于记录当前元素展示的序号；
当前元素改变时，通过改变超长容器的类名来动态改变他的left值，以控制窗口展示的元素。
适当添加动画效果即可

优势：
配合vue/react以及sass/less使用，仅需少量代码即可实现轮播效果，简单

劣势：
可拓展性、可移植性不强

- 关于table布局？
td display: inline-block;

- p元素文字强制不换行
```css
white-space: nowrap;
```

- 图片png与jpg 
在无需透明度的情况下 可以抽离掉png图片的alpha通道以减少体积；或者换成jpg，能有效缩减体积

- 判断浏览器是否支持webp图片
```javascript
var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;

console.log(isSupportWebp);
```

- 对象扩展运算符...
```javascript
var player = {name:'Jack', age: 24, job: 'engineer', country: 'china'}
var newPlayer = {...player, name: 'Sam',age: 25}
console.log(newPlayer) // {name: 'Sam', age: 25, job: 'engineer', country: 'china'}
```
对象扩展运算符可以用以复制/继承另一个对象，并改写他的属性，类似于Object.assign()，因此上下两部分代码等价:
```javascript
var player = {name:'Jack', age: 24, job: 'engineer', country: 'china'}
var newPlayer = Object.assign({}, player, {name: 'Sam', age: 25})
console.log(newPlayer) // {name: 'Sam', age: 25, job: 'engineer', country: 'china'}
```


- 构造函数模式的劣势
例如，本库中data-structure目录下的stack.js中，使用构造函数模式模拟了栈（具体实现请看代码，此处略）
```javascript
function Stack(){
    ...
}

const stack1 = new Stack()
const stack2 = new Stack()
```
此处初始化两个栈的实例对象。单看代码是没有问题的，简单明了。但是，这两个实例的方法是不同的函数引用，也就是说构造函数的每个方法都要在每个实例上重新创建一遍，可如此检验：
```javascript
console.log(stack1.pop === stack2.pop) // false
```
因此，不同实例上的同名函数是不相等的。可将构造函数中的方法移动到全局，在构造函数内部引用，这样就可以使不同的实例共享相同的方法了。但是这种方式并不推荐，因为会增加很多全局函数，而且这些函数仅是为了给某个对象调用，显然不合理，因此构造函数模式比较适合单例场景。这些问题可由原型模式解决。

- 对称加密与非对称加密

[浅显易懂](https://mp.weixin.qq.com/s/T0e-Zu-SPK0g_ng8Or-APg)
对称加密：服务器与客户端使用同样的规则加密解密信息

非对称加密：服务器发送给客户端一个加密规则，客户端用此（公钥）对信息进行加密，服务器用自己的私钥解密。

非对称加密如何相信用于加密的公钥？通过可以使用可信任的第三方的签名，即证书，来保证其不可伪造性

非对称加密更慢，消耗更多性能，因此非对称加密只用来加密用于确定对称加密的密码信息（对称加密的规则）,剩下的使用更高效的对称加密通信

- Git多人协作工作模式
    
    - 首先，可以试图用git push origin branch-name推送自己的修改；
    - 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
    - 如果合并有冲突，则解决冲突，并在本地提交；
    - 没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！
    - 如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。


- 元素滚动到底部

场景：监听并打印新消息，假设消息窗口元素节点为msgBox，只需在消息监听函数里加上msgDiv.scrollTop = msgDiv.scrollHeight，即可实现滚动到底部
```javascript
    socketMessageEvent(e) {
        console.log(`Message from server: ${e.data}`)
        // 打印消息数据，并滚动到底部
        this.msg.push(e.data)
        this.msgBox.scrollTop = this.msgBox.scrollHeight
    },
```

- document对象

    document对象上有一些实用的属性：
    
    - title: 可以通过document.title读取并设置页面标题，读取的即是```<title>```元素中的文本，但是不会改变页面中的```<title>```元素
        ```javascript
            const oldTitle = document.title
            document.title = 'New page title'
        ```
    - URL: URL属性包含当前页面的完整标题，即地址栏中显示的URL，读取时等同window.location.href
        ```javascript
            document.URL === window.location.href
        ```
        
    - domain: domain属性值包含页面的域名
    - referrer： referrer属性保存着链接到当前页面的那个页面的URL。
    
    其中title，domain属性是可以设置的，但是出于安全限制，domain不能被设置成URL中不包含的域
    
- DOM操作相关

getElementsByTagName()方法会返回一个HTMLCollections对象，该对象与NodeList非常相似。可以使用[]或item()访问该对象中的项。其中[]中可以是数字索引，或字符串。字符串代表要查找的元素的name属性的值，方便查找已命名的元素，等同于调用namedItem(name)方法。

要想获得全部元素组成的HTMLCollection，如下：
```javascript
    var allElements = document.getElementsByTagName('*')
```

- python 字符串模板
较新的python版本模板字符串可以这样写：
```python
    f'Your email is {email} , your password is ***'
```
简洁，类似于ES6