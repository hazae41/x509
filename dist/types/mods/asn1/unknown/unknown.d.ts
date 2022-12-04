import { Type } from '../type/type.js';

declare class Unknown {
    readonly type: Type;
    readonly class: typeof Unknown;
    constructor(type: Type);
    toString(): string;
}

export { Unknown };
