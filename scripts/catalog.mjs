import { readdir, readFile, writeFile } from "node:fs/promises";
const demos = [];
for (const entry of (await readdir("apps", { withFileTypes: true })).sort((a, b) =>
  a.name.localeCompare(b.name),
)) {
  if (!entry.isDirectory() || entry.name === "playground") continue;
  const text = await readFile(`apps/${entry.name}/README.md`, "utf8");
  const section = (heading) => {
    const value = text.split(`## ${heading}\n`)[1]?.split("\n## ")[0]?.trim();
    if (!value) throw new Error(`${entry.name}: missing ${heading}`);
    return value;
  };
  const [title, description] = text.split("\n\n");
  if (!title?.startsWith("# ") || !description)
    throw new Error(`${entry.name}: missing title or description`);
  demos.push({
    slug: entry.name,
    title: title.slice(2),
    description,
    how: section("How it works"),
    interaction: section("Interaction"),
    accessibility: section("Accessibility"),
  });
}
const output = JSON.stringify(demos, null, 2) + "\n";
const target = "apps/playground/src/demos.json";
if (process.argv.includes("--check")) {
  if ((await readFile(target, "utf8")) !== output)
    throw new Error("Demo catalog is stale. Run pnpm catalog.");
} else await writeFile(target, output);
