import { Binary } from "libs/binary/binary.js"
import { Bitset } from "libs/bitset/bitset.js"
import { Length } from "mods/asn1/length/length.js"
import { Type } from "mods/asn1/type/type.js"

export namespace VLQ {

  export function read(binary: Binary) {
    const values = new Array<number>()

    while (true) {
      const current = binary.readUint8()

      if (current <= 127) {
        values.push(current)
        break
      }

      const bitset = new Bitset(current, 8)
      values.push(bitset.disable(7).value)
    }

    let value = 0

    for (let i = 0; i < values.length; i++)
      value += values[i] * (128 ** (values.length - i - 1))
    return value
  }

}

export class ObjectIdentifier {
  readonly class = ObjectIdentifier

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

    while (binary.offset - content < length.value)
      values.push(VLQ.read(binary))

    if (binary.offset - content !== length.value)
      throw new Error(`Invalid length`)

    return new this(values.join("."))
  }
}