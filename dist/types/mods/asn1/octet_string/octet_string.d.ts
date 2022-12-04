import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class OctetString {
    readonly buffer: Buffer;
    readonly class: typeof OctetString;
    static type: Type;
    constructor(buffer: Buffer);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary): OctetString;
}

export { OctetString };
