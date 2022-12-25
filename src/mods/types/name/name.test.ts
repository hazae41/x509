import { assert, test } from "@hazae41/phobos";
import { relative, resolve } from "path";
import { Name } from "./name.js";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".cjs", ".ts")))

function checkFromTo(string: string) {
  assert(string === Name.fromString(string).toString())
}

test("Name", async () => {
  checkFromTo("O=Acme\\20Inc.,L=Paris,ST=Île-de-France,C=FR,CN=www.dfjini.com,CN=www.odncfbse.com")
})