import { Sequence, Triplet } from "@hazae41/asn1";
import { OID } from "libs/oids/oids.js";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";

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
}
