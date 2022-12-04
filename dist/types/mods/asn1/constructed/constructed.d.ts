import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';
import { ToStringable } from '../types.js';

declare class Constructed {
    readonly type: Type;
    readonly inner: ToStringable[];
    readonly class: typeof Constructed;
    constructor(type: Type, inner: ToStringable[]);
    toString(): string;
    static fromDER(binary: Binary, parse: (binary: Binary) => ToStringable): Constructed;
}

export { Constructed };
