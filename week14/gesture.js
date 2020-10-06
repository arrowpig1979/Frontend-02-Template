
export class Dispatcher{
    constructor(element){
        this.element = element;
    }

    dispatch(type, properties){
        let event = new Event(type);
        for(let name in properties){
            event[name] = properties[name];
        }
        //console.log(event);
        this.element.dispatchEvent(event);
    }

}

export class Listener{
    constructor(element, recognizer){

        let isListeningMouse = false;
        let contexts = new Map();

        element.addEventListener("mousedown", event =>{
        
            //it seems that both mousedown and touchstart will be triggered
            let userAgent = navigator.userAgent;
            if(userAgent.match(/iphone|ipad|android/i)){
                return;
            }
            //console.log("Trigger mousedown", event.button);
        
            let context = Object.create(null);
            contexts.set("mouse" + ( 1 << event.button), context);
            recognizer.start(event,context);
            let mousemove = event => {
        
                let button = 1;
                while(button <= event.buttons){
                    if(button & event.buttons){
                        //the order of mask in button and event.buttons are different
                        let key;
                        if(button === 2){
                            key = 4;
                        }else if(button === 4){
                            key = 2;
                        }else{
                            key = button;
                        }
                        let context  =  contexts.get("mouse" + key);
                        recognizer.move(event,context);
                    }
                    
                    button = button << 1;
                }             
            };
        
            let mouseup = event => {
                let context  = contexts.get("mouse" + (1<< event.button));
                recognizer.end(event,context);
                contexts.delete("mouse" + (1<< event.button));
        
                if(event.buttons == 0){
                    document.removeEventListener("mousemove",mousemove);
                    document.removeEventListener("mouseup",mouseup);
                    isListeningMouse = false;
                }
               
            }
        
            if(!isListeningMouse){
                document.addEventListener("mousemove", mousemove);
                document.addEventListener("mouseup", mouseup);
                isListeningMouse = true;
            }
            
        });
        
        
        element.addEventListener("touchstart", event=>{
            //console.log("trigger touch start")
            for(let touch of event.changedTouches){
                let context  =  Object.create(null);
                contexts.set(touch.identifier, context);
                recognizer.start(touch, context);
            }
        })
        
        //not like mousemove,  mousemove can be independent from mousedown
        //but touchmove is always after touchstart
        element.addEventListener("touchmove", event=>{
            for(let touch of event.changedTouches){
                let context = contexts.get(touch.identifier);
                recognizer.move(touch,context);
            }
        })
        
        element.addEventListener("touchend", event=>{
            console.log("trigger touch end")
            for(let touch of event.changedTouches){
                let context = contexts.get(touch.identifier);
                recognizer.end(touch, context);
                contexts.delete(touch.identifier);
            }
        })
        
        element.addEventListener("touchcancel", event=>{
            for(let touch of event.changedTouches){
                let context = contexts.get(touch.identifier);
                recognizer.cancel(touch,context);
                contexts.delete(touch.identifier);
            }
        })
        

    }
}

export class Recognizer{
    constructor(dispatcher){
        this.dispatcher = dispatcher;
    }

    start(point, context){
        //console.log("start", point.clientX, point.clientY);
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }];
        context.isPan = false;
        context.isTap = true;
        context.isPress = false;
        context.handler = setTimeout(()=>{
            context.isPan = false;
            context.isTap = false;
            context.isPress = true;
            context.handler = null;
            this.dispatcher.dispatch("pressstart",{});
        }, 500);
    }
    
    move(point,context){
        //console.log("move", point.clientX, point.clientY);
        let dx = point.clientX - context.startX,  dy = point.clientY - context.startY;
        if( !context.isPan && dx ** 2 + dy ** 2 > 100){
            context.isPan = true;
            context.isTap = false;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy);
            this.dispatcher.dispatch("panstart",{
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
            clearTimeout(context.handler);
        }
    
        if(context.isPan){
            this.dispatcher.dispatch("pan",{
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
        }
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        });
    }
    
    end(point,context){
        //console.log("end", point.clientX, point.clientY);
    
        if(context.isTap){
            this.dispatcher.dispatch("tap",{});
            clearTimeout(context.handler);
        }
    
 
        if(context.isPress){
            this.dispatcher.dispatch("pressend",{});
        }
    
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        let d,v;
        if(context.points.length === 0 ){
            v = 0;
        }else{
            d = Math.sqrt((point.clientX - context.points[0].x) **2 + (point.clientY - context.points[0].y)**2);
            v = d / (Date.now() - context.points[0].t);
        }
        if(v > 1.5){
            context.isFlick = true;
            this.dispatcher.dispatch("flick",{
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick,
                velocity: v
            });
        }else{
            context.isFlick = false;
        }

        if(context.isPan){
            
            this.dispatcher.dispatch("panend",{
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick
            });
        }   
    }
    
    cancel(point,context){
        //console.log("cancel", point.clientX, point.clientY);
        this.dispatcher.dispatch("cancel", {});
        clearTimeout(context.handler);
    }
}

export function enableGesture(element){
    new Listener(element, new Recognizer(new Dispatcher(element)));
}