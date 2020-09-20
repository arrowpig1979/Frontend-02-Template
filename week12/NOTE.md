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