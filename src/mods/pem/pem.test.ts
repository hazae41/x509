import { assert, test } from "@hazae41/phobos";
import { PEM } from "mods/pem/pem.js";
import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".mjs", ".ts")))

function ignoreLastNewline(text: string) {
  if (text.endsWith("\n"))
    return text.slice(0, -1)
  return text
}

test("Parse and stringify", async () => {
  const text = await readFile("./certs/ed25519.pem", "utf8")
  const buffer = PEM.parse(text)
  const text2 = PEM.stringify(buffer)

  assert(ignoreLastNewline(text) === ignoreLastNewline(text2))
})