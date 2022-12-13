import { Constructed, Sequence, Set, Triplet, Type } from "@hazae41/asn1"

export interface Readable<T> {
  fromASN1(triplet: Triplet): T
}

export class Reader {
  offset = 0

  constructor(
    readonly triplets: Triplet[]
  ) { }

  static from<C extends typeof Sequence | typeof Set>(triplet: Triplet, clazz: C) {
    if (triplet instanceof clazz)
      return new this(triplet.triplets)
    throw new Error(`Invalid instance`)
  }

  static fromConstructed(triplet: Triplet, type: Type) {
    if (!triplet.type.equals(type))
      throw new Error(`Invalid type`)
    if (triplet instanceof Constructed)
      return new this(triplet.triplets)
    throw new Error(`Invalid instance`)
  }

  readTriplet() {
    return this.triplets[this.offset++]
  }

  readClass<C extends abstract new (...x: any[]) => any>(clazz: C) {
    const triplet = this.readTriplet()

    if (triplet instanceof clazz)
      return triplet as InstanceType<C>
    throw new Error(`Invalid instance`)
  }

  readClasses<C extends abstract new (...x: any[]) => any>(...clazzes: C[]) {
    const triplet = this.readTriplet()

    for (const clazz of clazzes)
      if (triplet instanceof clazz)
        return triplet as InstanceType<C>
    throw new Error(`Invalid instance`)
  }

  readType<T>(type: Readable<T>) {
    return type.fromASN1(this.readTriplet())
  }

  tryReadType<T>(type: Readable<T>) {
    try {
      return this.readType(type)
    } catch (e: unknown) {
      this.offset--
    }
  }
}
