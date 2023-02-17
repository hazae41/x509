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

  toShortName() {
    const key = this.inner.value as AttributeTypeShortNames.Key
    const value = AttributeTypeShortNames.keys[key]

    if (value === undefined) return

    return value
  }

  static fromShortName(name: string) {
    const value = name as AttributeTypeShortNames.Value
    const key = AttributeTypeShortNames.values[value]

    if (key === undefined) return

    const inner = ObjectIdentifier.new(key)

    return new this(inner)
  }

  toX501() {
    const name = this.toShortName()
    if (name !== undefined) return name

    return this.inner.value
  }

  static fromX501(string: string) {
    const short = this.fromShortName(string)
    if (short !== undefined) return short

    const inner = ObjectIdentifier.new(string)

    return new this(inner)
  }
}