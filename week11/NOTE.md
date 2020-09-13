### 学习笔记

#### [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

#### Vue 3.0 Reactive 



#### Vue 3.0 Effect




#### Dragable 

```javascript

    let dragable  = document.getElementById("dragable");
    dragable.addEventListener("mousedown", function(event){
        let up = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup",up);
        }

        let move = ()=> {
            dragable.style.transform = `translate(${baseX + event.clientX - startX}px, ${baseY + event.clientY - startY}px)`
        }
        //we can still capture the event when mouse is outside of dragable div object
        document.addEventListener("mousemove",move);
        document.addEventListener("mouseup", up);
    })

```


- 为什么在 up 函数里面要 移除 mousemove 和 mouseup 两个事件处理函数呢？如果不挪走，那mouseup后 tranform 还在继续，体验肯定是不对的。
- 为什么要添加startX 和 startY?因为 [translate](https://developer.mozilla.org/zh-CN/docs/Web/CSS/translate) 表示 相对dragable的原始位置平移多少，而不是指绝对目标位置。再看[mousemove](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousemove_event) 中的clientX 和 clientY 是相对window的位移。如果dragable 一开始的位置不是(0,0), 而是（0px，200px), 那translate(clientX, clientY) 会导致每次mousedown 后 mousemove 都会让dragable 直接往下挪200px, 原因是clientY 每次多了200px 位移，所以我们需要 clientX - startX,  clientY - startX.
- 为什么要添加baseX 和 baseY? 因为 使用translate, dragable的原始位置其实从来都没有改变过，也就是说 translate的参数每次都是相对于 dragable的原始位置计算的，没有 baseX, baseY, 每一次mousedown后mousemove, 因为 clientX - startX 一开始的时候的值是一样的，导致translate(0,0) 会把dragable 恢复到一开始的位置，所以才需要在 mouseup的时候 记住鼠标位置并存在 baseX 和 baseY 中。

