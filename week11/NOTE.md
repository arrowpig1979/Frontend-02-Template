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
- 为什么要添加startX 和 startY , 因为 [translate](https://developer.mozilla.org/zh-CN/docs/Web/CSS/translate) 表示平移多少，而不是指目标位置。

