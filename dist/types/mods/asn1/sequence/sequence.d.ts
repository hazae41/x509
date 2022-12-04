import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../type/type.js';
import { ToStringable } from '../types.js';

declare class Sequence {
    readonly inner: ToStringable[];
    readonly class: typeof Sequence;
    static type: Type;
    constructor(inner: ToStringable[]);
    get type(): Type;
    toString(): string;
    static fromDER(binary: Binary, parse: (binary: Binary) => ToStringable): Sequence;
}

export { Sequence };
