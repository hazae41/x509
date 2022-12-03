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
        const length$1 = length.Length.read(binary);
        let value = 0;
        for (let i = 0; i < length$1.value; i++)
            value += binary.readUint8() * Math.pow(256, length$1.value - i - 1);
        return new this(value);
    }
}
Integer.type = new type.Type(type.Type.clazzes.universal, false, type.Type.tags.integer);

exports.Integer = Integer;
//# sourceMappingURL=integer.cjs.map
