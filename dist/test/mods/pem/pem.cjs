'use strict';

class PEM {
    constructor() {
        this.class = PEM;
    }
    static parse(text) {
        text = text.replaceAll(`\n`, ``);
        if (!text.startsWith(this.header))
            throw new Error(`Missing PEM header`);
        if (!text.endsWith(this.footer))
            throw new Error(`Missing PEM footer`);
        const body = text.slice(this.header.length, -this.footer.length);
        return Buffer.from(body, "base64");
    }
}
PEM.header = `-----BEGIN CERTIFICATE-----`;
PEM.footer = `-----END CERTIFICATE-----`;

exports.PEM = PEM;
//# sourceMappingURL=pem.cjs.map
