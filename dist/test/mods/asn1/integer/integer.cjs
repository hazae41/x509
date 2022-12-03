'use strict';

var bitset = require('../../../libs/bitset/bitset.cjs');
var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

function read(value, negative) {
    if (negative)
        return new bitset.Bitset(value, 8).not().value;
    return value;
}
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
        let value = BigInt(0);
        const first = binary.readUint8(true);
        const bitset$1 = new bitset.Bitset(first, 8);
        const negative = bitset$1.get(7);
        for (let i = 0; i < length$1.value; i++)
            value += BigInt(read(binary.readUint8(), negative)) * (BigInt(256) ** BigInt(length$1.value - i - 1));
        if (negative)
            value = ~value;
        return new this(value);
    }
}
Integer.type = new type.Type(type.Type.clazzes.universal, false, type.Type.tags.integer);

exports.Integer = Integer;
//# sourceMappingURL=integer.cjs.map
