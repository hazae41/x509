'use strict';

exports.Buffers = void 0;
(function (Buffers) {
    function toBinary(buffer) {
        const bn = BigInt("0x" + buffer.toString("hex"));
        return bn.toString(2).padStart(buffer.length * 8, "0");
    }
    Buffers.toBinary = toBinary;
})(exports.Buffers = exports.Buffers || (exports.Buffers = {}));
//# sourceMappingURL=buffers.cjs.map
