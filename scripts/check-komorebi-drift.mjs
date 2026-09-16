import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const appRepository = path.resolve(
  process.env.KOMOREBI_REPOSITORY || "../Komorebi",
);
const matrix = readFileSync(
  new URL("../lib/feature-matrix.ts", import.meta.url),
  "utf8",
);
const documented = matrix.match(/APP_VERIFIED_COMMIT = "([a-f0-9]{40})"/)?.[1];
if (!documented) throw new Error("Commit verificado não encontrado na matriz.");

let current;
try {
  current = execFileSync("git", ["-C", appRepository, "rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim();
} catch {
  throw new Error(
    `Não foi possível ler o repositório Komorebi em ${appRepository}. Use KOMOREBI_REPOSITORY para informar o caminho.`,
  );
}

if (current !== documented) {
  console.error(
    `Documentação revisada em ${documented.slice(0, 7)}, mas o app está em ${current.slice(0, 7)}.`,
  );
  process.exitCode = 1;
} else {
  console.log(`Documentação alinhada ao Komorebi ${current.slice(0, 7)}.`);
}
