'use strict';

var bitset = require('../../../libs/bitset/bitset.cjs');

class Length {
    constructor(value) {
        this.value = value;
        this.class = Length;
    }
    static read(binary) {
        const first = binary.readUint8();
        if (first < 128)
            return new this(first);
        const count = new bitset.Bitset(first, 8).last(7);
        let length = 0;
        for (let i = 0; i < count; i++)
            length += binary.readUint8() * Math.pow(256, count - i - 1);
        return new this(length);
    }
}

exports.Length = Length;
//# sourceMappingURL=length.cjs.map
