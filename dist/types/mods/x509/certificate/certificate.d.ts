import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../../asn1/type/type.js';
import { TBSCertificate } from './tbscertificate.js';

declare class Certificate {
    readonly tbsCertificate: TBSCertificate;
    readonly class: typeof Certificate;
    static type: Type;
    constructor(tbsCertificate: TBSCertificate);
    static read(binary: Binary): Certificate;
}

export { Certificate };
