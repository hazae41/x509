import { Binary } from "libs/binary/binary.js";
import { Length } from "mods/asn1/length/length.js";
import { ASN1 } from "mods/asn1/object.js";
import { Type } from "mods/asn1/type/type.js";

export class Sequence implements ASN1 {
  readonly class = Sequence

  static type = new Type(Type.clazzes.universal, true, Type.tags.sequence)

  constructor(
    readonly inner: ASN1[]
  ) { }

  get type() {
    return this.class.type
  }

  toString() {
    return `SEQUENCE {
  ${this.inner.map(it => it.toString()).join(`\n`).replaceAll("\n", "\n" + "  ")}
}`
  }

  static read(binary: Binary, read: (binary: Binary) => unknown) {
    const type = Type.read(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.read(binary)
    const content = binary.offset

    const inner = new Array()

    while (binary.offset - content < length.value) {
      inner.push(read(binary))
    }

    return new this(inner)
  }
}