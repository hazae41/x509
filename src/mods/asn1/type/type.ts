import { Binary } from "libs/binary/binary.js";
import { Bitset } from "libs/bitset/bitset.js";

export class Type {
  readonly class = Type

  static clazzes = {
    universal: 0,
    application: 1,
    context: 2,
    private: 3
  }

  static tags = {
    integer: 2,
    sequence: 16
  }

  constructor(
    readonly clazz: number,
    readonly constructed: boolean,
    readonly tag: number
  ) { }

  equals(other: Type) {
    if (this.clazz !== other.clazz)
      return false
    if (this.constructed !== other.constructed)
      return false
    if (this.tag !== other.tag)
      return false
    return true
  }

  static read(binary: Binary) {
    const type = binary.readUint8()
    const bitset = new Bitset(type, 8)

    const clazz = bitset.first(2)
    const constructed = bitset.get(5)
    const tag = bitset.last(5)

    if (tag > 30)
      throw new Error(`Unimplemented tag`)

    return new this(clazz, constructed, tag)
  }
}