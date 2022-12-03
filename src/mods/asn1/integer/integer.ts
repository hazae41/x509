import { Binary } from "libs/binary/binary.js"
import { Length } from "mods/asn1/length/length.js"
import { Type } from "mods/asn1/type/type.js"

export class Integer {
  readonly class = Integer

  static type = new Type(Type.clazzes.universal, false, Type.tags.integer)

  constructor(
    readonly value: bigint
  ) { }

  static read(binary: Binary) {
    const type = Type.read(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.read(binary)

    let value = BigInt(0)

    for (let i = 0; i < length.value; i++)
      value += BigInt(binary.readUint8()) * (BigInt(256) ** BigInt(length.value - i - 1))

    return new this(value)
  }
}