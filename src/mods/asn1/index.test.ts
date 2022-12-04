export * from "./integer/integer.test.js";
export * from "./length/length.test.js";
export * from "./type/type.test.js";

import { readFile } from "fs/promises";
import { Binary } from "libs/binary/binary.js";
import { DER } from "mods/asn1/der.js";
import { relative, resolve } from "node:path";
import { test } from "uvu";

export namespace PEM {
  export const header = `-----BEGIN CERTIFICATE-----`
  export const footer = `-----END CERTIFICATE-----`

  export function parse(text: string) {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(header))
      throw new Error(`Missing PEM header`)
    if (!text.endsWith(footer))
      throw new Error(`Missing PEM footer`)

    const body = text.slice(header.length, -footer.length)

    return Buffer.from(body, "base64")
  }
}

export namespace PKCS7 {
  export const header = `-----BEGIN PKCS7-----`
  export const footer = `-----END PKCS7-----`

  export function parse(text: string) {
    text = text.replaceAll(`\n`, ``)

    if (!text.startsWith(header))
      throw new Error(`Missing PEM header`)
    if (!text.endsWith(footer))
      throw new Error(`Missing PEM footer`)

    const body = text.slice(header.length, -footer.length)

    return Buffer.from(body, "base64")
  }
}

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname.replace(".cjs", ".ts")))
})

test("Cert 1", async () => {
  const text = await readFile("./test/cert.pem", "utf8")
  const asn1 = DER.parse(new Binary(PEM.parse(text)))
  console.log("Cert 1", asn1.toString())
})

test("Cert 2", async () => {
  const text = await readFile("./test/cert2.pem", "utf8")
  const asn1 = DER.parse(new Binary(PEM.parse(text)))
  // console.log("Cert 2", asn1.toString())
})

test("Cert 3", async () => {
  const text = await readFile("./test/cert3.pem", "utf8")
  const asn1 = DER.parse(new Binary(PKCS7.parse(text)))
  // console.log("Cert 3", asn1.toString())
})

test.run()