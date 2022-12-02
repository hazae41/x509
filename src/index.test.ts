export * from "./libs/binary/binary.test.js";
export * from "./libs/bitmask/bitmask.test.js";

import { readFile } from "fs/promises";
import { PEM } from "index.js";
import { test } from 'uvu';

test("The test", async () => {
  const text = await readFile("./test/cert.pem", "utf8")
  const pem = PEM.from(text)
})

test.run()