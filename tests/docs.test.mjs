import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navigation = await readFile(
  new URL("../lib/docs-navigation.ts", import.meta.url),
  "utf8",
);
const pages = await readFile(
  new URL("../content/docs-pages.ts", import.meta.url),
  "utf8",
);
const matrix = await readFile(
  new URL("../lib/feature-matrix.ts", import.meta.url),
  "utf8",
);

function values(source, field) {
  return [
    ...source.matchAll(new RegExp(`\\b${field}: \\\"([^\\\"]+)\\\"`, "g")),
  ].map((match) => match[1]);
}

test("cada rota de navegação possui uma página de conteúdo", () => {
  const navSlugs = values(navigation, "slug");
  const pageSlugs = values(pages, "slug");
  assert.deepEqual(new Set(pageSlugs), new Set(navSlugs));
  assert.equal(navSlugs.length, new Set(navSlugs).size);
});

test("a matriz usa identificadores únicos e registra fontes", () => {
  const ids = values(matrix, "id");
  assert.ok(ids.length >= 10);
  assert.equal(ids.length, new Set(ids).size);
  assert.match(matrix, /sources: \[[^\]]+\]/);
  assert.match(matrix, /verifiedCommit: APP_VERIFIED_COMMIT/);
});

test("as páginas legais públicas estão presentes", async () => {
  const privacy = await readFile(
    new URL("../app/politica-de-privacidade/page.tsx", import.meta.url),
    "utf8",
  );
  const terms = await readFile(
    new URL("../app/termos-de-uso/page.tsx", import.meta.url),
    "utf8",
  );
  assert.match(privacy, /privacySections/);
  assert.match(terms, /termsSections/);
});

// Execute the content exports to validate nested sections and contextual links.
const ts = await import("typescript");
async function contentModule(source) {
  const output = ts.default.transpileModule(source, {
    compilerOptions: { module: ts.default.ModuleKind.ESNext },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
}
const { docsPages } = await contentModule(pages);
const { docsNavigation } = await contentModule(navigation);

test("as páginas têm âncoras únicas e links contextuais válidos", () => {
  for (const page of docsPages) {
    const ids = page.sections.map((section) => section.id);
    assert.equal(ids.length, new Set(ids).size, page.slug);
    assert.ok(!ids.includes("fontes") && !ids.includes("pre-requisitos"), page.slug);
    assert.ok(page.sources?.length, `${page.slug}: faltam fontes`);
    for (const section of page.sections) {
      for (const link of section.links ?? []) {
        const [route, anchor] = link.href.split("#");
        const target = docsPages.find((item) => `/docs/${item.slug}` === route);
        assert.ok(target, `${page.slug}: ${link.href}`);
        if (anchor) assert.ok(target.sections.some((item) => item.id === anchor));
      }
    }
  }
  assert.deepEqual(new Set(docsPages.map((page) => page.slug)), new Set(docsNavigation.map((item) => item.slug)));
});
