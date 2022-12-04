'use strict';

var buffers = require('../../../libs/buffers/buffers.cjs');
var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

class BitString {
    constructor(padding, buffer) {
        this.padding = padding;
        this.buffer = buffer;
        this.class = BitString;
    }
    get type() {
        return this.class.type;
    }
    toString() {
        const binary = buffers.Buffers.toBinary(this.buffer);
        return `BITSTRING ${binary.slice(0, binary.length - this.padding)}`;
    }
    static fromDER(binary) {
        const type$1 = type.Type.fromDER(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        const length$1 = length.Length.fromDER(binary);
        const content = binary.offset;
        const padding = binary.readUint8();
        const buffer = binary.read(length$1.value - 1);
        if (binary.offset - content !== length$1.value)
            throw new Error(`Invalid length`);
        return new this(padding, buffer);
    }
}
BitString.type = new type.Type(type.Type.clazzes.universal, false, type.Type.tags.BIT_STRING);

exports.BitString = BitString;
//# sourceMappingURL=bitstring.cjs.map
