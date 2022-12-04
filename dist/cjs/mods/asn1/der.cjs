'use strict';

var constructed = require('./constructed/constructed.cjs');
var integer = require('./integer/integer.cjs');
var length = require('./length/length.cjs');
var sequence = require('./sequence/sequence.cjs');
var type = require('./type/type.cjs');
var unknown = require('./unknown/unknown.cjs');

exports.DER = void 0;
(function (DER) {
    function parse(binary) {
        const start = binary.offset;
        const type$1 = type.Type.fromDER(binary);
        const length$1 = length.Length.fromDER(binary);
        const content = binary.offset;
        binary.offset = start;
        if (type$1.equals(sequence.Sequence.type))
            return sequence.Sequence.fromDER(binary, parse);
        if (type$1.equals(integer.Integer.type))
            return integer.Integer.fromDER(binary);
        if (type$1.clazz === type.Type.clazzes.context) {
            if (type$1.constructed)
                return constructed.Constructed.fromDER(binary, parse);
        }
        binary.offset = content;
        binary.offset += length$1.value;
        return new unknown.Unknown(type$1);
    }
    DER.parse = parse;
})(exports.DER = exports.DER || (exports.DER = {}));
//# sourceMappingURL=der.cjs.map
