## 学习笔记

### 用BNF编写带括号的四则运算

#### 课程中老师的不带括号的四则运算 BNF
<code>

    <ParenthesisExpression>::= "(" <AddtiveExpression> ")"
    <MultiplicativeExpression>::=<Number>|
        <MultiplcativeExpression> "*" <Number>|
        <MutiplicativeExpression> "/" <Number>|
    
    <AddtiveExpression>::=<MultiplicativeExpression>|
        <AddtiveExpression> "+" <MultiplicativeExpression> |
        <AddtiveExpression> "-" <MultiplicativeExpression>
</code>

[知乎上的括号四则运算参考](https://zhuanlan.zhihu.com/p/112460676)


<code>

    <S>::= <AddExp>
    <AddExp>::= <AddExp> <AddOpt> <MulExp> | <MulExp>   
    <AddOpt>::= < "+" > | < "-" >
    <MulExp>::= <MulExp> <MulOpt> <AtomicExp> | <AtomicExp>
    <MulOpt>::= < "*" > | < "/" >
    <AtomicExp>::= <"("> <AddExp> <")"> | <Number>

</code>


### 尽可能的寻找你所知道的语言，并分类
- 声明式语言： XML, CSS， HTML
- 编译语言： Java, C, C++, Go
- 动态语言： Python, Java Script, Bash, Perl 

### String to UTF Conversion
<code>

    function UTF8_Encoding(text){
        const utfBytes = [];
        if (!text){
            return utfBytes;
        }
        for(i = 0; i < text.length; i++) {
            utfBytes.push(text.charCodeAt(i));
        }
        console.log(utfBytes);
        return utfBytes;
    }

</code>

### 用Javascript 设计狗咬人的代码

<code>

    class Animal{
        constructor(name){
            this.name = name;
        }
    }
    class Dog extends Animal{

        constructor(name){
            super(name);
        }

        function bite(){
            console.log("bit");
        }
    }

    class Human extends Animal{
        constructor(name){
            super(name);
            this.hurt = false;
        }

        function hurt(dog){
            this.hurt = true;
            console.log(this.name + "is bitten by" + dog.name);
        }
    }

</code>


### 找出 JavaScript 标准里面所有具有特殊行为的对象

[ES5类型](https://www.w3.org/html/ig/zh/wiki/ES5/%E7%B1%BB%E5%9E%8B#Object.E7.9A.84.E5.86.85.E9.83.A8.E5.B1.9E.E6.80.A7.E5.8F.8A.E6.96.B9.E6.B3.95)
