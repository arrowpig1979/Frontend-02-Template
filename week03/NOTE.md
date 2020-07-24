## 学习笔记

#### 箭头函数的理解

[JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7)

箭头函数的 This 是函数创建时上下文的This 而不是 运行时上下文的This. 
在React中，默认情况下 函数不会绑定 React Component, 于是推荐使用箭头函数做自动绑定。

下面两个代码片段有区别吗？
<code>
    
    //代码片段1
    const handleSubmit = evt => { 
        evt.preventDefault(); 
    }

    return(
        <Form layout = 'vertical' onSubmit={handleSubmit} >
    )


</code>

<code>

    //代码片段2
     return(
        <Form layout = 'vertical' onSubmit={(evt) => {evt.preventDefault()}} >
    )

</code>

#### Array 的 Array(0) 属性是什么

注意console.log 的部分，Array 会有一个属性在 Dev Tools里面显示 Array(0), 但是其name却不存在，那Array(0) 具体是什么呢？

<code>

    var o = Array;
    for(var p of Object.getOwnPropertyNames()) { 
        var d = Object.getOwnPropertyDescriptor(o, p);
        if( (d.value !== null && typeof d.value ===          "object") || (typeof d.value === "function")) {
            //Pay Attention Here!!!
            console.log("Array has property " + d.value.name);
        }
    }

</code>


#### 相对于 React Class Component,  React Hook 到底解决什么问题

[React Hook 简介](https://react.docschina.org/docs/hooks-intro.html)

三大理由：
- 更加方便代码复用， 目前理解并不深刻，需要查看 [React Hook 简介](https://react.docschina.org/docs/hooks-intro.html) 中的视频。
- 改变了设计思路，更加偏向于状态驱动，而不是生命周期方法。比如useState 就是状态驱动，只要状态改变我们就刷新组件；比如 useEffects 是副作用，于是我们可以在每次render 后都触发useEffects, 而useEffects的第二个参数使得我们可以按照函数组件闭包内的任何变量是否发生变化而决定是否调用 useEffects 的逻辑。

#### 给一个典型的 React Hook 的使用场景
我们需要在一个Component 加载的时候去后台获取数据，于是使用 useEffect Hook.

#### 在不同的页面之间如何共享一个 Layout 

[学习React Page Layout](https://www.ctolib.com/mip/react-page-layout.html)

##### Layout 布局共享可以用 继承的方式吗？


#### Redux 为什么设计成 Immutable Data Structure 

[Immutable Update Patterns](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/)

三大理由：
- React 是安装 redux 里面的状态是否发生改变来决定是否重新Render 页面的，如果 immutable,  我们就只需要对比 Reference 是不是发生改变就可以了，而不需要遍历 Reference 所指向的对象并且做深度遍历对比是否发生变化
- 因为Immutable, 调试的时候可以方便的对比每一次Store的变化
- 方便推测，给定现在 Store 的状态, 给定现在的 Action, 就一定可以唯一确定变更后的 Store 的状态

#### 描述一下 Redux 的异步 Action 的实现机制

TODO: 

#### Javascript 里的null 是什么数据类型
JS 里的 null 的类型就是 null,  JS 有7中基本数据类型：Number, Boolean, String, Undefined, Null, Object 和 Symbol. 

#### 如何在 Webpack 中配置 CDN 的 Host地址

[webpack使用HtmlWebpackPlugin进行cdn配置](https://www.jianshu.com/p/9248db0349fb)

#### webpack 如何实现 es6 的模块功能，比如"import abc from 'module' "

[Webpack Configuration Guidance to Enable ES6](http://ccoenraets.github.io/es6-tutorial-data/babel-webpack/)

TODO： 学习原理

#### 我们目前使用 webpack的哪个版本

