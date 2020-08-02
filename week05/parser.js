const css = require('css');
const layout = require('./layout.js')

let currentToken =null;
let currentAttribute = null;
let stack = [{type:'document', children:[]}];
let currentTextNode = null;

let rules = [];

function addCSSRules(text){
    var ast = css.parse(text);
    //console.log(JSON.stringify(ast, null, "   "));
    rules.push(...ast.stylesheet.rules);
   
}

/**
 * 
 * @param {*} selector 
 * composite selector could be tag.class#id
 */
function computeSpecificity(selector){
    var p = [0,0,0,0];
    var selectorParts = selector.split(" ");

    for(var part of selectorParts){
        if(part.charAt(0) === '#'){
            p[1] += 1;
        }else if(part.charAt(0) == '.'){
            p[2] += 1;
            if(part.indexOf('#')!=-1){
                p[1] += 1; 
            }
        }else{
            p[3] += 1;
            if(part.indexOf('#')!=-1){
                p[1] += 1; 
            }
            if(part.indexOf('.')!=-1){
                p[2] += 1; 
            }
        }
    }
    return p;
}

function compareSpecificity(sp1, sp2){
    if(sp1[0] - sp2[0]){
        return sp1[0] - sp2[0];
    }
    if(sp1[1] - sp2[1]){
        return sp1[1] - sp2[1];
    }
    if(sp1[2] - sp2[2]){
        return sp1[2] - sp2[2];
    }
    return sp1[3] - sp2[3];
}

/**
 * 
 * @param {*} element 
 * @param {*} selector 
 * 
 * simple match only covers tag, class and id selector
 * 
 * composite selector looks like div.a#a
 */
function match(element, selector){
    if(!selector || !element.attributes){
        return false;
    }

    if(selector.charAt(0) === '#'){
        //start with # so it's simple selector 
        var attr = element.attributes.filter(attr => attr.name === 'id')[0];
        if(attr && attr.value.replace('#','') === selector.replace('#','')){
            return true;
        }
    }else if(selector.charAt(0) === '.'){
        //if it .xyz#myid , then it could be a composite selector 
        var idIndex = selector.indexOf('#');
        if(idIndex != -1){
            var idSelector = selector.substring(idIndex);
            selector = selector.substring(0, idIndex);
            if(!match(element, idSelector)){
                return false;
            }
        }

        var attr = element.attributes.filter(attr => attr.name === 'class')[0];
        if(attr && attr.value.trim() === selector.replace('.','').trim()){
            return true;
        }
    }else{

        var classIndex = selector.indexOf('.');
        if(classIndex != -1){
            var classSelector = selector.substring(classIndex);
            selector = selector.substring(0, classIndex);
            if(!match(element, classSelector)){
                return false;
            }
        }

        var idIndex = selector.indexOf('#');
        if(idIndex != -1){
            var idSelector = selector.substring(idIndex);
            selector = selector.substring(0, idIndex);
            if(!match(element, idSelector)){
                return false;
            }
        }

        //tag selector 
        if(element.tagName === selector){
            return true;
        }

    }
    return false;
}

function computeCSS(element){
    var elements = stack.slice().reverse();

    if(!element.computedStyle){
        element.computedStyle = {};
    }

    for(let rule of rules){
        //#myid div body
        var selectorParts = rule.selectors[0].split(' ').reverse();

        //skip if first item of elememt and selector arrays mis-match
        if(!match(element, selectorParts[0])){
            continue;
        }

        //check if two arrays matches, first array is the element array,  second array is selector array
        var selectorIndex = 1;
        for(var i =0; i< elements.length; i++){
            if(match(elements[i], selectorParts[selectorIndex] )){
                selectorIndex++;
            }
        }

        //match
        if(selectorIndex >= selectorParts.length){
            var sp = computeSpecificity(rule.selectors[0]);
            var computedStyle = element.computedStyle;
            for(var declaration of rule.declarations){
                if(!computedStyle[declaration.property]){
                    computedStyle[declaration.property] = {}
                }

                if(!computedStyle[declaration.property].specificity){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }else if(compareSpecificity(computedStyle[declaration.property].specificity,sp)<0){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
                
            }
            console.log(element.computedStyle);
        }
    }   
}


function emit(token){

    let top = stack[stack.length -1];
    if(token.type === 'startTag'){
        let element = {
            type: 'element',
            children:[],
            attributes:[]
        };
        element.tagName = token.tagName;
        for(let p in token){
            if(p!= 'type' && p!= 'tagName'){
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        //compute as earlier as possible, so we put within startTag
        computeCSS(element);

        top.children.push(element);
        element.parent = top;
        //self closing tag does not need to push to stack
        if(!token.isSelfClosing){
            stack.push(element);
        }
        currentTextNode = null;
    }else if(token.type == 'endTag'){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end does not match");
        }else{
            //when encounting style tag, start the css operations
            if(top.tagName === 'style'){
                //children[0] is text tag
                addCSSRules(top.children[0].content);
            }

            //layout need children elements, so we choose end tag of parent to do layout
            layout(top);
            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type === 'text'){
        if(currentTextNode === null){
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
    //console.log(token);
}

const EOF = Symbol('EOF');


function data(c){
    if(c === '<'){
        return tagOpen;
    }else if( c === EOF){
        emit({
            type: 'EOF'
        });
        return;
    }else{
        emit({
            type: 'text',
            content: c
        });
        return data;
    }
}

function tagOpen(c){
    if(c === '/'){ // </
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'startTag',
            tagName : ''
        }
        return tagName(c);
    }else{
        return;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c);
    }else if(c === '>'){

    }else if(c===EOF){

    }else{

    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        //<html meta=a> current logic can not get the <html> token
        return beforeAttributeName;
    }else if(c === '/'){
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
        return tagName;
    }else if(c === '>'){
        emit(currentToken);
        return data;
    }else{
        return tagName;
    }
}

/* eat attribute name and not processing now
   so we always return beforeAttributeName
*/
function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c=== '/' || c==='>' || c ===  EOF){
        return afterAttributeName(c);
    }else if(c==='='){
        return beforeAttributeName;
    }else{
        currentAttribute = {
            name:'',
            value:''
        };
        return attributeName(c);
    }
}

function attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF){
        return afterAttributeName(c);
    }else if( c === '='){
        return beforeAttributeValue;
    }else if( c === '\u0000'){

    }else if(c === '\"' ||  c === "'" || c === '<'){

    }else{
        currentAttribute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if(c === '/'){
        return selfClosingStartTag;
    }else if(c === '='){
        return beforeAttributeValue;
    }else if(c === '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c === EOF){

    }else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName;
    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF){
        return beforeAttributeValue;
    }else if(c === '\"'){
        return doubleQuotedAttributeValue;
    }else if(c === "\'"){
        return singleQuotedAttributeValue;
    }else if(c === '>'){

    }else {
        return unQuotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c){
    if(c === '\"'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c === '\u0000'){

    }else if(c === EOF ){

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c){
    if(c === '\''){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c === '\u0000'){

    }else if(c === EOF ){

    }else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c==='/'){
        return selfClosingStartTag;
    }else if(c === '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c === EOF){

    }
}

function unQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c === '/'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c==='>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c === '\u0000'){

    }else if(c ==='\"' || c === "'" || c === '<' || c === '=' || c === '`' ){

    }else if(c ===  EOF){

    }else{
        currentAttribute.value += c;
        return unQuotedAttributeValue;
    }
}

// <html / --> the only char that can follow / is >
function selfClosingStartTag(c){
    if(c=== '>'){
        currentToken.isSelfClosing = true;
        //jianxu1 it seems emit is missing here, so self closing token won't have chance to emit
        //e.g.  <img id=#myid />
        //jianxu1 need change to endTag, otherwise, layout won't get called because layout is in endTag emit 
        //above statement is wrong, change to endTag here will cause top.tagName !== currentToken.tagName because self
        //closing tag is not push into stack
        //currentToken.type = 'endTag'; 
        emit(currentToken);
        return data;
    }else if(c==='EOF'){

    }else{

    }
}

module.exports.parseHTML = function parseHTML(html){
    let state = data;
    for(let c of html){
        state = state(c);
    }
    state = state(EOF);
    return stack[0];
}