
import {Component, createElement} from "./framework.js"

class Carousel extends Component{
    constructor(type){
        //we cannot call super.render here because attributes have not been set yet
        super();
        this.attributes = Object.create(null);
    }

    setAttribute(name,value){
        this.attributes[name] = value;
    }

    render(){
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for(let record of this.attributes.src){
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            child.src = record;
            this.root.appendChild(child);
        }

        /*
        let currentIndex = 0;
        setInterval(()=>{
            let current = this.root.children[currentIndex];
            let nextIndex = (currentIndex + 1 ) % this.root.children.length;
            let next = this.root.children[nextIndex];

            
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
                next.style.transform = `translateX(${-nextIndex * 100}%)`;

                currentIndex = nextIndex;
            },16)

        },2000); */

        
        let position = 0;
        this.root.addEventListener("mousedown", event => {
            let children = this.root.children;
            let startX = event.clientX;
            let move = event=>{
                let x = event.clientX - startX;

                //if x > 0, move pic toward right, 
                let current = position - Math.round(x/500);

                for(let offset of [-1,0,1]){

                    let pos = current + offset;
                    //make sure pos is always positive
                    pos = (pos + children.length) % children.length; 
                    let child = children[pos];
                    child.style.transition = "none";
                    child.style.transform = `translateX(${-position * 500 + x }px)`
                }

            }

            let up = event => {
                let x = event.clientX - startX;
                position = position - Math.round(x/500);
                for(let offset of [0, -Math.sign(Math.round(x/500)-x + 250 * Math.sign(x))]){
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;
                    let child = children[pos];
                    child.style.transition = "";
                    child.style.transform = `translateX(${-pos * 500 + offset * 500}px)`
                }


                for(let child of children){
                    child.style.transition = "";                  
                    child.style.transform = `translateX(${-position * 500}px)`
                }
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup",up);
            }

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup",up);
        })

        return this.root;
    }

    mountTo(parent){
        parent.appendChild(this.render());
    }

}


let d = [
    "http://5b0988e595225.cdn.sohucs.com/images/20180706/61474f16da4845aba0a531ec9824afed.jpeg",
    "http://www.517lyq.com/Public/uploadfile/image/20161016/1476605080418408.jpeg",
    "http://www.517lyq.com/Public/uploadfile/file/2016-10-16/5803361a774d4.jpg",
    "http://drscdn.500px.org/photo/96637535/m%3D900/324c7ef977334011fab565e53a7386bf",
    "https://img.sj33.cn/uploads/allimg/201010/20101010110943168.jpg"
]

let a = <Carousel src={d}/>
a.mountTo(document.body);