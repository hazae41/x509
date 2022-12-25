import { ObjectIdentifier, Sequence, Triplet, UTF8String } from "@hazae41/asn1";
import { OIDs } from "mods/oids/oids.js";
import { AttributeType } from "mods/types/attribute_type/attribute_type.js";
import { AttributeTypeAndValue } from "mods/types/attribute_type_and_value/attribute_type_and_value.js";
import { AttributeValue } from "mods/types/attribute_value/attribute_value.js";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";
import { RelativeDistinguishedName } from "mods/types/relative_distinguished_name/relative_distinguished_name.js";

export type NameObject = {
  -readonly [key in OIDs.Key]?: string
}

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  toString() {
    return this.inner.toString()
  }

  toASN1(): Sequence {
    return this.inner.toASN1()
  }

  static fromASN1(triplet: Triplet) {
    return new this(RDNSequence.fromASN1(triplet))
  }

  toObject() {
    const object: NameObject = {}

    for (const rdn of this.inner.triplets) {
      for (const atav of rdn.triplets) {
        const name = OIDs.values[atav.type.inner.value as OIDs.Value]
        if (!name) throw new Error(`Unknown OID ${atav.type.inner.value}`)
        object[name] = atav.value.toDirectoryString().inner.value
      }
    }

    return object
  }

  static fromObject(object: NameObject) {
    const triplets = new Array<RelativeDistinguishedName>()

    for (const property in object) {
      const key = property as OIDs.Key
      const type = new AttributeType(new ObjectIdentifier(OIDs.keys[key]))
      const value = new AttributeValue(new UTF8String(object[key]!))
      const atav = new AttributeTypeAndValue(type, value)
      triplets.push(new RelativeDistinguishedName([atav]))
    }

    return new this(new RDNSequence(triplets))
  }
}
