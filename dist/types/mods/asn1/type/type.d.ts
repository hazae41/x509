import { Binary } from '../../../libs/binary/binary.js';

declare class Type {
    readonly clazz: number;
    readonly constructed: boolean;
    readonly tag: number;
    readonly class: typeof Type;
    static clazzes: {
        universal: number;
        application: number;
        context: number;
        private: number;
    };
    static tags: {
        INTEGER: number;
        BIT_STRING: number;
        OBJECT_IDENTIFIER: number;
        SEQUENCE: number;
        SET: number;
    };
    constructor(clazz: number, constructed: boolean, tag: number);
    equals(other: Type): boolean;
    static fromDER(binary: Binary): Type;
}

export { Type };
