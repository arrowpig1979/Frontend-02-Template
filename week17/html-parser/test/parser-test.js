var assert = require('assert');

import {parseHTML} from '../src/parser.js';

describe('parser html:', function(){

    it('<a>abc</a>', function(){
        parseHTML('<a>abc</a>');
        assert.strictEqual(1,1);
    });
});