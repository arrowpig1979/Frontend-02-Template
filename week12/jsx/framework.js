

export function createElement(type, attributes, ...children){
    let element;
    if(typeof type === "string"){
        //element = document.createElement(type);
        //because normal div does not have mountTo method, so we need create a ElementWrapper
        element = new ElementWrapper(type);
    }else{
        element = new type;
    }
    
    for(let name in attributes){
        element.setAttribute(name, attributes[name]);
    }

    for(let child of children){
        if(typeof child === "string"){
            //child = document.createTextNode(child);
            child = new TextWrapper(child);
        }
        element.appendChild(child);
    }
    return element;
}

export class Component{

    constructor(type){
        //if we call this.render here
        //this.root = this.render();
        return document.createElement("div")
    }

    render(){
        return document.createElement("div")
    }

    setAttribute(name, value){
        this.root.setAttribute(name,value);
    }
    appendChild(child){
        //this.root.appendChild(child);
        child.mountTo(this.root);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class ElementWrapper extends Component{
    constructor(type){
        super();
        this.root = document.createElement(type);
    }
    
}


class TextWrapper extends Component{
    constructor(content){
        super();
        this.root = document.createTextNode(content);
    }

}