'use strict';

require('../asn1/integer/integer.cjs');
var length = require('../asn1/length/length.cjs');
var type = require('../asn1/type/type.cjs');

class TBSCertificate {
    constructor(version) {
        this.version = version;
        this.class = TBSCertificate;
    }
    static read(binary) {
        const type$1 = type.Type.read(binary);
        if (!this.type.equals(type$1))
            throw new Error(`Invalid type`);
        length.Length.read(binary);
    }
}
TBSCertificate.type = new type.Type(type.Type.clazzes.universal, true, type.Type.tags.sequence);
new type.Type(type.Type.clazzes.context, true, 0);

exports.TBSCertificate = TBSCertificate;
//# sourceMappingURL=tbscertificate.cjs.map
