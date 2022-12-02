'use strict';

class Bitmask {
    constructor(n) {
        this.n = n;
        this.class = Bitmask;
    }
    get(i) {
        return (this.n & (1 << i)) !== 0;
    }
    toggle(i) {
        this.n ^= (1 << i);
        return this;
    }
    enable(i) {
        this.n |= (1 << i);
        return this;
    }
    disable(i) {
        this.n &= ~(1 << i);
        return this;
    }
    set(i, x) {
        if (x)
            return this.enable(i);
        else
            return this.disable(i);
    }
    export() {
        return this.n >>> 0;
    }
}

exports.Bitmask = Bitmask;
//# sourceMappingURL=bitmask.cjs.map
