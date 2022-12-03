'use strict';

class Bitset {
    constructor(value, length) {
        this.value = value;
        this.length = length;
        this.class = Bitset;
    }
    unsigned() {
        return this.value >>> 0;
    }
    get(index) {
        if (index < 0)
            throw new Error(`Index is negative`);
        if (index > this.length)
            throw new Error(`Index is too big`);
        return (this.value & (1 << index)) !== 0;
    }
    not() {
        for (let i = 0; i < this.length; i++)
            this.toggle(i);
        return this;
    }
    toggle(index) {
        if (index < 0)
            throw new Error(`Index is negative`);
        if (index > this.length)
            throw new Error(`Index is too big`);
        this.value ^= (1 << index);
        return this;
    }
    enable(index) {
        if (index < 0)
            throw new Error(`Index is negative`);
        if (index > this.length)
            throw new Error(`Index is too big`);
        this.value |= (1 << index);
        return this;
    }
    disable(index) {
        if (index < 0)
            throw new Error(`Index is negative`);
        if (index > this.length)
            throw new Error(`Index is too big`);
        this.value &= ~(1 << index);
        return this;
    }
    set(index, value) {
        if (value)
            return this.enable(index);
        else
            return this.disable(index);
    }
    first(count) {
        if (count < 0)
            throw new Error(`Count is negative`);
        if (count > this.length)
            throw new Error(`Count is too big`);
        return this.value >> (this.length - count);
    }
    last(count) {
        if (count < 0)
            throw new Error(`Count is negative`);
        if (count > this.length)
            throw new Error(`Count is too big`);
        return this.value & ((1 << count) - 1);
    }
}

exports.Bitset = Bitset;
//# sourceMappingURL=bitset.cjs.map
