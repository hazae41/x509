'use strict';

exports.PEM = void 0;
(function (PEM) {
    PEM.header = `-----BEGIN CERTIFICATE-----`;
    PEM.footer = `-----END CERTIFICATE-----`;
    function parse(text) {
        text = text.replaceAll(`\n`, ``);
        if (!text.startsWith(PEM.header))
            throw new Error(`Missing PEM header`);
        if (!text.endsWith(PEM.footer))
            throw new Error(`Missing PEM footer`);
        const body = text.slice(PEM.header.length, -PEM.footer.length);
        return Buffer.from(body, "base64");
    }
    PEM.parse = parse;
    function stringify(buffer) {
        let result = `${PEM.header}\n`;
        let body = buffer.toString("base64");
        while (body) {
            result += `${body.slice(0, 64)}\n`;
            body = body.slice(64);
        }
        result += `${PEM.footer}\n`;
        return result;
    }
    PEM.stringify = stringify;
})(exports.PEM = exports.PEM || (exports.PEM = {}));
//# sourceMappingURL=pem.cjs.map
