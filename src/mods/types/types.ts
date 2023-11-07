import { ASN1Resolvable, DER, DERReadError, DERTriplet, DERWriteError } from "@hazae41/asn1"
import { Result } from "@hazae41/result"

export interface X509Type {
  toASN1(): DERTriplet
}

export function tryWriteToBytes(type: X509Type): Result<Uint8Array, DERWriteError> {
  return DER.tryWriteToBytes(type.toASN1())
}

export function tryReadFromBytes<T extends ASN1Resolvable.Infer<T>>(resolvable: T, bytes: Uint8Array): Result<ASN1Resolvable.ResolveOutput<T>, ASN1Resolvable.ResolveError<T> | DERReadError> {
  return DER.tryReadFromBytes(bytes).andThenSync(triplet => resolvable.tryResolve(triplet))
}