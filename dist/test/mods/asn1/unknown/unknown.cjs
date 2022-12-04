'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

class Unknown {
    constructor(type, length) {
        this.type = type;
        this.length = length;
        this.class = Unknown;
    }
    toString() {
        return `UNKNOWN`;
    }
    static fromDER(binary) {
        const type$1 = type.Type.fromDER(binary);
        const length$1 = length.Length.fromDER(binary);
        console.log("UNKNOWN", length$1.value);
        binary.offset += length$1.value;
        return new this(type$1, length$1);
    }
}

exports.Unknown = Unknown;
//# sourceMappingURL=unknown.cjs.map
