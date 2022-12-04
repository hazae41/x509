'use strict';

var bit_string = require('./bit_string/bit_string.cjs');
var constructed = require('./constructed/constructed.cjs');
var integer = require('./integer/integer.cjs');
var object_identifier = require('./object_identifier/object_identifier.cjs');
var printable_string = require('./printable_string/printable_string.cjs');
var sequence = require('./sequence/sequence.cjs');
var set = require('./set/set.cjs');
var type = require('./type/type.cjs');
var unknown = require('./unknown/unknown.cjs');
var utf8_string = require('./utf8_string/utf8_string.cjs');

exports.DER = void 0;
(function (DER) {
    function parse(binary) {
        const start = binary.offset;
        const type$1 = type.Type.fromDER(binary);
        binary.offset = start;
        if (type$1.equals(integer.Integer.type))
            return integer.Integer.fromDER(binary);
        if (type$1.equals(bit_string.BitString.type))
            return bit_string.BitString.fromDER(binary);
        if (type$1.equals(object_identifier.ObjectIdentifier.type))
            return object_identifier.ObjectIdentifier.fromDER(binary);
        if (type$1.equals(utf8_string.UTF8String.type))
            return utf8_string.UTF8String.fromDER(binary);
        if (type$1.equals(printable_string.PrintableString.type))
            return printable_string.PrintableString.fromDER(binary);
        if (type$1.equals(sequence.Sequence.type))
            return sequence.Sequence.fromDER(binary, parse);
        if (type$1.equals(set.Set.type))
            return set.Set.fromDER(binary, parse);
        if (type$1.clazz === type.Type.clazzes.UNIVERSAL)
            return unknown.Unknown.fromDER(binary); // TODO throw
        if (type$1.wrap)
            return constructed.Constructed.fromDER(binary, parse);
        return unknown.Unknown.fromDER(binary);
    }
    DER.parse = parse;
})(exports.DER = exports.DER || (exports.DER = {}));
//# sourceMappingURL=der.cjs.map
