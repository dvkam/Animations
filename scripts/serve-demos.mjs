import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
const root = resolve("dist");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
};
createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    // Serve the same artifact under a project prefix to test Pages URL resolution.
    const pathname = decodeURIComponent(url.pathname).replace(/^\/Animations(?=\/|$)/, "");
    let path = resolve(root, `.${pathname || "/"}`);
    if (path !== root && !path.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(path)).isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        response.writeHead(308, { Location: `${url.pathname}/${url.search}` }).end();
        return;
      }
      path = resolve(path, "index.html");
    }
    response.setHeader("Content-Type", types[extname(path)] ?? "application/octet-stream");
    response.end(await readFile(path));
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(4173, "127.0.0.1", () => console.log("Playground: http://127.0.0.1:4173"));
