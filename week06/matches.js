function matchPart(selector, element) {

    reg = /(?<tagName>[a-z]+)?(?:(?<operator>[#.])(?<opValue>[a-zA-Z0-9-_]+)|(?<attribute>\[[a-z]+(?:[\^$~*|]?=[a-zA-Z0-9:_\'\"\\]+\s*(?:[iIsS])?)?])|(?<pseudoOperator>:{1,2})(?<pseudo>[a-z]+(?:-[a-z]+)?(?:\([a-z0-9+*]*\))?))/g;
    groups = [...selector.matchAll(reg)].map(e=>e.groups);
    for(let group of groups){
        if(group.operator && group.operator === '#' && group.opValue !== element.getAttribute('id')) {
            return false;
        }
        if(group.operator && group.operator === '.' && group.opValue !== element.getAttribute('class')) {
            return false;
        }
        if(group.tagName && group.tagName.toLowerCase() !== element.tagName.toLowerCase()){
            return false;
        }
        if(group.attribute){
            attr = group.attribute.substring(1,group.attribute.length-1).split('=');
            if(attr[1] !== element.getAttribute(attr[0])){
                return false;
            }
        }
        if(group.pseudoOperator && group.pseudo !== element.getAttribute){
            return false;
        }
    }

    return true;
}

function match(selector, element) {
    var selectorParts = selector.split(/\s+/).slice().reverse();
    var directParent = false;
    var matchCount = 0;
    for (let part of selectorParts) {
        if (part === '>'){
            directParent = true;
            matchCount++;
            continue;
        }
        let match = false;
        while (! match && element !== null) {
            match = matchPart(part, element);
            if (match) {
                matchCount++;
            }
            if (! match && directParent) {
                return false;
            }
            element = element.parentElement;
        }
    }
    if (matchCount >= selectorParts.length) {
        return true;
    }
    return false;
}


match("div #id.class", document.getElementById("id"));
