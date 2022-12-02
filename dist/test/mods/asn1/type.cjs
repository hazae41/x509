'use strict';

var bitmask = require('../../libs/bitmask/bitmask.cjs');

class Type {
    constructor(type) {
        this.type = type;
        this.class = Type;
    }
    static read(binary) {
        const type = binary.readUint8();
        new bitmask.Bitmask(type);
    }
}

exports.Type = Type;
//# sourceMappingURL=type.cjs.map
