import { Binary } from "libs/binary/binary.js";
import { Bitset } from "libs/bitset/bitset.js";

export class Length {
  readonly class = Length

  constructor(
    readonly value: number
  ) { }

  static read(binary: Binary) {
    const first = binary.readUint8()
    if (first < 128) return new this(first)

    const count = new Bitset(first, 8).last(7)

    let value = 0

    for (let i = 0; i < count; i++)
      value += binary.readUint8() * (256 ** (count - i - 1))

    return new this(value)
  }
}