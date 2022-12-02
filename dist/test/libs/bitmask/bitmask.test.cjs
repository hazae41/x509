'use strict';

var tslib = require('tslib');
var uvu = require('uvu');
var assert = require('uvu/assert');
var bitmask = require('./bitmask.cjs');

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

function format(bitmask, digits) {
    let s = bitmask.export().toString(2);
    while (s.length < digits)
        s = "0" + s;
    return s;
}
uvu.test("Identity", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask$1 = new bitmask.Bitmask(0b00000000);
    assert__namespace.is(bitmask$1.get(1), false);
    assert__namespace.is(format(bitmask$1, 8), "00000000");
}));
uvu.test("Enable then disable", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask$1 = new bitmask.Bitmask(0b00000000);
    bitmask$1.enable(1);
    assert__namespace.is(bitmask$1.get(1), true);
    assert__namespace.is(format(bitmask$1, 8), "00000010");
    bitmask$1.disable(1);
    assert__namespace.is(bitmask$1.get(1), false);
    assert__namespace.is(format(bitmask$1, 8), "00000000");
}));
uvu.test("Toggle then toggle", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask$1 = new bitmask.Bitmask(0b00000000);
    bitmask$1.toggle(1);
    assert__namespace.is(bitmask$1.get(1), true);
    assert__namespace.is(format(bitmask$1, 8), "00000010");
    bitmask$1.toggle(1);
    assert__namespace.is(bitmask$1.get(1), false);
    assert__namespace.is(format(bitmask$1, 8), "00000000");
}));
uvu.test("Export Int32 to Uint32", () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const bitmask$1 = new bitmask.Bitmask(Date.now());
    const n0 = bitmask$1.n;
    const e0 = bitmask$1.export();
    bitmask$1.toggle(32);
    const n1 = bitmask$1.n;
    const e1 = bitmask$1.export();
    assert__namespace.ok(n0 > 0);
    assert__namespace.ok(n1 < 0);
    assert__namespace.ok(e0 > 0);
    assert__namespace.ok(e1 > 0);
    const buffer = Buffer.from([0, 0, 0, 0]);
    assert__namespace.throws(() => buffer.writeUInt32BE(bitmask$1.n, 0));
    assert__namespace.not.throws(() => buffer.writeUInt32BE(bitmask$1.export(), 0));
}));
uvu.test.run();
//# sourceMappingURL=bitmask.test.cjs.map
