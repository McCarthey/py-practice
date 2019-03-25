#### 表达式特殊运算符
- 安全导航操作符 ( ?. ) 

    Angular 的安全导航操作符 (?.) 是一种流畅而便利的方式，用来保护出现在属性路径中 null 和 undefined 值。 下例中，当 currentHero 为空时，保护视图渲染器，让它免于失败。
    以避免出现 a && a.person && a.person.name 这种表达。

#### 组件样式
- :host宿主选择器：用来选择组件宿主元素中的元素（相对于组件模板内部的元素）。
    ```css
    :host {
        display: block;
        border: 1px solid black;
    }
    ```
- :host-context：它在当前组件宿主元素的祖先节点中查找 CSS 类， 直到文档的根节点为止。
    ```css
    :host-context(.theme-light) h2 {
        background-color: #eef;
    }
    ```
- ::ng-deep：强制一个样式对各级子组件的视图也生效，它不但会作用于组件的子视图，也会作用于投影进来的内容(ng-content)。
    ```less
    :host {
        ::ng-deep {
            h3 {
                font-style: italic;
            }
        }
    }
    ```