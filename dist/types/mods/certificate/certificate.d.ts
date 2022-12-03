import { Binary } from '../../libs/binary/binary.js';
import { Type } from '../asn1/type/type.js';

declare class Certificate {
    readonly class: typeof Certificate;
    static type: Type;
    constructor();
    static read(binary: Binary): Certificate;
}

export { Certificate };
