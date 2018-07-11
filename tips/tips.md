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

```
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

```
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

```
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
