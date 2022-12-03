import { Binary } from '../../libs/binary/binary.js';
import { Type } from '../asn1/type/type.js';

declare class TBSCertificate {
    readonly version: number;
    readonly class: typeof TBSCertificate;
    static type: Type;
    constructor(version: number);
    static read(binary: Binary): void;
}

export { TBSCertificate };
