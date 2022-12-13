import { Triplet } from "@hazae41/asn1";
import { OIDs } from "mods/oids/oids.js";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";

export type NameObject = {
  -readonly [name in keyof typeof OIDs.keys]?: string
}

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  toObject() {
    const object: NameObject = {}

    for (const rdn of this.inner.triplets) {
      for (const atav of rdn.triplets) {
        const name = OIDs.values[atav.type.value as keyof typeof OIDs.values]
        if (!name) throw new Error(`Unknown OID ${atav.type.value}`)
        object[name] = atav.getValueString()
      }
    }

    return object
  }

  static fromASN1(triplet: Triplet) {
    const inner = RDNSequence.fromASN1(triplet)

    return new this(inner)
  }
}
