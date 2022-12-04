'use strict';

var length = require('../length/length.cjs');
var type = require('../type/type.cjs');

const stringify = (constructed) => `[${constructed.type.tag}] {
  ${constructed.inner.map(it => it.toString()).join(`\n`).replaceAll("\n", "\n" + "  ")}
}`;
class Constructed {
    constructor(type, inner) {
        this.type = type;
        this.inner = inner;
        this.class = Constructed;
    }
    toString() {
        return stringify(this);
    }
    static fromDER(binary, parse) {
        const type$1 = type.Type.fromDER(binary);
        const length$1 = length.Length.fromDER(binary);
        const content = binary.offset;
        const inner = new Array();
        while (binary.offset - content < length$1.value) {
            inner.push(parse(binary));
        }
        return new this(type$1, inner);
    }
}

exports.Constructed = Constructed;
//# sourceMappingURL=constructed.cjs.map
