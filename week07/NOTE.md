### 学习笔记

#### 标签，元素，节点，盒 的区别

- 节点是 DOM 中的概念，表示DOM 树中的一个Node。所以节点提供了操作树型数据结构的一种描述方法。
- 元素有很多类型，比如标签元素，一个p 标签元素含\<p>标签 和 \<p> 标签内部的文字，而其中的文字其实也是一个文字节点。
- 盒是排版时候的概念，表示一个展位。

HTML代码中可以书写开始 __标签__，结束 __标签__ ，和自封闭 __标签__。一对起止 __标签__ ，表示一个 __元素__。DOM树中存储的是 __元素__ 和其它类型的节点（Node）.CSS选择器选中的是 __元素__ 或者 __伪元素__. 在排版时可能产生多个 __盒__ 排版和渲染的基本单位是 __盒__ 。

#### 课程笔记

- 盒内尺寸 content_box + padding = border_box 
- 整个盒的尺寸 = margin + border_box = margin + padding + content_box
- 横排 inline-box, inline-level-box. 又叫 __IFC__, 全称 Inline-Level-Format-Context
- 竖排 line-box,  block-level-box, 又叫 __BFC__, 全称 Block-Level-Format-Context
- 设立 BFC
- bearing-X 字间距，advance 带边距的字宽。 advance = width + 2 * bearing-X
- baseline 文字基线， text-top 和 text-buttom 文字上下界。 盒 不会影响 text-top 和 text-buttom, 但是会影响 line-top, 会把line-top 撑开。 注意下面的例子里面 行内盒(inline-box) 的基线会随着该盒内文字的基线变化，所以一般情况下不会推荐使用在行内盒基线对齐。
<code>

    /* 这时候的第二个div 的基线就是前面 Hello good 中文的基线*/
    <div style="font-size: 50px;line-height: 100px;background-color: pink;">
    <span>Hello good 中文</span>
    <div style="line-height: 70px;width: 100px;height: 150px;background-color: aqua;display: inline-block;"></div>

    <br/>

    /* 在第二个div里添加了 字符 b, 这时候的第二个div 的基线变成了b的基线*/
    <div style="font-size: 50px;line-height: 100px;background-color: pink;">
    <span>Hello good 中文</span>
    <div style="line-height: 70px;width: 100px;height: 150px;background-color: aqua;display: inline-block;">b</div>

    /* 在第二个div里添加了 字符 b 和换行 c, 这时候的第二个div 的基线变成了c的基线*/
    <div style="font-size: 50px;line-height: 100px;background-color: pink;">
    <span>Hello good 中文</span>
    <div style="line-height: 70px;width: 100px;height: 150px;background-color: aqua;display: inline-block;">b<br/>c</div>

    /* 行内盒不推荐使用基线对其，我们换成 vertical-align:top, 我们还可以使用middle, bottom, text-bottom等*/
    <div style="font-size: 50px;line-height: 100px;background-color: pink;">
    <span>Hello good 中文</span>
    <div style="vertical-align:top;line-height: 70px;width: 100px;height: 150px;background-color: aqua;display: inline-block;">b<br/>c</div>

    /* 多加一条基线*/
    <div style="font-size: 50px;line-height: 100px;background-color: pink;">
    <div style="vertical-align:middle;overflow:visible;display:inline-block;width:1px;height:1px">
        <div style="width:1000px;height:1px;background-color:red;"></div>
    </div>
    <span>Hello good 中文</span>
    <div style="vertical-align:text-bottom;line-height: 70px;width: 100px;height: 150px;background-color: aqua;display: inline-block;">b<br/>c</div>

</code>

- float:right 和 clear:right
- float 不认 \<br/>, 怎么实现float 的换行呢，就要使用 clear,  比如在 前面一个div 是float:left, 那想要换一行布局一个新的 div 可以使用 \<div style="clear:left"></div>
- margin collapse, 在 BFC 的情况下，上下margin 堆叠
- Block container: 里面可以放 BFC; Block-Level-Box: 外面有 BFC;  Block-Box = Block Container + Block-Level-Box: 内外都有 BFC。 文字只能放进 IFC
- __Block Container__: block, inline-block, table-cell,flex item, grid cell, table-caption
- 我们认为那些能容纳正常流的盒，都会创建BFC, 只有以下情况除外： block-box && overflow:visible

#### Flex

#### Animation

<code>

    <style>
    @keyframes mykf
    {
        from {background:red;}
        to {background:yellow;}
    }

    div
    {
        animation:mykf 5s infinite;
    }
    </style>

    <div style="width:100px;height:100px"></div>

</code>

#### CSS 属性分类

- 几何图形
  - border
  - box-shadow
  - border-radius
- 文字
  - font
  - text-decoration
- 位图
  - background-image

  <code>

        data:image/svg+xml,<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150" rx="200" ry="80" style="fill:rgb(200,100,50);stroke:rgb(0,0,100);stroke-width:2" /></svg>

  </code>
