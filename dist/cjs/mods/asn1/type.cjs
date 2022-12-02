'use strict';

var bitset = require('../../libs/bitset/bitset.cjs');

class Type {
    constructor(clazz, constructed, tag) {
        this.clazz = clazz;
        this.constructed = constructed;
        this.tag = tag;
        this.class = Type;
    }
    static read(binary) {
        const type = binary.readUint8();
        const bitset$1 = new bitset.Bitset(type, 8);
        bitset$1.first(2);
        bitset$1.get(6);
        bitset$1.last(5);
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
