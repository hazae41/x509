import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class BitString {
    readonly padding: number;
    readonly buffer: Buffer;
    readonly class: typeof BitString;
    static type: Type;
    constructor(padding: number, buffer: Buffer);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary): BitString;
}

export { BitString };
