import { Binary } from "libs/binary/binary.js"
import { Length } from "mods/asn1/length/length.js"
import { Type } from "mods/asn1/type/type.js"

export class AlgorithmIdentifier {
  readonly class = AlgorithmIdentifier

  static type = new Type(Type.clazzes.universal, true, Type.tags.sequence)

  constructor(
    readonly algorith: Buffer
  ) { }

  static read(binary: Binary) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)

    binary.offset += length.value

    return new this(Buffer.from([0]))
  }
}