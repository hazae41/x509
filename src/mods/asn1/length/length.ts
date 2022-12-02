import { Binary } from "libs/binary/binary.js";

export class Length {
  readonly class = Length

  constructor(
    readonly value: number
  ) { }

  static read(binary: Binary) {
    const start = binary.offset

    const first = binary.readUint8()
    if (first < 128) return new this(first)


  }
}