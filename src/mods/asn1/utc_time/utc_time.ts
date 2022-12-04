import { Binary } from "libs/binary/binary.js";
import { Length } from "mods/asn1/length/length.js";
import { Type } from "mods/asn1/type/type.js";

export class UTCTime {
  readonly class = UTCTime

  static type = new Type(
    Type.clazzes.UNIVERSAL,
    Type.wraps.PRIMITIVE,
    Type.tags.UTC_TIME)

  constructor(
    readonly value: Date
  ) { }

  get type() {
    return this.class.type
  }

  toString() {
    return `UTCTime ${this.value.toUTCString()}`
  }

  static fromDER(binary: Binary) {
    const type = Type.fromDER(binary)

    if (!this.type.equals(type))
      throw new Error(`Invalid type`)

    const length = Length.fromDER(binary)
    const content = binary.offset

    const text = binary.readString(length.value)

    if (text.length !== 13)
      throw new Error(`Invalid format`)
    if (!text.endsWith("Z"))
      throw new Error(`Invalid format`)

    const YY = Number(text.slice(0, 2))
    const MM = Number(text.slice(2, 4))
    const DD = Number(text.slice(4, 6))
    const hh = Number(text.slice(6, 8))
    const mm = Number(text.slice(8, 10))
    const ss = Number(text.slice(10, 12))

    const year = YY > 50
      ? 1900 + YY
      : 2000 + YY

    const date = new Date()
    date.setUTCFullYear(year, MM, DD)
    date.setUTCHours(hh, mm, ss)

    if (binary.offset - content !== length.value)
      throw new Error(`Invalid length`)

    return new this(date)
  }
}