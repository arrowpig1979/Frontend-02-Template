
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
        return this.root;
    }

    mountTo(parent){
        parent.appendChild(this.render());
    }

}

let a = <Carousel id="a">
            <span>a</span>
            <span>b</span>
            <span>c</span>
            "Hello World"
</Carousel>


let d = [
    "http://5b0988e595225.cdn.sohucs.com/images/20180706/61474f16da4845aba0a531ec9824afed.jpeg",
    "http://www.517lyq.com/Public/uploadfile/image/20161016/1476605080418408.jpeg",
    "http://www.517lyq.com/Public/uploadfile/file/2016-10-16/5803361a774d4.jpg"
]

let a1 = <Carousel src={d}/>

//document.body.appendChild(a);

a.mountTo(document.body);