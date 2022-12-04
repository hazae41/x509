'use strict';

var bitset = require('../../../libs/bitset/bitset.cjs');
var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

function sign(value, negative) {
    if (negative)
        return new bitset.Bitset(value, 8).not().value;
    return value;
}
class Integer {
    constructor(value) {
        this.value = value;
        this.class = Integer;
    }
    get type() {
        return this.class.type;
    }
    toString() {
        return `INTEGER ${this.value}`;
    }
    static fromDER(binary) {
        const type$1 = type.Type.fromDER(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        const length$1 = length.Length.fromDER(binary);
        let value = BigInt(0);
        const first = binary.readUint8(true);
        const negative = first > 127;
        for (let i = 0; i < length$1.value; i++)
            value += BigInt(sign(binary.readUint8(), negative)) * (BigInt(256) ** BigInt(length$1.value - i - 1));
        if (negative)
            value = ~value;
        return new this(value);
    }
}
Integer.type = new type.Type(type.Type.clazzes.universal, false, type.Type.tags.integer);

exports.Integer = Integer;
//# sourceMappingURL=integer.cjs.map
