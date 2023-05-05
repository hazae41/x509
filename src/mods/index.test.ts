export * from "./pem/pem.test.js";
export * from "./types/index.test.js";

import { DER } from "@hazae41/asn1";
import { Bytes } from "@hazae41/bytes";
import { assert, test } from "@hazae41/phobos";
import { readFile } from "fs/promises";
import { PEM } from "mods/pem/pem.js";
import { Certificate } from "mods/types/certificate/certificate.js";
import { relative, resolve } from "path";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".mjs", ".ts")))

function checkCertificate(bytes: Uint8Array, cert: Certificate) {
  assert(Bytes.toHex(bytes) === Bytes.toHex(DER.tryWriteToBytes(cert.toASN1()).unwrap()))
}

await test("Cert Ed25519", async () => {
  const text = await readFile("./certs/ed25519.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.tryReadFromBytes(buffer).unwrap()
  const cert = Certificate.tryResolveFromASN1(triplet).unwrap()

  checkCertificate(buffer, cert)
})

await test("Cert Let's Encrypt", async () => {
  const text = await readFile("./certs/letsencrypt.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.tryReadFromBytes(buffer).unwrap()
  const cert = Certificate.tryResolveFromASN1(triplet).unwrap()

  checkCertificate(buffer, cert)
})

await test("Cert frank4dd-rsa", async () => {
  const buffer = await readFile("./certs/frank4dd-rsa.der")
  const triplet = DER.tryReadFromBytes(buffer).unwrap()
  const cert = Certificate.tryResolveFromASN1(triplet).unwrap()

  checkCertificate(buffer, cert)
})

await test("Cert frank4dd-dsa", async () => {
  const buffer = await readFile("./certs/frank4dd-dsa.der")
  const triplet = DER.tryReadFromBytes(buffer).unwrap()
  const cert = Certificate.tryResolveFromASN1(triplet).unwrap()

  checkCertificate(buffer, cert)
})

await test("Cert Tor", async () => {
  const text = await readFile("./certs/tor.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.tryReadFromBytes(buffer).unwrap()
  const cert = Certificate.tryResolveFromASN1(triplet).unwrap()

  checkCertificate(buffer, cert)
})

test("Cert Tor 2", async () => {
  const text = await readFile("./certs/tor2.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.tryReadFromBytes(buffer).unwrap()
  const cert = Certificate.tryResolveFromASN1(triplet).unwrap()

  checkCertificate(buffer, cert)
})

test("Cert full", async () => {
  const text = await readFile("./certs/full.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.tryReadFromBytes(buffer).unwrap()
  const cert = Certificate.tryResolveFromASN1(triplet).unwrap()

  checkCertificate(buffer, cert)
})