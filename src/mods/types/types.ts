import { DER, Triplet } from "@hazae41/asn1"
import { Result } from "@hazae41/result"

export interface X509Type {
  toASN1(): Triplet
}

export interface X509Resolver<T> {
  tryResolveFromASN1(triplet: Triplet): Result<T, Error>
}

export namespace X509Types {

  export function tryWriteToBytes(type: X509Type) {
    return DER.tryWriteToBytes(type.toASN1())
  }

  export function tryReadFromBytes<T>(bytes: Uint8Array, type: X509Resolver<T>) {
    return DER.tryReadFromBytes(bytes).andThenSync(triplet => type.tryResolveFromASN1(triplet))
  }

}