import { Binary } from '../../../libs/binary/binary.js';

declare class Length {
    readonly value: number;
    readonly class: typeof Length;
    constructor(value: number);
    static read(binary: Binary): Length;
}

export { Length };
