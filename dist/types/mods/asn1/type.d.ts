import { Binary } from '../../libs/binary/binary.js';

declare class Type {
    readonly type: number;
    readonly class: typeof Type;
    constructor(type: number);
    static read(binary: Binary): void;
}

export { Type };
