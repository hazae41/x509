import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class Integer {
    readonly value: number;
    readonly class: typeof Integer;
    static type: Type;
    constructor(value: number);
    static read(binary: Binary): Integer;
}

export { Integer };
