#### 表达式特殊运算符
- 安全导航操作符 ( ?. ) 

    Angular 的安全导航操作符 (?.) 是一种流畅而便利的方式，用来保护出现在属性路径中 null 和 undefined 值。 下例中，当 currentHero 为空时，保护视图渲染器，让它免于失败。
    以避免出现 a && a.person && a.person.name 这种表达