import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';
import { ToStringable } from '../types.js';

declare class Set {
    readonly inner: ToStringable[];
    readonly class: typeof Set;
    static type: Type;
    constructor(inner: ToStringable[]);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary, parse: (binary: Binary) => ToStringable): Set;
}

export { Set };
