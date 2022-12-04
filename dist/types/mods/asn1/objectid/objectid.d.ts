import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class ObjectID {
    readonly value: string;
    readonly class: typeof ObjectID;
    static type: Type;
    constructor(value: string);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary): ObjectID;
}

export { ObjectID };
