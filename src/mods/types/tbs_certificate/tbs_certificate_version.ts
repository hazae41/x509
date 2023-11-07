import { Constructed, DERCursor, DERTriplet, Integer, Type } from "@hazae41/asn1";

export class TBSCertificateVersion {
  readonly #class = TBSCertificateVersion

  static type = new Type(
    Type.clazzes.CONTEXT,
    Type.wraps.CONSTRUCTED,
    0).toDER()

  constructor(
    readonly value = Integer.create(undefined, BigInt(1)).toDER()
  ) { }

  toASN1(): DERTriplet {
    return new Constructed(this.#class.type, [this.value] as const).toDER()
  }

  toNumber() {
    return Number(this.value.value)
  }

  static fromNumber(value: number) {
    return new this(Integer.create(undefined, BigInt(value)).toDER())
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsTypeOrThrow(this.type, Constructed.DER)
    const value = cursor.readAsOrThrow(Integer.DER)

    return new TBSCertificateVersion(value)
  }

  static resolve(parent: DERCursor) {
    try {
      return this.resolveOrThrow(parent)
    } catch (e: unknown) { }
  }

}