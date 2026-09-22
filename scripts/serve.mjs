import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};
http
  .createServer(async (req, res) => {
    try {
      if (!["GET", "HEAD"].includes(req.method)) {
        res.writeHead(405);
        res.end();
        return;
      }
      const url = new URL(req.url, "http://localhost");
      const path = decodeURIComponent(url.pathname);
      let file = resolve(root, "." + path);
      if (
        file !== resolve(root) &&
        !file.startsWith(root.endsWith(sep) ? root : root + sep)
      ) {
        res.writeHead(403);
        res.end();
        return;
      }
      const info = await stat(file);
      if (info.isDirectory()) {
        if (!url.pathname.endsWith("/")) {
          res.writeHead(301, { Location: url.pathname + "/" + url.search });
          res.end();
          return;
        }
        file = resolve(file, "index.html");
      }
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type": mime[extname(file)] || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      });
      res.end(req.method === "HEAD" ? undefined : body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      const body = await readFile(resolve(root, "404.html")).catch(
        () => "Página não encontrada",
      );
      res.end(req.method === "HEAD" ? undefined : body);
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`ELO.UFRB: http://localhost:${port}`),
  );
