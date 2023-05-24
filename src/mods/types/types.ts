import { DER, InvalidLengthError, InvalidTypeError, InvalidValueError, NotAnOID, Triplet, Unimplemented } from "@hazae41/asn1"
import { BinaryReadError } from "@hazae41/binary"
import { Bytes } from "@hazae41/bytes"
import { Result } from "@hazae41/result"
import { ASN1Resolvable } from "libs/asn1/cursor.js"

export interface X509Type {
  toASN1(): Triplet
}

export function tryWriteToBytes(type: X509Type): Result<Bytes, unknown> {
  return DER.tryWriteToBytes(type.toASN1())
}

export function tryReadFromBytes<ResolveOutput, ResolveError>(bytes: Bytes, type: ASN1Resolvable<ResolveOutput, ResolveError>): Result<ResolveOutput, ResolveError | BinaryReadError | Unimplemented | InvalidTypeError | InvalidValueError | InvalidLengthError | NotAnOID> {
  return DER.tryReadFromBytes(bytes).andThenSync(triplet => type.tryResolve(triplet))
}