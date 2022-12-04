import { Binary } from "libs/binary/binary.js";
import { Length } from "mods/asn1/length/length.js";
import { Type } from "mods/asn1/type/type.js";
import { ToStringable } from "mods/asn1/types.js";

const stringify = (set: Set) => `SET {
  ${set.inner.map(it => it.toString()).join(`\n`).replaceAll("\n", "\n" + "  ")}
}`

export class Set {
  readonly class = Set

  static type = new Type(Type.clazzes.universal, true, Type.tags.SET)

  constructor(
    readonly inner: ToStringable[]
  ) { }

  get type() {
    return this.class.type
  }

  toString() {
    return stringify(this)
  }

  static fromDER(binary: Binary, parse: (binary: Binary) => ToStringable) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)
    const content = binary.offset

    const inner = new Array()

    while (binary.offset - content < length.value) {
      inner.push(parse(binary))
    }

    return new this(inner)
  }
}