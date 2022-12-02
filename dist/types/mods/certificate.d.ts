import { Binary } from '../libs/binary/binary.js';

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
    constructor();
    static read(binary: Binary): Certificate;
}

export { Certificate, PEM };
