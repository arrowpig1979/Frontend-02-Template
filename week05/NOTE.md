### 学习笔记

### HTML Spec 

[HTML Spec Link ](https://html.spec.whatwg.org/multipage/)

#### ... 展开函数

<code>

    function addCSSRules(text){
        var ast = css.parse(text);
        console.log(JSON.stringify(ast, null, "   "));
        rules.push(...ast.stylesheet.rules);
    }

</code>

### 复制数组

Array.slice()  不带参数来做数组复制

<code>

    let stack = [{type:'document', children:[]}];
    stack.slice();

</code>

### css specification

<code>

    [inline,  id,   class,   tag]
 

</code>

### Flexbox Layout

[Flexout Layout Guidance](https://drafts.csswg.org/css-flexbox)
