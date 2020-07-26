### 学习笔记

#### 为什么需要在 headers 里面 X-Foo2 要用 [] ?
<code>

    void async function(){
        let request = new Request({
        method: 'POST',
        host:'127.0.0.1',
        port:'8088',
        path:'/',
        headers:{
            ['X-Foo2']:'customized'
        },
        body:{
            name:'jian'
        }
        });

        let response = await request.send();
        console.log(response);
    }();

</code>

在我们这个情况可以不用，但是如果X-Foo2 是一个变量，那么就必须要用[]

#### 在receive函数里调用 receiveChar 是找不到定义的，必须使用 this.receiveChar(c) 才可以。

<code>

    class ResponseParser{

        receiveChar(c){

        }
    
        receive(text){
            for(let c of text){
                receiveChar(c);
            }
        }
    }

</code>

#### 函数前加 get

<code>

    get isFinished(){

    }

    //调用的时候可以不加()
    this.isFinished

</code>