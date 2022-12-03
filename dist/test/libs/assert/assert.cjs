'use strict';

function assert(condition, message = "Expected condition to be true") {
    if (!condition)
        throw new Error(message);
}
function throws(wrapper) {
    try {
        wrapper();
        return false;
    }
    catch (e) {
        return true;
    }
}

exports.assert = assert;
exports.throws = throws;
//# sourceMappingURL=assert.cjs.map
