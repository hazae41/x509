'use strict';

var length = require('../../asn1/length/length.cjs');
var type = require('../../asn1/type/type.cjs');

class AlgorithmIdentifier {
    constructor(algorith) {
        this.algorith = algorith;
        this.class = AlgorithmIdentifier;
    }
    static read(binary) {
        const type$1 = type.Type.fromDER(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        const length$1 = length.Length.fromDER(binary);
        binary.offset += length$1.value;
        return new this(Buffer.from([0]));
    }
}
AlgorithmIdentifier.type = new type.Type(type.Type.clazzes.universal, true, type.Type.tags.sequence);

exports.AlgorithmIdentifier = AlgorithmIdentifier;
//# sourceMappingURL=algorithm.cjs.map
