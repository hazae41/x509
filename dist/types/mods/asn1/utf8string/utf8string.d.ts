import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class UTF8String {
    readonly value: string;
    readonly class: typeof UTF8String;
    static type: Type;
    constructor(value: string);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary): UTF8String;
}

export { UTF8String };
