import { invert } from "libs/invert/invert.js"

export namespace OID {
  export const keys = {
    commonName: "2.5.4.3",
    serialNumber: "2.5.4.5",
    countryName: "2.5.4.6",
    localityName: "2.5.4.7",
    stateOrProvinceName: "2.5.4.8",
    organizationName: "2.5.4.10",
    organizationUnitName: "2.5.4.11",
    emailAddress: "1.2.840.113549.1.9.1",
    sha256WithRSAEncryption: "1.2.840.113549.1.1.11",
    rsaEncryption: "1.2.840.113549.1.1.1"
  } as const

  export const values = invert(keys)
}