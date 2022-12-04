'use strict';

var bitset = require('../../../libs/bitset/bitset.cjs');

class Length {
    constructor(value) {
        this.value = value;
        this.class = Length;
    }
    static fromDER(binary) {
        const first = binary.readUint8();
        if (first < 128)
            return new this(first);
        const count = new bitset.Bitset(first, 8)
            .disable(7)
            .value;
        let value = 0;
        for (let i = 0; i < count; i++)
            value += binary.readUint8() * (256 ** (count - i - 1));
        return new this(value);
    }
}

exports.Length = Length;
//# sourceMappingURL=length.cjs.map
