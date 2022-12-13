import { BitString, Sequence, Triplet } from "@hazae41/asn1";
import { Reader } from "libs/reader/reader.js";
import { AlgorithmIdentifier } from "mods/types/algorithm_identifier/algorithm_identifier.js";

export class SubjectPublicKeyInfo {

  constructor(
    readonly algorithm: AlgorithmIdentifier,
    readonly subjectPublicKey: BitString
  ) { }

  static fromASN1(triplet: Triplet) {
    const reader = Reader.from(triplet, Sequence)
    const algorithm = reader.readType(AlgorithmIdentifier)
    const subjectPublicKey = reader.readClass(BitString)

    return new this(algorithm, subjectPublicKey)
  }
}