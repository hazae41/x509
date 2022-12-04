import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class ObjectIdentifier {
    readonly value: string;
    readonly class: typeof ObjectIdentifier;
    static type: Type;
    constructor(value: string);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary): ObjectIdentifier;
}

export { ObjectIdentifier };
