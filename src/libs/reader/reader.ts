import { Constructed, Sequence, Set, Triplet, Type } from "@hazae41/asn1"

export interface Readable<T> {
  fromASN1(triplet: Triplet): T
}

export class ASN1Reader {

  offset = 0

  constructor(
    readonly triplets: Triplet[]
  ) { }

  static from<C extends typeof Sequence | typeof Set>(triplet: Triplet, clazz: C) {
    if (triplet instanceof clazz)
      return new this(triplet.triplets)
    throw new Error(`Invalid instance`)
  }

  static fromTagged<C extends typeof Constructed>(triplet: Triplet, clazz: C, type: Type) {
    if (!triplet.type.equals(type))
      throw new Error(`Invalid type`)
    if (triplet instanceof clazz)
      return new this(triplet.triplets)
    throw new Error(`Invalid instance`)
  }

  tryReadTriplet() {
    return this.triplets[this.offset++] as Triplet | undefined
  }

  readTriplets() {
    return this.triplets.slice(this.offset)
  }

  readTriplet() {
    const triplet = this.tryReadTriplet()

    if (triplet !== undefined)
      return triplet
    throw new Error(`Undefined triplet`)
  }

  readClass<C extends abstract new (...x: any[]) => any>(clazz: C) {
    const triplet = this.tryReadTriplet()

    if (triplet instanceof clazz)
      return triplet as InstanceType<C>
    throw new Error(`Invalid instance`)
  }

  readClasses<C extends abstract new (...x: any[]) => any>(...clazzes: C[]) {
    const triplet = this.tryReadTriplet()

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
