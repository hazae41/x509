import { ObjectIdentifier } from "@hazae41/asn1";
import { invert } from "libs/invert/invert.js";
import { OIDs } from "mods/oids/oids.js";

export namespace AttributeTypeShortNames {
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
    readonly inner: ObjectIdentifier<AttributeTypeShortNames.Key>
  ) { }

  isKnown(): this is KnownAttributeType {
    return true
  }

  toASN1() {
    return this.inner
  }

  static fromASN1(triplet: ObjectIdentifier<AttributeTypeShortNames.Key>) {
    return new KnownAttributeType(triplet)
  }

  toOID() {
    return this.toASN1().value
  }

  static fromOID(oid: AttributeTypeShortNames.Key) {
    const inner = ObjectIdentifier.create(oid)

    return KnownAttributeType.fromASN1(inner)
  }

  toShortName(): AttributeTypeShortNames.Value {
    return AttributeTypeShortNames.keys[this.toASN1().value]
  }

  static fromShortName(name: AttributeTypeShortNames.Value) {
    const key = AttributeTypeShortNames.values[name]
    const inner = ObjectIdentifier.create(key)

    return new KnownAttributeType(inner)
  }

  toX501(): string {
    return this.toShortName()
  }

}

export class UnknownAttributeType {

  constructor(
    readonly inner: ObjectIdentifier
  ) { }

  isKnown(): false {
    return false
  }

  toASN1() {
    return this.inner
  }

  static fromASN1(triplet: ObjectIdentifier) {
    return new UnknownAttributeType(triplet)
  }

  toX501(): string {
    return this.toASN1().value
  }

}

export type AttributeType =
  | KnownAttributeType
  | UnknownAttributeType

export namespace AttributeType {

  export function fromASN1(triplet: ObjectIdentifier) {
    if (AttributeTypeShortNames.isKey(triplet.value))
      return KnownAttributeType.fromASN1(triplet as ObjectIdentifier<AttributeTypeShortNames.Key>)
    return UnknownAttributeType.fromASN1(triplet)
  }

  export function fromX501(x501: string) {
    if (AttributeTypeShortNames.isKey(x501))
      return KnownAttributeType.fromOID(x501)
    if (AttributeTypeShortNames.isValue(x501))
      return KnownAttributeType.fromShortName(x501)

    // TODO: check if isOID

    const inner = ObjectIdentifier.create(x501)
    return new UnknownAttributeType(inner)
  }

}