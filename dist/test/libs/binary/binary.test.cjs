'use strict';

var tslib = require('tslib');
var assert = require('../assert/assert.cjs');
var binary = require('./binary.cjs');
var node_path = require('node:path');
var uvu = require('uvu');

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('libs/binary/binary.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname));
}));
uvu.test("Allocation", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 32; i++) {
        const binary$1 = binary.Binary.alloc(i);
        assert.assert(binary$1.buffer.length === i);
        assert.assert(binary$1.offset === 0);
    }
    for (let i = 0; i < 32; i++) {
        const binary$1 = binary.Binary.allocUnsafe(i);
        assert.assert(binary$1.buffer.length === i);
        assert.assert(binary$1.offset === 0);
    }
}));
uvu.test("write then read", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const buffer = Buffer.from([1, 2, 3, 4]);
    const binary$1 = binary.Binary.allocUnsafe(buffer.length);
    binary$1.write(buffer);
    assert.assert(binary$1.offset === buffer.length);
    assert.assert(binary$1.buffer.equals(buffer));
    binary$1.offset = 0;
    const buffer2 = binary$1.read(buffer.length);
    assert.assert(binary$1.offset === buffer.length);
    assert.assert(binary$1.buffer.equals(buffer2));
    assert.assert(buffer.length === buffer2.length);
    assert.assert(buffer.equals(buffer2));
}));
uvu.test("writeUint8 then readUint8", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const binary$1 = binary.Binary.allocUnsafe(1);
    const n = 42;
    binary$1.writeUint8(n);
    assert.assert(binary$1.offset === 1);
    assert.assert(binary$1.buffer.length === 1);
    assert.assert(binary$1.buffer.equals(Buffer.from([n])));
    binary$1.offset = 0;
    const n2 = binary$1.readUint8();
    assert.assert(binary$1.offset === 1);
    assert.assert(binary$1.buffer.length === 1);
    assert.assert(binary$1.buffer.equals(Buffer.from([n])));
    assert.assert(n === n2);
    binary$1.offset = 0;
    assert.assert(assert.throws(() => binary$1.writeUint8(Math.pow(2, 8))));
    assert.assert(assert.throws(() => binary$1.writeUint8(-1)));
}));
uvu.test("writeUint16 then readUint16", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const binary$1 = binary.Binary.allocUnsafe(2);
    const n = 42;
    binary$1.writeUint16(n);
    assert.assert(binary$1.offset === 2);
    assert.assert(binary$1.buffer.length === 2);
    binary$1.offset = 0;
    const n2 = binary$1.readUint16();
    assert.assert(binary$1.offset === 2);
    assert.assert(binary$1.buffer.length === 2);
    assert.assert(n === n2);
    binary$1.offset = 0;
    assert.assert(assert.throws(() => binary$1.writeUint16(Math.pow(2, 16))));
    assert.assert(assert.throws(() => binary$1.writeUint16(-1)));
}));
uvu.test("writeUint24 then readUint24", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const binary$1 = binary.Binary.allocUnsafe(3);
    const n = 42;
    binary$1.writeUint24(n);
    assert.assert(binary$1.offset === 3);
    assert.assert(binary$1.buffer.length === 3);
    binary$1.offset = 0;
    const n2 = binary$1.readUint24();
    assert.assert(binary$1.offset === 3);
    assert.assert(binary$1.buffer.length === 3);
    assert.assert(n === n2);
    binary$1.offset = 0;
    assert.assert(assert.throws(() => binary$1.writeUint16(Math.pow(2, 24))));
    assert.assert(assert.throws(() => binary$1.writeUint16(-1)));
}));
uvu.test("writeUint32 then readUint32", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const binary$1 = binary.Binary.allocUnsafe(4);
    const n = 42;
    binary$1.writeUint32(n);
    assert.assert(binary$1.offset === 4);
    assert.assert(binary$1.buffer.length === 4);
    binary$1.offset = 0;
    const n2 = binary$1.readUint32();
    assert.assert(binary$1.offset === 4);
    assert.assert(binary$1.buffer.length === 4);
    assert.assert(n === n2);
    binary$1.offset = 0;
    assert.assert(assert.throws(() => binary$1.writeUint16(Math.pow(2, 32))));
    assert.assert(assert.throws(() => binary$1.writeUint16(-1)));
}));
uvu.test.run();
//# sourceMappingURL=binary.test.cjs.map
