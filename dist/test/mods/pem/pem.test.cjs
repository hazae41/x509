'use strict';

var tslib = require('tslib');
var pem = require('./pem.cjs');
var promises = require('node:fs/promises');
var node_path = require('node:path');
var uvu = require('uvu');
var assert = require('uvu/assert');

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('mods/pem/pem.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname));
}));
function ignoreLastNewline(text) {
    if (text.endsWith("\n"))
        return text.slice(0, -1);
    else
        return text;
}
uvu.test("Parse and stringify", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const text = yield promises.readFile("./test/cert.pem", "utf8");
    const buffer = pem.PEM.parse(text);
    const text2 = pem.PEM.stringify(buffer);
    assert.is(ignoreLastNewline(text), ignoreLastNewline(text2));
}));
uvu.test.run();
//# sourceMappingURL=pem.test.cjs.map
