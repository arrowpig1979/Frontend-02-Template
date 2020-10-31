var assert = require('assert');

import {parseHTML} from '../src/parser.js';

describe('parser html:', function(){

    it('<a></a>', function(){
        let tree = parseHTML('<a></a>');
        assert.strictEqual(tree.children[0].tagName,"a");
        assert.strictEqual(tree.children[0].children.length, 0);
        assert.strictEqual(1,1);
    });

    it('<a href="//time.geekbang.org"></a>', function(){
        let tree = parseHTML('<a href="//time.geekbang.org"></a>');
        assert.strictEqual(tree.children.length,1);
        assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<a href ></a>', function(){
        let tree = parseHTML('<a href ></a>');
        assert.strictEqual(tree.children.length,1);
        assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<a href id></a>', function(){
        let tree = parseHTML('<a href id></a>');
        assert.strictEqual(tree.children.length,1);
        assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<a href="abc" id></a>', function(){
        let tree = parseHTML('<a href="abc" id></a>');
        assert.strictEqual(tree.children.length,1);
        assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<a id=abc ></a>', function(){
        let tree = parseHTML('<a id=abc ></a>');
        assert.strictEqual(tree.children.length,1);
        assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<a id=abc/>', function(){
        let tree = parseHTML('<a id=abc/>');
        console.log(tree);
        assert.strictEqual(tree.children.length,0);
        //assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<a id=\'abc\'/>', function(){
        let tree = parseHTML('<a id=abc/>');
        console.log(tree);
        assert.strictEqual(tree.children.length,0);
        //assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<a />', function(){
        let tree = parseHTML('<a />');
        console.log(tree);
        assert.strictEqual(tree.children.length,0);
        //assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<A /> upper case', function(){
        let tree = parseHTML('<A />');
        console.log(tree);
        assert.strictEqual(tree.children.length,0);
        //assert.strictEqual(tree.children[0].children.length, 0);
    });

    it('<>', function(){
        let tree = parseHTML('<>');
        console.log(tree);
        assert.strictEqual(tree.children.length,1);
        assert.strictEqual(tree.children[0].type, "text");
    });

});