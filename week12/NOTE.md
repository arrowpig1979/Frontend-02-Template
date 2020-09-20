### 学习笔记


#### in 和 of 的区别

```javascript

//iterate object
for(let name in attributes){

}

//iterate array
for(let name of attributes){

}


```

#### this and [super](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super) in class extends

```javascript

class ElementWrapper extends Component{
    constructor(type){
        this.super();
        this.root = document.createElement(type);
    }
}

```

if I do not put this.super(), I get error: **"cannot set property 'root' of undefined"**.  after I put this.super(), I get error: **cannot read property 'super' of undefined**.  super is NOT a function of this. 

```javascript
class Component{

    constructor(type){
        
        this.root = document.createElement("div");
        
        //return document.createElement("div")

        //this.root = this.render();
    }

    render(){
        return document.createElement("div")
    }

```
if we return document.createElement here, it will cause **this** of Carousel = HTMLDivElement whose attributes is read-only.  If we call **this.render()** here, it will not call Component.render(),  it will call Carousel.render instead where this.attributes have not been initialized. 



