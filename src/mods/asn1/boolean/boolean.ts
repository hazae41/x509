import { Binary } from "libs/binary/binary.js"
import { Length } from "mods/asn1/length/length.js"
import { Type } from "mods/asn1/type/type.js"

export class Boolean {
  readonly class = Boolean

  static type = new Type(
    Type.clazzes.UNIVERSAL,
    Type.wraps.PRIMITIVE,
    Type.tags.BOOLEAN)

  constructor(
    readonly value: boolean
  ) { }

  get type() {
    return this.class.type
  }

  toString() {
    return `BOOLEAN ${this.value}`
  }

  static fromDER(binary: Binary) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)
    const content = binary.offset

    const value = binary.readUint8() > 0

    if (binary.offset - content !== length.value)
      throw new Error(`Invalid length`)

    return new this(value)
  }
}