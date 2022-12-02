import { Binary } from "libs/binary/binary.js";
import { Bitmask } from "libs/bitmask/bitmask.js";

export class Type {
  readonly class = Type

  constructor(
    readonly type: number
  ) { }

  static read(binary: Binary) {
    const type = binary.readUint8()
    const btype = new Bitmask(type)


  }
}