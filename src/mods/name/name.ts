import { ObjectIdentifier, Triplet } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";

export class AttributeTypeAndValue {

  constructor(
    readonly type: ObjectIdentifier,
    readonly value: Triplet
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)
    const type = reader.readObjectIdentifier()
    const value = reader.read()

    return new this(type, value)
  }
}

export class RelativeDistinguishedName {

  constructor(
    readonly triplets: AttributeTypeAndValue[]
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSet(triplet)

    const triplets = new Array<AttributeTypeAndValue>(reader.triplets.length)

    for (let i = 0; i < triplets.length; i++)
      triplets[i] = reader.readType(AttributeTypeAndValue)

    return new this(triplets)
  }
}

export class RDNSequence {

  constructor(
    readonly triplets: RelativeDistinguishedName[]
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.fromSequence(triplet)

    const triplets = new Array<RelativeDistinguishedName>(reader.triplets.length)

    for (let i = 0; i < triplets.length; i++)
      triplets[i] = reader.readType(RelativeDistinguishedName)

    return new this(triplets)
  }
}

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  static fromASN1(triplet: Triplet) {
    const inner = RDNSequence.fromASN1(triplet)

    return new this(inner)
  }
}
