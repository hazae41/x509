'use strict';

var integer = require('../../asn1/integer/integer.cjs');
var length = require('../../asn1/length/length.cjs');
var type = require('../../asn1/type/type.cjs');
var algorithm = require('../algorithm/algorithm.cjs');

class TBSCertificate {
    constructor(version, serialNumber, algorithm) {
        this.version = version;
        this.serialNumber = serialNumber;
        this.algorithm = algorithm;
        this.class = TBSCertificate;
    }
    static read(binary) {
        const type$1 = type.Type.read(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        length.Length.read(binary);
        binary.offset;
        const version = TBSCertificateVersion.read(binary);
        const serialNumber = integer.Integer.read(binary);
        const algorithm$1 = algorithm.AlgorithmIdentifier.read(binary);
        return new this(version, serialNumber, algorithm$1);
    }
}
TBSCertificate.type = new type.Type(type.Type.clazzes.universal, true, type.Type.tags.sequence);
class TBSCertificateVersion {
    constructor(inner = new integer.Integer(BigInt(1))) {
        this.inner = inner;
        this.class = TBSCertificateVersion;
    }
    static read(binary) {
        const start = binary.offset;
        const type$1 = type.Type.read(binary);
        if (!this.type.equals(type$1)) {
            binary.offset = start;
            return new this();
        }
        const length$1 = length.Length.read(binary);
        const content = binary.offset;
        const inner = integer.Integer.read(binary);
        if (binary.offset - content !== length$1.value)
            throw new Error(`Invalid length`);
        return new this(inner);
    }
}
TBSCertificateVersion.type = new type.Type(type.Type.clazzes.context, true, 0);

exports.TBSCertificate = TBSCertificate;
//# sourceMappingURL=tbscertificate.cjs.map