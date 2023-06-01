import { ASN1Error, NotAnOID, OID, ObjectIdentifier, Triplet } from "@hazae41/asn1";
import { Ok, Result } from "@hazae41/result";
import { invert } from "libs/invert/invert.js";
import { OIDs } from "mods/oids/oids.js";

export namespace KnownAttributeTypes {
  export type Key = keyof typeof keys
  export type Value = keyof typeof values

  export const keys = {
    [OIDs.keys.commonName]: "CN",
    [OIDs.keys.localityName]: "L",
    [OIDs.keys.stateOrProvinceName]: "ST",
    [OIDs.keys.organizationName]: "O",
    [OIDs.keys.organizationalUnitName]: "OU",
    [OIDs.keys.countryName]: "C",
    [OIDs.keys.streetAddress]: "STREET",
    [OIDs.keys.domainComponent]: "DC",
    [OIDs.keys.userId]: "UID"
  } as const

  export function isKey(key: string): key is Key {
    return Object.keys(keys).includes(key)
  }

  export function isValue(value: string): value is Value {
    return Object.keys(values).includes(value)
  }

  export const values = invert(keys)
}

export class KnownAttributeType {

  constructor(
    readonly inner: ObjectIdentifier<KnownAttributeTypes.Key>
  ) { }

  isKnown(): this is KnownAttributeType {
    return true
  }

  toASN1(): Triplet {
    return this.inner
  }

  static fromASN1(triplet: ObjectIdentifier<KnownAttributeTypes.Key>) {
    return new KnownAttributeType(triplet)
  }

  toX501(): string {
    return KnownAttributeTypes.keys[this.inner.value.inner]
  }

  static fromX501(name: KnownAttributeTypes.Value) {
    const key = KnownAttributeTypes.values[name]
    const inner = ObjectIdentifier.create(OID.new(key))

    return new KnownAttributeType(inner)
  }

}

export class UnknownAttributeType {

  constructor(
    readonly inner: ObjectIdentifier
  ) { }

  isKnown(): false {
    return false
  }

  toASN1(): Triplet {
    return this.inner
  }

  static fromASN1(triplet: ObjectIdentifier) {
    return new UnknownAttributeType(triplet)
  }

  toX501(): string {
    return this.inner.value.inner
  }

}

export type AttributeType =
  | KnownAttributeType
  | UnknownAttributeType

function isKnownOID(triplet: ObjectIdentifier): triplet is ObjectIdentifier<KnownAttributeTypes.Key> {
  return KnownAttributeTypes.isKey(triplet.value.inner)
}

export namespace AttributeType {

  export function fromASN1(triplet: ObjectIdentifier) {
    if (isKnownOID(triplet))
      return KnownAttributeType.fromASN1(triplet)
    else
      return UnknownAttributeType.fromASN1(triplet)
  }

  export function tryFromX501(x501: string): Result<AttributeType, ASN1Error | NotAnOID> {
    return Result.unthrowSync(t => {
      if (KnownAttributeTypes.isValue(x501))
        return new Ok(KnownAttributeType.fromX501(x501))

      const oid = OID.tryNew(x501).throw(t)
      const inner = ObjectIdentifier.create(oid)

      return new Ok(new UnknownAttributeType(inner))
    })
  }

}