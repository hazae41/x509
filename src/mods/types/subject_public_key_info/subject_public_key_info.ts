import { BitString, DER, DERCursor, DERTriplet, Sequence } from "@hazae41/asn1";
import { Readable } from "@hazae41/binary";
import { Unimplemented } from "@hazae41/result";
import { RsaPublicKey } from "mods/keys/rsa/public.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";

export type SubjectPublicKey =
  | RsaPublicKey

export class SubjectPublicKeyInfo {

  constructor(
    readonly algorithm: AlgorithmIdentifier,
    readonly subjectPublicKey: BitString.DER
  ) { }

  toASN1(): DERTriplet {
    return Sequence.create(undefined, [
      this.algorithm.toASN1(),
      this.subjectPublicKey
    ] as const).toDER()
  }

  readPublicKeyOrThrow() {
    const triplet = Readable.readFromBytesOrThrow(DER, this.subjectPublicKey.bytes)

    if (this.algorithm.algorithm.value.inner === RsaPublicKey.oid)
      return RsaPublicKey.resolveOrThrow(new DERCursor([triplet]))

    throw new Unimplemented({ cause: `AlgorithmIdentifier` })
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsOrThrow(Sequence.DER)
    const algorithm = AlgorithmIdentifier.resolveOrThrow(cursor)
    const subjectPublicKey = cursor.readAsOrThrow(BitString.DER)

    return new SubjectPublicKeyInfo(algorithm, subjectPublicKey)
  }

}