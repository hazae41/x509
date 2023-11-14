import { Boolean, Constructed, DERCursor, ObjectIdentifier, OctetString, Sequence, Type } from "@hazae41/asn1";
import { Nullable } from "@hazae41/option";

declare global {
  interface Array<T> {
    filter(filter: typeof Boolean): NonNullable<T>[]
  }
}

export class Extensions {

  static readonly type = new Type(
    Type.clazzes.CONTEXT,
    Type.wraps.CONSTRUCTED,
    3
  ).toDER()

  constructor(
    readonly extensions: Extension[]
  ) { }

  toDER() {
    return Constructed.create(Extensions.type, [
      Sequence.create(undefined, this.extensions.map(ext => ext.toDER())).toDER()
    ]).toDER()
  }

  static resolveOrThrow(parent: DERCursor) {
    const explicit = parent.subAsType(this.type, Constructed.DER)

    if (explicit == null)
      return undefined

    const sequence = explicit.subAsOrThrow(Sequence.DER)

    if (sequence.triplets.length === 0)
      throw new Error("Extensions must be non-empty")

    return new Extensions(sequence.triplets.map(() => Extension.resolveOrThrow(sequence)))
  }

}

export class Extension {

  constructor(
    readonly extnID: ObjectIdentifier,
    readonly critical: Nullable<Boolean>,
    readonly extnValue: OctetString
  ) { }

  toDER() {
    return Sequence.create(undefined, [
      this.extnID.toDER(),
      this.critical?.toDER(),
      this.extnValue.toDER()
    ] as const).toDER()
  }

  static resolveOrThrow(parent: DERCursor) {
    const cursor = parent.subAsOrThrow(Sequence.DER)

    const identifier = cursor.readAsOrThrow(ObjectIdentifier.DER)
    const critical = cursor.readAs(Boolean.DER)
    const content = cursor.readAsOrThrow(OctetString.DER)

    return new Extension(identifier, critical, content)
  }

}