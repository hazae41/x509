import { Binary } from "libs/binary/binary.js";
import { Buffers } from "libs/buffers/buffers.js";
import { Length } from "mods/asn1/length/length.js";
import { Type } from "mods/asn1/type/type.js";

export class BitString {
  readonly class = BitString

  static type = new Type(
    Type.clazzes.UNIVERSAL,
    Type.wraps.PRIMITIVE,
    Type.tags.BIT_STRING)

  constructor(
    readonly padding: number,
    readonly buffer: Buffer
  ) { }

  get type() {
    return this.class.type
  }

  toString() {
    const binary = Buffers.toBinary(this.buffer)
    return `BITSTRING ${binary.slice(0, binary.length - this.padding)}`
  }

  static fromDER(binary: Binary) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)
    const content = binary.offset

    const padding = binary.readUint8()
    const buffer = binary.read(length.value - 1)

    if (binary.offset - content !== length.value)
      throw new Error(`Invalid length`)

    return new this(padding, buffer)
  }
}