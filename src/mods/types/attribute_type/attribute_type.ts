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

  export const values = invert(keys)
}

export class AttributeType {

  constructor(
    readonly inner: ObjectIdentifier
  ) { }

  getShortName() {
    const key = this.inner.value as AttributeTypeShortNames.Key
    const value = AttributeTypeShortNames.keys[key]
    if (value !== undefined) return value
  }
}