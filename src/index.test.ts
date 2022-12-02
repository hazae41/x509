export * from "./libs/binary/binary.test.js";
export * from "./libs/bitset/bitset.test.js";

import { readFile } from "fs/promises";
import { PEM } from "index.js";
import { relative, resolve } from "node:path";
import { test } from 'uvu';

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname))
})

test("The test", async () => {
  const text = await readFile("./test/cert.pem", "utf8")
  const pem = PEM.from(text)
})

test.run()