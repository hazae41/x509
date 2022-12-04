import { Binary } from "libs/binary/binary.js"
import { Length } from "mods/asn1/length/length.js"
import { Type } from "mods/asn1/type/type.js"

export class ObjectID {
  readonly class = ObjectID

  static type = new Type(
    Type.clazzes.UNIVERSAL,
    Type.wraps.PRIMITIVE,
    Type.tags.OBJECT_IDENTIFIER)

  constructor(
    readonly value: string
  ) { }

  get type() {
    return this.class.type
  }

  toString() {
    return `OBJECT IDENTIFIER ${this.value}`
  }

  static fromDER(binary: Binary) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)
    const content = binary.offset

    const head = binary.readUint8()
    const first = Math.floor(head / 40);
    const second = head % 40;

    const values = [first, second]

    for (let i = 1; i < length.value; i++) {
      const value = binary.readUint8()

      if (value > 127) // TODO
        throw new Error(`Unimplemented multi-byte OID value`)

      values.push(value)
    }

    if (binary.offset - content !== length.value)
      throw new Error(`Invalid length`)

    return new this(values.join("."))
  }
}