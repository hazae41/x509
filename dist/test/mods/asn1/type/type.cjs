'use strict';

var bitset = require('../../../libs/bitset/bitset.cjs');

class Type {
    constructor(clazz, wrap, tag) {
        this.clazz = clazz;
        this.wrap = wrap;
        this.tag = tag;
        this.class = Type;
    }
    equals(other) {
        if (this.clazz !== other.clazz)
            return false;
        if (this.wrap !== other.wrap)
            return false;
        if (this.tag !== other.tag)
            return false;
        return true;
    }
    static fromDER(binary) {
        const type = binary.readUint8();
        const bitset$1 = new bitset.Bitset(type, 8);
        const clazz = bitset$1.first(2);
        const constructed = bitset$1.get(5);
        const tag = bitset$1.last(5);
        if (tag > 30) // TODO
            throw new Error(`Unimplemented tag`);
        return new this(clazz, constructed, tag);
    }
}
Type.clazzes = {
    UNIVERSAL: 0,
    APPLICATION: 1,
    CONTEXT: 2,
    PRIVATE: 3
};
Type.wraps = {
    PRIMITIVE: false,
    CONSTRUCTED: true
};
Type.tags = {
    INTEGER: 2,
    BIT_STRING: 3,
    OBJECT_IDENTIFIER: 6,
    UTF8_STRING: 12,
    SEQUENCE: 16,
    SET: 17,
    PRINTABLE_STRING: 19
};

exports.Type = Type;
//# sourceMappingURL=type.cjs.map
