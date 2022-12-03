'use strict';

var tslib = require('tslib');
var assert = require('../../../libs/assert/assert.cjs');
var binary = require('../../../libs/binary/binary.cjs');
var type = require('./type.cjs');
var certificate = require('../../x509/certificate/certificate.cjs');
var node_path = require('node:path');
var uvu = require('uvu');

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('mods/asn1/type/type.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname.replace(".cjs", ".ts")));
}));
function hexToType(hex) {
    const buffer = Buffer.from(hex.replaceAll(" ", ""), "hex");
    return type.Type.read(new binary.Binary(buffer));
}
uvu.test("Read", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    assert.assert(hexToType("30").equals(certificate.Certificate.type));
}));
uvu.test.run();
//# sourceMappingURL=type.test.cjs.map
