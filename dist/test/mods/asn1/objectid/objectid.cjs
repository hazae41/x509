'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

class ObjectID {
    constructor(value) {
        this.value = value;
        this.class = ObjectID;
    }
    get type() {
        return this.class.type;
    }
    toString() {
        return `OBJECT IDENTIFIER ${this.value}`;
    }
    static fromDER(binary) {
        const type$1 = type.Type.fromDER(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        const length$1 = length.Length.fromDER(binary);
        const content = binary.offset;
        const head = binary.readUint8();
        const first = Math.floor(head / 40);
        const second = head % 40;
        const values = [first, second];
        for (let i = 1; i < length$1.value; i++) {
            const value = binary.readUint8();
            if (value > 127) // TODO
                throw new Error(`Unimplemented multi-byte OID value`);
            values.push(value);
        }
        if (binary.offset - content !== length$1.value)
            throw new Error(`Invalid length`);
        return new this(values.join("."));
    }
}
ObjectID.type = new type.Type(type.Type.clazzes.universal, false, type.Type.tags.OBJECT_IDENTIFIER);

exports.ObjectID = ObjectID;
//# sourceMappingURL=objectid.cjs.map
