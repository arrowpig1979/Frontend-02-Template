### 学习笔记


#### emoji 的前端显示

[EMOJI 的 Unicode 编码](https://bbs.52svip.cn/emoji/)

<code>

    //274C 是 emoji "X" 的 unicode
    //2B55 是 emoji "O" 的 unicode
    cell.innerText = pattern[j][i] == 2 ? '\u274C':
                     pattern[j][i] == 1 ? '\u2B55': '';

</code>

#### bestChoice 代码理解
<code>

        function bestChoice(pattern, collor){
        let p;
        if(p = willWin(pattern, color)){
            return {
                point: p,
                result: 1
            }
        }
        let result = -2;
        let point = null;
        outer:for(let row = 0; row < 3; row++){
            for(let col=0; col<3; col++){
                if(pattern[row][col]){
                    continue;
                }
                let tmp = clone(pattern);
                tmp[row][col] = color;
                //simulate opponent's next move
                let r = bestChoice(tmp, 3 - color).result;

                if(-r > result){
                    result = -r; 
                    point = [row, col];
                }

                if(result == 1){
                    break outer;
                }
            }
        }
        return {
            point: point,
            result: point? result: 0
        }
    }

</code>

bestChoice 是被computerMove 调用的，也就是机器的选择，也就是当机器会枚举每一种可能性，对于每一种可能性，机器都是递归调用bestChoice来看看 user 是不是会取胜，如果user 会取胜，也就是 内部的那个bestChoice返回为1， 那机器就会先把user会走的那一个点先占了。那代码不应该改成这样吗？

<code>

    let r = bestChoice(tmp, 3 - color).result;
    if(-r > result){
        result = -r; 
        point = r.point; //???
    }


</code>

