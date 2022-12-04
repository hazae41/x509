import { Binary } from "libs/binary/binary.js"
import { Bitset } from "libs/bitset/bitset.js"
import { Length } from "mods/asn1/length/length.js"
import { Type } from "mods/asn1/type/type.js"

function sign(value: number, negative: boolean) {
  if (negative)
    return new Bitset(value, 8).not().value
  return value
}

export class Integer {
  readonly class = Integer

  static type = new Type(Type.clazzes.universal, false, Type.tags.INTEGER)

  constructor(
    readonly value: bigint
  ) { }

  get type() {
    return this.class.type
  }

  toString() {
    return `INTEGER ${this.value}`
  }

  static fromDER(binary: Binary) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)

    let value = BigInt(0)

    const first = binary.readUint8(true)
    const negative = first > 127

    for (let i = 0; i < length.value; i++)
      value += BigInt(sign(binary.readUint8(), negative)) * (BigInt(256) ** BigInt(length.value - i - 1))

    if (negative) value = ~value

    return new this(value)
  }
}