### 学习笔记

#### https://w3.org/TR  爬虫

<code>

    Array.prototype.slice.call(document.querySelector("#container").children).filter(e=>e.getAttribute('data-tag').match(/css/)).map(e=>({name:e.children[1].innerText, url:e.children[1].children[0].href}))

</code>

#### 爬虫的展开解释
document.querySelector("#container").children 的返回类型是 HTMLCollection, 而HTMLCollection 的 \_\_proto\_\_ 是 HTMLCollection, 其上级 \_\_proto\_\_ 就已经是Object了，而 HTMLCollection是没有 **filter** 函数的。

[Array.prototype.slice.call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组, 比如可以把HTMLCollection转成 **Array** 类型。可以转化的原因是 HTMLCollection 实现了？？？

e=>e.getAttribute('data-tag').match(/css/)  选出data-tag中含 css 的元素


e=>({name:e.children[1].innerText, url:e.children[1].children[1].children[0].href}) 外围的()的作用是？没有()会报错

<code>

    /* 如果e=>{} 而不是 e=>({})*/
    map(e=>{name:e.children[1].innerText, url:e.children[1].children[1].children[0].href})

    Uncaught SyntaxError: Unexpected token ':'

    //map(e=>({})) 就相当于 
    
    map(function(e)){
        return {}  //返回一个对象
    });  
    
    //而map(e=>{}) 就相当于 
    map(function(e){
        {} // 没有返回值
    });

</code>

#### CSS Selector 正则表达式的理解

<code>

    /(?<tagName>[a-z]+)?(?:(?<operator>[#.])(?<opValue>[a-zA-Z0-9-_]+)|(?<attribute>\[[a-z]+(?:[\^$~*|]?=[a-zA-Z0-9:_'"\\]+\s*(?:[iIsS])?)?])|(?<pseudoOperator>:{1,2})(?<pseudo>[a-z]+(?:-[a-z]+)?(?:\([a-z0-9+*]*\))?))/

</code>


#### 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

[::first-line](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line) 没有定义 float
而
[::first-letter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter) 定义了 float