import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class PrintableString {
    readonly value: string;
    readonly class: typeof PrintableString;
    static type: Type;
    constructor(value: string);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary): PrintableString;
}

export { PrintableString };
