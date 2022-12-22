import { ObjectIdentifier, Sequence, Triplet, UTF8String } from "@hazae41/asn1";
import { OID } from "mods/oids/oids.js";
import { AttributeTypeAndValue } from "mods/types/attribute_type_and_value/attribute_type_and_value.js";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";
import { RelativeDistinguishedName } from "mods/types/relative_distinguished_name/relative_distinguished_name.js";

export type NameObject = {
  -readonly [name in keyof typeof OID.keys]?: string
}

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  toASN1(): Sequence {
    return this.inner.toASN1()
  }

  static fromASN1(triplet: Triplet) {
    return new this(RDNSequence.fromASN1(triplet))
  }

  toNameObject() {
    const object: NameObject = {}

    for (const rdn of this.inner.triplets) {
      for (const atav of rdn.triplets) {
        const name = OID.values[atav.type.value as keyof typeof OID.values]
        if (!name) throw new Error(`Unknown OID ${atav.type.value}`)
        object[name] = atav.getValueString()
      }
    }

    return object
  }

  static fromNameObject(object: NameObject) {
    const triplets = new Array<RelativeDistinguishedName>()

    for (const property in object) {
      const key = property as keyof typeof OID.keys
      const type = new ObjectIdentifier(OID.keys[key])
      const value = new UTF8String(object[key]!)
      const atav = new AttributeTypeAndValue(type, value)
      triplets.push(new RelativeDistinguishedName([atav]))
    }

    return new this(new RDNSequence(triplets))
  }
}
