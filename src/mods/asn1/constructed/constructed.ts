import { Binary } from "libs/binary/binary.js";
import { Length } from "mods/asn1/length/length.js";
import { Type } from "mods/asn1/type/type.js";
import { ToStringable } from "mods/asn1/types.js";

const stringify = (constructed: Constructed) => `[${constructed.type.tag}] {
  ${constructed.inner.map(it => it.toString()).join(`\n`).replaceAll("\n", "\n" + "  ")}
}`

export class Constructed {
  readonly class = Constructed

  constructor(
    readonly type: Type,
    readonly inner: ToStringable[]
  ) { }

  toString() {
    return stringify(this)
  }

  static fromDER(binary: Binary, parse: (binary: Binary) => ToStringable) {
    const type = Type.fromDER(binary)

    if (type.wrap !== Type.wraps.CONSTRUCTED)
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)
    const content = binary.offset

    const inner = new Array()

    while (binary.offset - content < length.value)
      inner.push(parse(binary))

    if (binary.offset - content !== length.value)
      throw new Error(`Invalid length`)

    return new this(type, inner)
  }
}