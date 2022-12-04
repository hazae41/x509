import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';

declare class ObjectID {
    readonly buffer: Buffer;
    readonly class: typeof ObjectID;
    static type: Type;
    constructor(buffer: Buffer);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary): ObjectID;
}

export { ObjectID };
