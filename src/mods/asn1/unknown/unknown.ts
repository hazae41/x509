import { Type } from "mods/asn1/type/type.js";

export class Unknown {
  readonly class = Unknown

  constructor(
    readonly type: Type
  ) { }

  toString() {
    return `UNKNOWN`
  }
}