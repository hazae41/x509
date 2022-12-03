import { Binary } from '../../libs/binary/binary.js';
import { Integer } from '../asn1/integer/integer.js';
import { Type } from '../asn1/type/type.js';

declare class TBSCertificate {
    readonly version: TBSCertificateVersion;
    readonly class: typeof TBSCertificate;
    static type: Type;
    constructor(version?: TBSCertificateVersion);
    static read(binary: Binary): TBSCertificate;
}
declare class TBSCertificateVersion {
    readonly inner: Integer;
    readonly class: typeof TBSCertificateVersion;
    static type: Type;
    constructor(inner?: Integer);
    static read(binary: Binary): TBSCertificateVersion;
}

export { TBSCertificate };
