'use strict';

var tslib = require('tslib');
var bitset = require('./bitset.cjs');
var node_path = require('node:path');
var uvu = require('uvu');
var assert = require('uvu/assert');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var assert__namespace = /*#__PURE__*/_interopNamespaceDefault(assert);

uvu.test.before(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const directory = node_path.resolve("./dist/test/");
    const { pathname } = new URL((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('libs/bitset/bitset.test.cjs', document.baseURI).href)));
    console.log(node_path.relative(directory, pathname));
}));
function format(bitmask, digits) {
    let s = bitmask.unsigned().toString(2);
    while (s.length < digits)
        s = "0" + s;
    return s;
}
uvu.test("Identity", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask = new bitset.Bitset(0b00000000, 8);
    assert__namespace.is(bitmask.get(1), false);
    assert__namespace.is(format(bitmask, 8), "00000000");
}));
uvu.test("Enable then disable", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask = new bitset.Bitset(0b00000000, 8);
    bitmask.enable(1);
    assert__namespace.is(bitmask.get(1), true);
    assert__namespace.is(format(bitmask, 8), "00000010");
    bitmask.disable(1);
    assert__namespace.is(bitmask.get(1), false);
    assert__namespace.is(format(bitmask, 8), "00000000");
}));
uvu.test("Toggle then toggle", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask = new bitset.Bitset(0b00000000, 8);
    bitmask.toggle(1);
    assert__namespace.is(bitmask.get(1), true);
    assert__namespace.is(format(bitmask, 8), "00000010");
    bitmask.toggle(1);
    assert__namespace.is(bitmask.get(1), false);
    assert__namespace.is(format(bitmask, 8), "00000000");
}));
uvu.test("Export Int32 to Uint32", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask = new bitset.Bitset(Date.now(), 32);
    const n0 = bitmask.value;
    const e0 = bitmask.unsigned();
    bitmask.toggle(32);
    const n1 = bitmask.value;
    const e1 = bitmask.unsigned();
    assert__namespace.ok(n0 > 0);
    assert__namespace.ok(n1 < 0);
    assert__namespace.ok(e0 > 0);
    assert__namespace.ok(e1 > 0);
    const buffer = Buffer.from([0, 0, 0, 0]);
    assert__namespace.throws(() => buffer.writeUInt32BE(bitmask.value, 0));
    assert__namespace.not.throws(() => buffer.writeUInt32BE(bitmask.unsigned(), 0));
}));
uvu.test("First", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask = new bitset.Bitset(0b11100011, 8);
    assert__namespace.is(bitmask.first(2), 3);
    assert__namespace.is(bitmask.first(3), 7);
}));
uvu.test("Last", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask = new bitset.Bitset(0b11100111, 8);
    assert__namespace.is(bitmask.last(2), 3);
    assert__namespace.is(bitmask.last(3), 7);
}));
uvu.test.run();
//# sourceMappingURL=bitset.test.cjs.map
