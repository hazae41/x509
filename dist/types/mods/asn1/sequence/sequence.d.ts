import { Binary } from '../../../libs/binary/binary.js';
import { ASN1 } from '../object.js';
import { Type } from '../type/type.js';

declare class Sequence implements ASN1 {
    readonly inner: ASN1[];
    readonly class: typeof Sequence;
    static type: Type;
    constructor(inner: ASN1[]);
    get type(): Type;
    toString(): string;
    static read(binary: Binary, read: (binary: Binary) => unknown): Sequence;
}

export { Sequence };
