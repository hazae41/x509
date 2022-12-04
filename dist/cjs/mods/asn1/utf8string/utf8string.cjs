'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

class UTF8String {
    constructor(value) {
        this.value = value;
        this.class = UTF8String;
    }
    get type() {
        return this.class.type;
    }
    toString() {
        return `UTF8String ${this.value}`;
    }
    static fromDER(binary) {
        const type$1 = type.Type.fromDER(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        const length$1 = length.Length.fromDER(binary);
        const content = binary.offset;
        const value = binary.readString(length$1.value);
        if (binary.offset - content !== length$1.value)
            throw new Error(`Invalid length`);
        return new this(value);
    }
}
UTF8String.type = new type.Type(type.Type.clazzes.UNIVERSAL, type.Type.wraps.PRIMITIVE, type.Type.tags.UTF8_STRING);

exports.UTF8String = UTF8String;
//# sourceMappingURL=utf8string.cjs.map
