import { Binary } from '../../libs/binary/binary.js';
import { ToStringable } from './object.js';

declare namespace DER {
    function parse(binary: Binary): ToStringable;
}

export { DER };
