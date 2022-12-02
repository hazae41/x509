'use strict';

var tslib = require('tslib');
require('./libs/binary/binary.test.cjs');
require('./libs/bitmask/bitmask.test.cjs');
var promises = require('fs/promises');
var certificate = require('./mods/certificate.cjs');
var uvu = require('uvu');

uvu.test("The test", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const text = yield promises.readFile("./test/cert.pem", "utf8");
    certificate.PEM.from(text);
}));
uvu.test.run();
//# sourceMappingURL=index.test.cjs.map
