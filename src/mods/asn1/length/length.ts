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

    let length = 0

    for (let i = 0; i < count; i++)
      length += binary.readUint8() * Math.pow(256, count - i - 1)

    return new this(length)
  }
}