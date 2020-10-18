
import {createElement} from './framework.js'
import {Carousel} from './Carousel.js'
import {Button} from './Button.js'
import {List} from './List.js'
import {Timeline, Animation} from './animation.js'

let d = [
    {
        img: "http://5b0988e595225.cdn.sohucs.com/images/20180706/61474f16da4845aba0a531ec9824afed.jpeg",
        url: "https://time.geekbang.org",
        title: "Image 1"
    },
    { 
        img: "http://www.517lyq.com/Public/uploadfile/image/20161016/1476605080418408.jpeg",
        url: "https://time.geekbang.org",
        title: "Image 2"

    },
    {

   
        img: "http://www.517lyq.com/Public/uploadfile/file/2016-10-16/5803361a774d4.jpg",
        url: "https://time.geekbang.org",
        title: "Image 3"
    }
    
]

//let a = <Carousel src={d} onChange={event => console.log(event.detail.position)} />

/*let a = <Button>
Content
</Button>
*/

let a = <List data={d}>
{
    (record) =>
        <div>
            <img src={record.img} />
            <a href={record.url}>{record.title}</a>
        </div>

}
</List>
a.mountTo(document.body);
