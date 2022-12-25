export * from "./pem/pem.test.js";
export * from "./types/index.test.js";

import { DER } from "@hazae41/asn1";
import { assert, test } from "@hazae41/phobos";
import { readFile } from "fs/promises";
import { PEM } from "mods/pem/pem.js";
import { Certificate } from "mods/types/certificate/certificate.js";
import { relative, resolve } from "path";


const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".cjs", ".ts")))

function checkCertificate(buffer: Buffer, cert: Certificate) {
  assert(buffer.equals(DER.toBuffer(cert.toASN1())))
}

test("Cert Ed25519", async () => {
  const text = await readFile("./certs/ed25519.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.fromBuffer(buffer)
  const cert = Certificate.fromASN1(triplet)

  checkCertificate(buffer, cert)
})

test("Cert Let's Encrypt", async () => {
  const text = await readFile("./certs/letsencrypt.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.fromBuffer(buffer)
  const cert = Certificate.fromASN1(triplet)

  checkCertificate(buffer, cert)
})

test("Cert frank4dd-rsa", async () => {
  const buffer = await readFile("./certs/frank4dd-rsa.der")
  const triplet = DER.fromBuffer(buffer)
  const cert = Certificate.fromASN1(triplet)

  checkCertificate(buffer, cert)
})

test("Cert frank4dd-dsa", async () => {
  const buffer = await readFile("./certs/frank4dd-dsa.der")
  const triplet = DER.fromBuffer(buffer)
  const cert = Certificate.fromASN1(triplet)

  checkCertificate(buffer, cert)
})

test("Cert Tor", async () => {
  const text = await readFile("./certs/tor.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.fromBuffer(buffer)
  const cert = Certificate.fromASN1(triplet)

  console.log(cert)

  checkCertificate(buffer, cert)
})

test("Cert Tor 2", async () => {
  const text = await readFile("./certs/tor2.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.fromBuffer(buffer)
  const cert = Certificate.fromASN1(triplet)

  console.log(cert)

  checkCertificate(buffer, cert)
})

test("Cert full", async () => {
  const text = await readFile("./certs/full.pem", "utf8")
  const buffer = PEM.parse(text)
  const triplet = DER.fromBuffer(buffer)
  const cert = Certificate.fromASN1(triplet)

  console.log(cert.toASN1().toString())

  checkCertificate(buffer, cert)
})