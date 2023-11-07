export * from "./pem/pem.test.js";
export * from "./types/index.test.js";

import { Bytes } from "@hazae41/bytes";
import { assert, test } from "@hazae41/phobos";
import { Result } from "@hazae41/result";
import { readFile } from "fs/promises";
import { PEM } from "mods/pem/pem.js";
import { Certificate } from "mods/types/certificate/certificate.js";
import { relative, resolve } from "path";
import { readAndResolveFromBytesOrThrow, writeToBytesOrThrow } from "./types/index.js";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".mjs", ".ts")))

Result.debug = true

await test("Cert Ed25519", async () => {
  const bytes = PEM.tryDecode(await readFile("./certs/ed25519.pem", "utf8")).unwrap()
  const cert = readAndResolveFromBytesOrThrow(Certificate, bytes)

  assert(Bytes.equals(bytes, writeToBytesOrThrow(cert)))
})

await test("Cert Let's Encrypt", async () => {
  const bytes = PEM.tryDecode(await readFile("./certs/letsencrypt.pem", "utf8")).unwrap()
  const cert = readAndResolveFromBytesOrThrow(Certificate, bytes)

  assert(Bytes.equals(bytes, writeToBytesOrThrow(cert)))
})

await test("Cert frank4dd-rsa", async () => {
  const bytes = await readFile("./certs/frank4dd-rsa.der")
  const cert = readAndResolveFromBytesOrThrow(Certificate, bytes)

  assert(Bytes.equals(bytes, writeToBytesOrThrow(cert)))
})

await test("Cert frank4dd-dsa", async () => {
  const bytes = await readFile("./certs/frank4dd-dsa.der")
  const cert = readAndResolveFromBytesOrThrow(Certificate, bytes)

  assert(Bytes.equals(bytes, writeToBytesOrThrow(cert)))
})

await test("Cert Tor", async () => {
  const bytes = PEM.tryDecode(await readFile("./certs/tor.pem", "utf8")).unwrap()
  const cert = readAndResolveFromBytesOrThrow(Certificate, bytes)

  assert(Bytes.equals(bytes, writeToBytesOrThrow(cert)))
})

test("Cert Tor 2", async () => {
  const bytes = PEM.tryDecode(await readFile("./certs/tor2.pem", "utf8")).unwrap()
  const cert = readAndResolveFromBytesOrThrow(Certificate, bytes)

  assert(Bytes.equals(bytes, writeToBytesOrThrow(cert)))
})

test("Cert full", async () => {
  const bytes = PEM.tryDecode(await readFile("./certs/full.pem", "utf8")).unwrap()
  const cert = readAndResolveFromBytesOrThrow(Certificate, bytes)
  assert(Bytes.equals(bytes, writeToBytesOrThrow(cert)))
})