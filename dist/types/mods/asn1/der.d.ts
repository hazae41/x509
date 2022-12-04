import { Binary } from '../../libs/binary/binary.js';
import { Typed, ToStringable } from './object.js';

declare namespace DER {
    function parse(binary: Binary): Typed & ToStringable;
}

export { DER };
