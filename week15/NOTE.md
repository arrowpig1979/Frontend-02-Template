## 学习笔记

### 轮播组件 week 12 自动轮播复习
<br/>
不用\<img\>的原因是image 可以被鼠标拖拽的，虽然松开鼠标的时候可以复位，但是体验仍然不好，所以使用backgroundImage

```javascript
//record is the string representing image location
document.createElement("div").style.backgroundImage = `url('${record}')`;
```

CSS 复习

- [overflow:hidden](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) 如果没有hidden, 我们就可以看到所有的图片，hidden后我们就只能看到最外层的 div 指定的 500px * 333px 的视窗，而这个视窗就只能看到一张图片了。如果我们这里使用 display:none 就会麻烦很多。
- [white-space:nowrap](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) 如果没有 white-space:nowrap, 即使有了 display:inline-block ，因为我们外围div 的宽度只有500px, 一张图片就占满了，所以还是会每一个图片的div 占一行。只有设置nowrap, 才能强制把所有的图片排成一行。
- [display:inline-block](https://developer.mozilla.org/en-US/docs/Web/CSS/display)  把两个div 元素放在一行，如果没有inline-block就会每一个div 占有一行
- [background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size): contain  如果图片大小大于 width 500px, 就不能自动缩小到500px 内，而是我们的div 内只显示部分图片。模型行为是 repeat 平铺，我们可以使用 background-repeat: no-repeat 取消重复平铺。
- 为什么一张 1600px * 1200px 的图片，用background-size:contain 放进 500px * 333px 的div 后会发生在横轴上的重复平铺？ 
  - 如果按照优先填满宽度:  高度= 1200px * 500/1600 = 375px > 333px 于是发生裁剪，而contain 要求不能发生裁剪，所以不可取
  - 如果按照优先填满高度:  宽度= 1600px * 333/1200 = 444px < 500px 可以放得下，但是发生横向重复平铺

<br/>
轮播时current 和 next 两张图片的translateX 参数解释

```javascript
// 先把next 挪到正确的位置，而这个挪动在动画前的准备，不希望被人看到
next.style.transition="none";
//这里第一个100 current 的展位，当currentIndex=0 也就是初始位置时，nextIndex=1,  100 - 1*100 = 0 也就是next 不动
//如果 current =1, 也就是已经挪动了一张图片后，nextIndex= 2, 100 - 2 * 100 = -100%, 也就是准备的时候next 已经向左挪动一个展位
next.style.transform = `translateX(${100 - nextIndex * 100}%)`

setTimeout(()=>{
    //恢复next的动画效果
    next.style.transition = "";
    //动画开始的时候，current 在当前位置 (-currentIndex * 100)% 基础上 再向左 挪动一个展位
    current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
    //next 向左挪动 nextIndex 个展位
    next.style.transform = `translateX(${-nextIndex * 100}%)`
},16)

```

- 为什么必须先使用 next.style.transition = "none" <br/>
如果注释掉这一句，如果我们一共三张图片轮播，在第一轮播完以后，第四次播放也就是要显示第一张图片的时候该图片会从左边挪出来，因为这时候该图片实际的位置是负的，而其一开始的位置是0，translate(0px) 会导致图片从负的位置挪到0的位置，接着其他的图片也都是一样的效果。
- 这里为什么一定要用 setTimeout? <br/>
因为不用setTimeout的化，next 的 style 就很快会被覆盖。next.style.transform 还来不及昨晚就被覆盖。Per Xu Yu: 这里有个事件循环的概念，设置了setTimeout 的话，不管设置了几秒，会把里面的代码放到下一次宏任务执行，那两行next.transition和transform执行后，就会执行渲染任务，这样等渲染完成后元素也回到了正确的位置，最后执行setTimeout的代码

### 轮播组件 week 12 鼠标轮播复习

```javascript
    let move = event=>{
        let x = event.clientX - startX;
        //
        let current = position - ((x - x%500)/500);
        for(let offset of [-1,0,1]){
            let pos = current + offset;
            pos = (pos + children.length) % children.length;
            let child = children[pos];
            child.style.transition = "none";
            child.style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`
        }
    }

```
Current = position - round(x / 500） 如果X 为正数，那current 就应该是相对于当前position 的左边的照片,但是为什么这样会出现调变，一定要改成 **(x-x%500)/500** ,这个是不是就相当于floor 而不是round。然后基于上面的解释，因为move的时候带上了**x%500** , 所以计算current的时候 需要把这部分减去。。