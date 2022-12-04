import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class Integer {
    readonly value: bigint;
    readonly class: typeof Integer;
    static type: Type;
    constructor(value: bigint);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary): Integer;
}

export { Integer };
