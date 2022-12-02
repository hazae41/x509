import { Binary } from '../libs/binary/binary.js';
import { Type } from './asn1/type/type.js';

declare class PEM {
    readonly certificate: Certificate;
    readonly class: typeof PEM;
    static header: string;
    static footer: string;
    constructor(certificate: Certificate);
    static from(text: string): PEM;
}
declare class Certificate {
    readonly class: typeof Certificate;
    static type: Type;
    constructor();
    static read(binary: Binary): Certificate;
}

export { Certificate, PEM };
