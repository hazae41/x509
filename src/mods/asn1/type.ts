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

  constructor(
    readonly clazz: number,
    readonly constructed: boolean,
    readonly tag: number
  ) { }

  static read(binary: Binary) {
    const type = binary.readUint8()
    const bitset = new Bitset(type, 8)

    const clazz = bitset.first(2)
    const constructed = bitset.get(6)
    const tag = bitset.last(5)
  }
}