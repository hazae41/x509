'use strict';

class Unknown {
    constructor(type) {
        this.type = type;
        this.class = Unknown;
    }
    toString() {
        return `UNKNOWN`;
    }
}

exports.Unknown = Unknown;
//# sourceMappingURL=unknown.cjs.map
