import { PEM } from "mods/pem/pem.js";
import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { test } from "uvu";
import assert from "uvu/assert";

test.before(async () => {
  const directory = resolve("./dist/test/")
  const { pathname } = new URL(import.meta.url)
  console.log(relative(directory, pathname))
})

function ignoreLastNewline(text: string) {
  if (text.endsWith("\n"))
    return text.slice(0, -1)
  else
    return text
}

test("Parse and stringify", async () => {
  const text = await readFile("./test/cert.pem", "utf8")
  const buffer = PEM.parse(text)
  const text2 = PEM.stringify(buffer)

  assert.is(ignoreLastNewline(text), ignoreLastNewline(text2))
})

test.run()