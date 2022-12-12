import { BitString, Constructed, Integer, ObjectIdentifier, Sequence, Set, Triplet, Type } from "@hazae41/asn1"

export interface Readable<T> {
  fromASN1(triplet: Triplet): T
}

export class Reader {
  offset = 0

  constructor(
    readonly triplets: Triplet[]
  ) { }

  static fromSequence(triplet: Triplet) {
    if (triplet instanceof Sequence)
      return new this(triplet.triplets)
    throw new Error(`Invalid instance`)
  }

  static fromSet(triplet: Triplet) {
    if (triplet instanceof Set)
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

  read() {
    return this.triplets[this.offset++]
  }

  readInteger() {
    const triplet = this.read()

    if (triplet instanceof Integer)
      return triplet
    throw new Error(`Invalid instance`)
  }

  readObjectIdentifier() {
    const triplet = this.read()

    if (triplet instanceof ObjectIdentifier)
      return triplet
    throw new Error(`Invalid instance`)
  }

  readBitString() {
    const triplet = this.read()

    if (triplet instanceof BitString)
      return triplet
    throw new Error(`Invalid instance`)
  }

  readType<T>(type: Readable<T>) {
    return type.fromASN1(this.read())
  }

  tryReadType<T>(type: Readable<T>) {
    try {
      return this.readType(type)
    } catch (e: unknown) {
      this.offset--
    }
  }
}
