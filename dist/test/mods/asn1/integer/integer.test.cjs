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
function hexToInteger(hex) {
    const buffer = Buffer.from(hex.replaceAll(" ", ""), "hex");
    return integer.Integer.read(new binary.Binary(buffer)).value;
}
uvu.test("Read", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    assert.assert(hexToInteger("02 01 00") === BigInt(0));
    assert.assert(hexToInteger("02 02 30 39") === BigInt(12345));
    assert.assert(hexToInteger("02 12 03 D4 15 31 8E 2C 57 1D 29  05 FC 3E 05 27 68 9D 0D 09") === BigInt("333504890676592408951587385614406537514249"));
}));
uvu.test.run();
//# sourceMappingURL=integer.test.cjs.map
