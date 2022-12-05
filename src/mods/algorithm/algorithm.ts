import { Sequence } from "@hazae41/asn1"

export class AlgorithmIdentifier {
  readonly class = AlgorithmIdentifier

  constructor(
    readonly algorith: Buffer
  ) { }

  static fromASN1(sequence: Sequence) {
    // TODO
  }
}