import { DER, Triplet } from "@hazae41/asn1"
import { Bytes } from "@hazae41/bytes"
import { Result } from "@hazae41/result"

export interface X509Type {
  toASN1(): Triplet
}

export interface X509Resolver<T> {
  tryResolveFromASN1(triplet: Triplet): Result<T, Error>
}

export function tryWriteToBytes(type: X509Type): Result<Bytes, unknown> {
  return DER.tryWriteToBytes(type.toASN1())
}

export function tryReadFromBytes<T>(bytes: Bytes, type: X509Resolver<T>): Result<T, Error> {
  return DER.tryReadFromBytes(bytes).andThenSync(triplet => type.tryResolveFromASN1(triplet))
}