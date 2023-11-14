import { Constructed, DERCursor, DERTriplet, Integer, Type } from "@hazae41/asn1";
import { Nullable } from "@hazae41/option";

export class TBSCertificateVersion {
  readonly #class = TBSCertificateVersion

  static readonly type = new Type(
    Type.clazzes.CONTEXT,
    Type.wraps.CONSTRUCTED,
    0
  ).toDER()

  static readonly values = {
    v1: Integer.create(undefined, 0n).toDER(),
    v2: Integer.create(undefined, 1n).toDER(),
    v3: Integer.create(undefined, 2n).toDER(),
  } as const

  constructor(
    readonly value: Nullable<Integer>
  ) { }

  toDER(): DERTriplet {
    return new Constructed(this.#class.type, [
      this.value?.toDER()
    ] as const).toDER()
  }

  static from(value: bigint) {
    return new this(Integer.create(undefined, value).toDER())
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsType(this.type, Constructed.DER)

    if (cursor == null)
      return undefined

    const value = cursor.readAsOrThrow(Integer.DER)

    return new TBSCertificateVersion(value)
  }

}