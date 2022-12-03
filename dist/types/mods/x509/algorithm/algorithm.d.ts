import { Binary } from '../../../libs/binary/binary.js';
import { Type } from '../../asn1/type/type.js';

declare class AlgorithmIdentifier {
    readonly algorith: Buffer;
    readonly class: typeof AlgorithmIdentifier;
    static type: Type;
    constructor(algorith: Buffer);
    static read(binary: Binary): AlgorithmIdentifier;
}

export { AlgorithmIdentifier };
