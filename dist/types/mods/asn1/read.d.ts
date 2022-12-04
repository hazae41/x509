import { Binary } from '../../libs/binary/binary.js';
import { ASN1 } from './object.js';

declare function read(binary: Binary): ASN1;

export { read };
