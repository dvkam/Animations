import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import demos from "../apps/playground/src/demos.json" with { type: "json" };
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("apps/playground/dist", "dist", { recursive: true });
for (const demo of demos)
  await cp(`apps/${demo.slug}/dist`, `dist/${demo.slug}`, { recursive: true });
await writeFile("dist/.nojekyll", "");
console.log(`Built playground and ${demos.length} demos in dist/`);
