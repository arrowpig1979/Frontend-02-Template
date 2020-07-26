


function search(text){
    function start(c){
        if(c==='a'){
            return stateB;
        }else{
            return start(c);
        }
    }
    
    function stateB(c){
        if(c==='b'){
            return stateC;
        }else{
            return start(c);
        }
    }
    
    function stateC(c){
        if(c==='c'){
            return end;
        }else{
            return start(c);
        }
    }
    
    function end(c){
        return end;
    }
    
    let state = start;
    for(let c of text){      
        state = state(c)
    }
    return state === end;
}

console.log(search('ababcdefg'));