import { assert, test } from "@hazae41/phobos";
import { Result } from "@hazae41/result";
import { relative, resolve } from "path";
import { Validity } from "./validity.js";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".mjs", ".ts")))

Result.debug = true

test("Validity generation", async () => {
  const inOneDay = Validity.generate(1)

  assert(inOneDay.notAfter.value.getUTCDate() === inOneDay.notBefore.value.getUTCDate() + 1)

  const inOneYear = Validity.generate(365)

  assert(inOneYear.notAfter.value.getUTCFullYear() === inOneYear.notBefore.value.getUTCFullYear() + 1)
})