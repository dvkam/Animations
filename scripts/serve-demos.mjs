import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const apps = resolve("apps");
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};
createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  if (url.pathname === "/") {
    response.end("Animation production preview");
    return;
  }
  const [slug, ...parts] = decodeURIComponent(url.pathname).split("/").filter(Boolean);
  if (!slug) {
    response.writeHead(404).end();
    return;
  }
  const base = resolve(apps, slug, "dist");
  const path = resolve(base, parts.join("/") || "index.html");
  if (!base.startsWith(apps + sep) || !path.startsWith(base + sep)) {
    response.writeHead(403).end();
    return;
  }
  try {
    response.setHeader("Content-Type", mime[extname(path)] ?? "application/octet-stream");
    response.end(await readFile(path));
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(4173, "127.0.0.1");
