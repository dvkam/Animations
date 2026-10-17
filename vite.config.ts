import { execFileSync } from "node:child_process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
export default defineConfig({
  plugins: [react()],
  base: "./",
  define: { "import.meta.env.VITE_SOURCE_COMMIT": JSON.stringify(sourceCommit) },
});
