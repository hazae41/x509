'use strict';

var length = require('./asn1/length/length.cjs');
var type = require('./asn1/type/type.cjs');

class Certificate {
    constructor(
    // readonly tbsCertificate: TBSCertificate,
    // readonly algorithmIdentifier: AlgorithmIdentifier,
    // readonly signatureValue: Buffer0
    ) {
        this.class = Certificate;
    }
    static read(binary) {
        const type$1 = type.Type.read(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        length.Length.read(binary);
        return new this();
    }
}
Certificate.type = new type.Type(0, true, 16);

exports.Certificate = Certificate;
//# sourceMappingURL=certificate.cjs.map
