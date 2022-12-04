import { Binary } from '../../libs/binary/binary.js';
import { ToStringable } from './types.js';

declare namespace DER {
    function parse(binary: Binary): ToStringable;
}

export { DER };
