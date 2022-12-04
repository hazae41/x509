'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

class ObjectID {
    constructor(buffer) {
        this.buffer = buffer;
        this.class = ObjectID;
    }
    get type() {
        return this.class.type;
    }
    toString() {
        return `OBJECT IDENTIFIER ${this.buffer.toString("hex")}`;
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
ObjectID.type = new type.Type(type.Type.clazzes.universal, false, type.Type.tags.OBJECT_IDENTIFIER);

exports.ObjectID = ObjectID;
//# sourceMappingURL=objectid.cjs.map
