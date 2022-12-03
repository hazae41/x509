'use strict';

var tslib = require('tslib');
require('./libs/binary/binary.test.cjs');
require('./libs/bitset/bitset.test.cjs');
require('./mods/asn1/integer/integer.test.cjs');
require('./mods/asn1/length/length.test.cjs');
require('./mods/asn1/type/type.test.cjs');
require('./mods/pem/pem.test.cjs');
var promises = require('fs/promises');
var binary = require('./libs/binary/binary.cjs');
var certificate = require('./mods/certificate/certificate.cjs');
var pem = require('./mods/pem/pem.cjs');
var node_path = require('node:path');
var uvu = require('uvu');

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname.replace(".cjs", ".ts")));
}));
uvu.test("The test", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const text = yield promises.readFile("./test/cert.pem", "utf8");
    const cert = certificate.Certificate.read(new binary.Binary(pem.PEM.parse(text)));
    console.log(cert.tbsCertificate.version.inner.value);
}));
uvu.test.run();
//# sourceMappingURL=index.test.cjs.map
