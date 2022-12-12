export * from "./pem/pem.test.js";

import { DER } from "@hazae41/asn1";
import { readFile } from "fs/promises";
import { Certificate } from "mods/certificate/certificate.js";
import { relative, resolve } from "path";
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

test("Cert Ed25519", async () => {
  const text = await readFile("./test/ed25519.pem", "utf8")
  const triplet = DER.fromBuffer(PEM.parse(text))
  const cert = Certificate.fromASN1(triplet)

  console.log(cert.tbsCertificate.issuer.inner.triplets.map(it => it.triplets))
})

test.run()