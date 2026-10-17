import { readdir, readFile } from "node:fs/promises";
import { resolve, relative } from "node:path";

async function check(directory, owner) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (["node_modules", "dist"].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await check(path, owner);
      continue;
    }
    if (!/\.(tsx?|jsx?|css)$/.test(entry.name)) continue;
    const source = await readFile(path, "utf8");
    for (const match of source.matchAll(/(?:from\s*|import\s*|import\s*\()(["'])([^"']+)\1/g)) {
      const specifier = match[2];
      if (
        specifier.startsWith("@animations/") &&
        specifier !== "@animations/demo-runtime" &&
        !specifier.startsWith("@animations/demo-runtime/")
      )
        throw new Error(`${path}: app-to-app import ${specifier}`);
      if (specifier.startsWith(".")) {
        const target = resolve(directory, specifier);
        const within = relative(owner, target);
        if (within.startsWith(".."))
          throw new Error(`${path}: relative import leaves its module: ${specifier}`);
      }
    }
  }
}
for (const group of ["apps", "packages"]) {
  for (const entry of await readdir(group, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const owner = resolve(group, entry.name, "src");
      await check(owner, owner);
    }
  }
}
