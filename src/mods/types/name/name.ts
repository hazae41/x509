import { Triplet } from "@hazae41/asn1";
import { Result } from "@hazae41/result";
import { RDNSequence } from "mods/types/rdn_sequence/rdn_sequence.js";

export class Name {

  constructor(
    readonly inner: RDNSequence
  ) { }

  toASN1(): Triplet {
    return this.inner.toASN1()
  }

  tryToX501(): Result<string, unknown> {
    return this.inner.tryToX501()
  }

  static tryFromX501(x501: string): Result<Name, Error> {
    return RDNSequence.tryFromX501(x501).mapSync(inner => new this(inner))
  }

  static tryResolveFromASN1(triplet: Triplet): Result<Name, Error> {
    return RDNSequence.tryResolveFromASN1(triplet).mapSync(inner => new this(inner))
  }

}
