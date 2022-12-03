'use strict';

var tslib = require('tslib');
var assert = require('../../../libs/assert/assert.cjs');
var binary = require('../../../libs/binary/binary.cjs');
var integer = require('./integer.cjs');
var node_path = require('node:path');
var uvu = require('uvu');

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('mods/asn1/integer/integer.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname.replace(".cjs", ".ts")));
}));
uvu.test("Read", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const buffer = Buffer.from("02 01 00".replaceAll(" ", ""), "hex");
    const integer$1 = integer.Integer.read(new binary.Binary(buffer));
    assert.assert(integer$1.value === 0);
}));
uvu.test.run();
//# sourceMappingURL=integer.test.cjs.map
