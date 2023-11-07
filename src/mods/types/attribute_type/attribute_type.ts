import { DERTriplet, OID, ObjectIdentifier } from "@hazae41/asn1";
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
    readonly inner: ObjectIdentifier.DER<KnownAttributeTypes.Key>
  ) { }

  isKnown(): this is KnownAttributeType {
    return true
  }

  toASN1(): DERTriplet {
    return this.inner
  }

  static fromASN1(triplet: ObjectIdentifier.DER<KnownAttributeTypes.Key>) {
    return new KnownAttributeType(triplet)
  }

  toX501(): string {
    return KnownAttributeTypes.keys[this.inner.value.inner]
  }

  static fromX501(name: KnownAttributeTypes.Value) {
    const key = KnownAttributeTypes.values[name]
    const oid = OID.newWithoutCheck(key)
    const inner = ObjectIdentifier.create(undefined, oid).toDER()

    return new KnownAttributeType(inner)
  }

}

export class UnknownAttributeType {

  constructor(
    readonly inner: ObjectIdentifier.DER
  ) { }

  isKnown(): false {
    return false
  }

  toASN1(): DERTriplet {
    return this.inner
  }

  static fromASN1(triplet: ObjectIdentifier.DER) {
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

  export function fromASN1(triplet: ObjectIdentifier.DER) {
    if (isKnownOID(triplet))
      return KnownAttributeType.fromASN1(triplet)
    else
      return UnknownAttributeType.fromASN1(triplet)
  }

  export function fromX501OrThrow(x501: string) {
    if (KnownAttributeTypes.isValue(x501))
      return KnownAttributeType.fromX501(x501)

    const oid = OID.newOrThrow(x501)
    const inner = ObjectIdentifier.create(undefined, oid).toDER()

    return new UnknownAttributeType(inner)
  }

}