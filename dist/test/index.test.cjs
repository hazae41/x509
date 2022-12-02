'use strict';

var tslib = require('tslib');
require('./libs/binary/binary.test.cjs');
require('./libs/bitset/bitset.test.cjs');
var promises = require('fs/promises');
require('./mods/asn1/type/type.cjs');
var certificate = require('./mods/certificate.cjs');
var node_path = require('node:path');
var uvu = require('uvu');

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname));
}));
uvu.test("The test", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const text = yield promises.readFile("./test/cert.pem", "utf8");
    certificate.PEM.from(text);
}));
uvu.test.run();
//# sourceMappingURL=index.test.cjs.map
