import { Binary } from "libs/binary/binary.js"
import { Length } from "mods/asn1/length/length.js"
import { Type } from "mods/asn1/type/type.js"

export class ObjectID {
  readonly class = ObjectID

  static type = new Type(Type.clazzes.universal, false, Type.tags.OBJECT_IDENTIFIER)

  constructor(
    readonly buffer: Buffer
  ) { }

  get type() {
    return this.class.type
  }

  toString() {
    return `OBJECT IDENTIFIER ${this.buffer.toString("hex")}`
  }

  static fromDER(binary: Binary) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)
    const content = binary.offset

    const buffer = binary.read(length.value)

    if (binary.offset - content !== length.value)
      throw new Error(`Invalid length`)

    return new this(buffer)
  }
}