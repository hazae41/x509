import { Binary } from '../../../libs/binary/binary.js';

declare class Type {
    readonly clazz: number;
    readonly wrap: boolean;
    readonly tag: number;
    readonly class: typeof Type;
    static clazzes: {
        readonly UNIVERSAL: 0;
        readonly APPLICATION: 1;
        readonly CONTEXT: 2;
        readonly PRIVATE: 3;
    };
    static wraps: {
        readonly PRIMITIVE: false;
        readonly CONSTRUCTED: true;
    };
    static tags: {
        readonly INTEGER: 2;
        readonly BIT_STRING: 3;
        readonly OCTET_STRING: 4;
        readonly OBJECT_IDENTIFIER: 6;
        readonly UTF8_STRING: 12;
        readonly SEQUENCE: 16;
        readonly SET: 17;
        readonly PRINTABLE_STRING: 19;
    };
    constructor(clazz: number, wrap: boolean, tag: number);
    equals(other: Type): boolean;
    static fromDER(binary: Binary): Type;
}

export { Type };
