'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

const stringify = (set) => `SET {
  ${set.inner.map(it => it.toString()).join(`\n`).replaceAll("\n", "\n" + "  ")}
}`;
class Set {
    constructor(inner) {
        this.inner = inner;
        this.class = Set;
    }
    get type() {
        return this.class.type;
    }
    toString() {
        return stringify(this);
    }
    static fromDER(binary, parse) {
        const type$1 = type.Type.fromDER(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        const length$1 = length.Length.fromDER(binary);
        const content = binary.offset;
        const inner = new Array();
        while (binary.offset - content < length$1.value) {
            inner.push(parse(binary));
        }
        return new this(inner);
    }
}
Set.type = new type.Type(type.Type.clazzes.universal, true, type.Type.tags.SET);

exports.Set = Set;
//# sourceMappingURL=set.cjs.map
