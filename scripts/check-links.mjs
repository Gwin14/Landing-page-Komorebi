import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
await access(root).catch(() => { throw new Error("Diretório out ausente. Execute npm run build primeiro."); });

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)));
  return files.flat();
}

const htmlFiles = (await walk(root)).filter((file) => file.endsWith(".html"));
const missing = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const hrefs = [...html.matchAll(/href=["']([^"'#?]+)["']/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next/")) continue;
    const clean = decodeURIComponent(href).replace(/^\//, "").replace(/\/$/, "");
    const candidates = clean ? [path.join(root, clean), path.join(root, `${clean}.html`), path.join(root, clean, "index.html")] : [path.join(root, "index.html")];
    let found = false;
    for (const candidate of candidates) {
      try { await access(candidate); found = true; break; } catch { /* try next static-export shape */ }
    }
    if (!found) missing.push(`${path.relative(root, file)} -> ${href}`);
  }
}

if (missing.length) {
  console.error(missing.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Links internos válidos em ${htmlFiles.length} páginas HTML.`);
}
