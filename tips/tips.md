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

-   伪元素
    :before 和:after 是在 CSS2.1 中发布的。起初伪元素的语法是使用一个冒号“:”，但是随着 web 的发展，在 CSS3 中伪元素使用两个冒号“::”——也就变成了::before 和::after——以便将它与伪类区分开（如:hover，:active 等）。然而，不管你使用单冒号还是双冒号，浏览器都能识别它们。但是**IE8 只支持单冒号的格式**，如果你想要保持广泛的浏览器兼容性，使用单冒号会更安全。
    可以给伪元素添加任何样式。伪元素默认为**内联元素**，因此若要指定宽高，则需声明 display:block;。最好使用 background 属性来设置伪元素的背景图片，这比直接在 content 中使用 url()更容易控制。即使不使用 content 属性，也必须写上，可设置为空，否则伪元素无法正常工作。

我们可以结合使用伪元素和伪类：

```css
blockquote:hover:after,
blockquote:hover:before {
    background-color: #555;
}
```


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
async getVerifyList(btn) {
    ...
    try {
        this.loading = true   // 开始loading
        const res = await this.vxGetVerifyList({
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
        console.log('获取认证历史列表报错', e)
    }
},
```