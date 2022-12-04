'use strict';

var integer = require('./integer/integer.cjs');
var length = require('./length/length.cjs');
var sequence = require('./sequence/sequence.cjs');
var type = require('./type/type.cjs');
var unknown = require('./unknown/unknown.cjs');

function read(binary) {
    const start = binary.offset;
    const type$1 = type.Type.read(binary);
    const length$1 = length.Length.read(binary);
    const content = binary.offset;
    binary.offset = start;
    if (type$1.equals(sequence.Sequence.type))
        return sequence.Sequence.read(binary, read);
    if (type$1.equals(integer.Integer.type))
        return integer.Integer.read(binary);
    binary.offset = content;
    binary.offset += length$1.value;
    return new unknown.Unknown(type$1);
}

exports.read = read;
//# sourceMappingURL=read.cjs.map
