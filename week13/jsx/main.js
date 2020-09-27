
import {createElement} from './framework.js'
import {Carousel} from './carousel.js'
import {Timeline, Animation} from './animation.js'

let d = [
    "http://5b0988e595225.cdn.sohucs.com/images/20180706/61474f16da4845aba0a531ec9824afed.jpeg",
    "http://www.517lyq.com/Public/uploadfile/image/20161016/1476605080418408.jpeg",
    "http://www.517lyq.com/Public/uploadfile/file/2016-10-16/5803361a774d4.jpg"
]

let a = <Carousel src={d}/>

//document.body.appendChild(a);

a.mountTo(document.body);

let tl = new Timeline();
window.tl = tl;
window.animation = new Animation({ set a(v){console.log(v)}},"a", 0, 100, 1000, null);
tl.start();