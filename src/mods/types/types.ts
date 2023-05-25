import { DER, DERReadError, DERWriteError, Triplet } from "@hazae41/asn1"
import { Bytes } from "@hazae41/bytes"
import { Result } from "@hazae41/result"
import { ASN1Resolvable } from "libs/asn1/cursor.js"

export interface X509Type {
  toASN1(): Triplet
}

export function tryWriteToBytes(type: X509Type): Result<Bytes, DERWriteError> {
  return DER.tryWriteToBytes(type.toASN1())
}

export function tryReadFromBytes<T extends ASN1Resolvable.Infer<T>>(resolvable: T, bytes: Bytes): Result<ASN1Resolvable.ResolveOutput<T>, ASN1Resolvable.ResolveError<T> | DERReadError> {
  return DER.tryReadFromBytes(bytes).andThenSync(triplet => resolvable.tryResolve(triplet))
}