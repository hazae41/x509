'use strict';

var bitstring = require('./bitstring/bitstring.cjs');
var constructed = require('./constructed/constructed.cjs');
var integer = require('./integer/integer.cjs');
var objectid = require('./objectid/objectid.cjs');
var sequence = require('./sequence/sequence.cjs');
var set = require('./set/set.cjs');
var type = require('./type/type.cjs');
var unknown = require('./unknown/unknown.cjs');

exports.DER = void 0;
(function (DER) {
    function parse(binary) {
        const start = binary.offset;
        const type$1 = type.Type.fromDER(binary);
        binary.offset = start;
        if (type$1.equals(integer.Integer.type))
            return integer.Integer.fromDER(binary);
        if (type$1.equals(bitstring.BitString.type))
            return bitstring.BitString.fromDER(binary);
        if (type$1.equals(objectid.ObjectID.type))
            return objectid.ObjectID.fromDER(binary);
        if (type$1.equals(sequence.Sequence.type))
            return sequence.Sequence.fromDER(binary, parse);
        if (type$1.equals(set.Set.type))
            return set.Set.fromDER(binary, parse);
        if (type$1.clazz === type.Type.clazzes.universal)
            return unknown.Unknown.fromDER(binary);
        if (type$1.constructed)
            return constructed.Constructed.fromDER(binary, parse);
        return unknown.Unknown.fromDER(binary);
    }
    DER.parse = parse;
})(exports.DER = exports.DER || (exports.DER = {}));
//# sourceMappingURL=der.cjs.map
