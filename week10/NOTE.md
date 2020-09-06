### 学习笔记

</br>

#### [regexp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

```javascript
    function tokenize(source){
        var result = null;
        while(true){
            result = regexp.exec(source);
            if(!result){
                break;
            }

            //result[0] is the whole matching string 
            for(var i=1; i< dictionary.length; i++){
                if(result[i]){
                    console.log(dictionary[i-1]);
                }
            }
            console.log(result);
        }
    }

    tokenize("1024 + 10 * 24");
```

我们来看一下每次 while 循环的时候，result 的结果：

| 循环序号 | result[0] | result[index] |
| -  | -      | -     |
| 1       | "1024"    | result[1] = "1024" |
| 2       | " "       | result[2] = " " |
| 3       | "+"       | result[5] = "+" |
| 4       | " "       | result[2] = " " |
| 5       | "10"      | result[1] = "10" | 
| 6       | " "       | result[2] = " " |
| 7       | "*"       | result[4] = "*" |
| 8       | " "       | result[2] = " " |
| 9       | "24"      | result[1] = "24" |


</br>

#### [Array.prototype.unshift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

</br>

#### [yield](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)

#### [function*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)

generator 需要在函数定义处添加* 

```javascript

    function* tokenize(source){
        //...
        while(true){
            //...
            let token = {type: null, value: null};
            //...
            yield token;
        }
    }

```