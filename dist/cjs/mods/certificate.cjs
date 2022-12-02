'use strict';

var binary = require('../libs/binary/binary.cjs');
var type = require('./asn1/type.cjs');

class PEM {
    constructor(certificate) {
        this.certificate = certificate;
        this.class = PEM;
    }
    static from(text) {
        text = text.replaceAll(`\n`, ``);
        if (!text.startsWith(this.header))
            throw new Error(`Missing PEM header`);
        if (!text.endsWith(this.footer))
            throw new Error(`Missing PEM footer`);
        const body = text.slice(this.header.length, -this.footer.length);
        const binary$1 = new binary.Binary(Buffer.from(body, "base64"));
        const certificate = Certificate.read(binary$1);
        return new this(certificate);
    }
}
PEM.header = `-----BEGIN CERTIFICATE-----`;
PEM.footer = `-----END CERTIFICATE-----`;
class Certificate {
    constructor(
    // readonly tbsCertificate: TBSCertificate,
    // readonly algorithmIdentifier: AlgorithmIdentifier,
    // readonly signatureValue: Buffer0
    ) {
        this.class = Certificate;
    }
    static read(binary) {
        type.Type.read(binary);
        return new this();
    }
}

exports.Certificate = Certificate;
exports.PEM = PEM;
//# sourceMappingURL=certificate.cjs.map
