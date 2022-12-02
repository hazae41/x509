'use strict';

var bitset = require('../../../libs/bitset/bitset.cjs');

class Type {
    constructor(clazz, constructed, tag) {
        this.clazz = clazz;
        this.constructed = constructed;
        this.tag = tag;
        this.class = Type;
    }
    equals(other) {
        if (this.clazz !== other.clazz)
            return false;
        if (this.constructed !== other.constructed)
            return false;
        if (this.tag !== other.tag)
            return false;
        return true;
    }
    static read(binary) {
        const type = binary.readUint8();
        const bitset$1 = new bitset.Bitset(type, 8);
        const clazz = bitset$1.first(2);
        const constructed = bitset$1.get(5);
        const tag = bitset$1.last(5);
        if (tag > 30)
            throw new Error(`Unimplemented tag`);
        return new this(clazz, constructed, tag);
    }
}
Type.clazzes = {
    universal: 0,
    application: 1,
    context: 2,
    private: 3
};

exports.Type = Type;
//# sourceMappingURL=type.cjs.map
