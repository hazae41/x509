'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

class PrintableString {
    constructor(value) {
        this.value = value;
        this.class = PrintableString;
    }
    get type() {
        return this.class.type;
    }
    toString() {
        return `PrintableString ${this.value}`;
    }
    static fromDER(binary) {
        const type$1 = type.Type.fromDER(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        const length$1 = length.Length.fromDER(binary);
        const content = binary.offset;
        const value = binary.readString(length$1.value);
        if (!/^[a-zA-Z '()+,\-.?:\/=]+$/g.test(value))
            throw new Error(`Invalid value`);
        if (binary.offset - content !== length$1.value)
            throw new Error(`Invalid length`);
        return new this(value);
    }
}
PrintableString.type = new type.Type(type.Type.clazzes.UNIVERSAL, type.Type.wraps.PRIMITIVE, type.Type.tags.PRINTABLE_STRING);

exports.PrintableString = PrintableString;
//# sourceMappingURL=printable_string.cjs.map
