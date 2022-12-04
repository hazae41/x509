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
        const content = binary.offset;
        let value = BigInt(0);
        const first = binary.readUint8(true);
        const negative = first > 127;
        for (let i = 0; i < length$1.value; i++)
            value += BigInt(sign(binary.readUint8(), negative)) * (BigInt(256) ** BigInt(length$1.value - i - 1));
        if (negative)
            value = ~value;
        if (binary.offset - content !== length$1.value)
            throw new Error(`Invalid length`);
        return new this(value);
    }
}
Integer.type = new type.Type(type.Type.clazzes.UNIVERSAL, type.Type.wraps.PRIMITIVE, type.Type.tags.INTEGER);

exports.Integer = Integer;
//# sourceMappingURL=integer.cjs.map
