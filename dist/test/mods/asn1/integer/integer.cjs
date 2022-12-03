'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

class Integer {
    constructor(value) {
        this.value = value;
        this.class = Integer;
    }
    static read(binary) {
        const type$1 = type.Type.read(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        length.Length.read(binary);
        return new this(0);
    }
}
Integer.type = new type.Type(type.Type.clazzes.universal, false, 2);

exports.Integer = Integer;
//# sourceMappingURL=integer.cjs.map
