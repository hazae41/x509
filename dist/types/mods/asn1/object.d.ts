import { Type } from './type/type.js';

interface Typed {
    type: Type;
}
interface ToStringable {
    toString(): string;
}

export { ToStringable, Typed };
