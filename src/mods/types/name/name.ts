import { InvalidLengthError, InvalidTypeError, InvalidValueError, NotAnOID, Triplet, Unimplemented } from "@hazae41/asn1";
import { BinaryReadError } from "@hazae41/binary";
import { Result } from "@hazae41/result";
import { ASN1Error } from "libs/asn1/cursor.js";
import { InvalidFormatError } from "mods/errors.js";
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

  static tryFromX501(x501: string): Result<Name, ASN1Error | BinaryReadError | Unimplemented | InvalidTypeError | InvalidValueError | InvalidLengthError | NotAnOID | InvalidFormatError> {
    return RDNSequence.tryFromX501(x501).mapSync(inner => new this(inner))
  }

  static tryResolve(triplet: Triplet): Result<Name, ASN1Error | Unimplemented> {
    return RDNSequence.tryResolve(triplet).mapSync(inner => new this(inner))
  }

}
