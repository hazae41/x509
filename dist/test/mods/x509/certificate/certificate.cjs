'use strict';

var length = require('../../asn1/length/length.cjs');
var type = require('../../asn1/type/type.cjs');
var tbscertificate = require('./tbscertificate.cjs');

class Certificate {
    constructor(tbsCertificate) {
        this.tbsCertificate = tbsCertificate;
        this.class = Certificate;
    }
    static read(binary) {
        const type$1 = type.Type.read(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        length.Length.read(binary);
        const tbscert = tbscertificate.TBSCertificate.read(binary);
        return new this(tbscert);
    }
}
Certificate.type = new type.Type(type.Type.clazzes.universal, true, type.Type.tags.sequence);

exports.Certificate = Certificate;
//# sourceMappingURL=certificate.cjs.map
