import { Binary } from '../../../libs/binary/binary.js';
import { Length } from '../length/length.js';
import { Type } from '../type/type.js';

declare class Unknown {
    readonly type: Type;
    readonly length: Length;
    readonly class: typeof Unknown;
    constructor(type: Type, length: Length);
    toString(): string;
    static fromDER(binary: Binary): Unknown;
}

export { Unknown };
