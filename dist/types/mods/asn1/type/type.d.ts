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
    constructor(clazz: number, constructed: boolean, tag: number);
    equals(other: Type): boolean;
    static read(binary: Binary): Type;
}

export { Type };