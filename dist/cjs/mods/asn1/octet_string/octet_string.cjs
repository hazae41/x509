'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

class OctetString {
    constructor(buffer) {
        this.buffer = buffer;
        this.class = OctetString;
    }
    get type() {
        return this.class.type;
    }
    toString() {
        return `OCTET STRING ${this.buffer.toString("hex")}`;
    }
    static fromDER(binary) {
        const type$1 = type.Type.fromDER(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        const length$1 = length.Length.fromDER(binary);
        const content = binary.offset;
        const buffer = binary.read(length$1.value);
        if (binary.offset - content !== length$1.value)
            throw new Error(`Invalid length`);
        return new this(buffer);
    }
}
OctetString.type = new type.Type(type.Type.clazzes.UNIVERSAL, type.Type.wraps.PRIMITIVE, type.Type.tags.OCTET_STRING);

exports.OctetString = OctetString;
//# sourceMappingURL=octet_string.cjs.map
