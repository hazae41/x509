'use strict';

var tslib = require('tslib');
var binary = require('../../../libs/binary/binary.cjs');
var type = require('../type/type.cjs');
var pem = require('../../pem/pem.cjs');
var promises = require('node:fs/promises');
var node_path = require('node:path');
var uvu = require('uvu');
var assert = require('uvu/assert');
var length = require('./length.cjs');

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('mods/asn1/length/length.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname));
}));
uvu.test("Read", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const text = yield promises.readFile("./test/cert.pem", "utf8");
    const binary$1 = new binary.Binary(pem.PEM.parse(text));
    type.Type.read(binary$1);
    const length$1 = length.Length.read(binary$1);
    assert.is(length$1.value, 383);
}));
uvu.test.run();
//# sourceMappingURL=length.test.cjs.map
