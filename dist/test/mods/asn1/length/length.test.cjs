'use strict';

var tslib = require('tslib');
var assert = require('../../../libs/assert/assert.cjs');
var binary = require('../../../libs/binary/binary.cjs');
var length = require('./length.cjs');
var node_path = require('node:path');
var uvu = require('uvu');

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('mods/asn1/length/length.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname.replace(".cjs", ".ts")));
}));
function hexToLength(hex) {
    const buffer = Buffer.from(hex.replaceAll(" ", ""), "hex");
    return length.Length.fromDER(new binary.Binary(buffer)).value;
}
uvu.test("Read", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    assert.assert(hexToLength("82 01 7F") === 383);
    assert.assert(hexToLength("82 04 92") === 1170);
}));
uvu.test.run();
//# sourceMappingURL=length.test.cjs.map
