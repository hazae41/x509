'use strict';

class Type {
    constructor(type) {
        this.type = type;
        this.class = Type;
    }
    static read(binary) {
        binary.readUint8();
    }
}

exports.Type = Type;
//# sourceMappingURL=type.cjs.map
