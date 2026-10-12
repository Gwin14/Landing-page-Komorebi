// Explicit live check: use only with a server-side Notion test credential.
// Creates one synthetic page, verifies the real route, then archives that page.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import ts from "typescript";

const token = process.env.notion_api_token;
if (!token) throw new Error("notion_api_token is required for the live check");
const toUrl = (source) => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText).toString("base64")}`;
const helperUrl = toUrl(await readFile(new URL("../lib/waitlist.ts", import.meta.url), "utf8"));
const { WAITLIST_DATABASE_ID, NOTION_VERSION } = await import(helperUrl);
const routeSource = (await readFile(new URL("../app/api/lista-espera/route.ts", import.meta.url), "utf8")).replace('"@/lib/waitlist"', JSON.stringify(helperUrl));
const { POST } = await import(toUrl(routeSource));
const email = `komorebi-verification-${randomUUID()}@example.com`;
const headers = { Authorization: `Bearer ${token}`, "Notion-Version": NOTION_VERSION, "Content-Type": "application/json" };
async function notion(path, method = "GET", body) {
  const response = await fetch(`https://api.notion.com/v1${path}`, { method, headers, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`Notion verification failed: HTTP ${response.status} at ${path.split("/")[1]}`);
  return response.json();
}
const database = await notion(`/databases/${WAITLIST_DATABASE_ID}`);
assert.equal(database.data_sources?.length, 1, "Expected one waitlist data source");
const sourceId = database.data_sources[0].id;
const source = await notion(`/data_sources/${sourceId}`);
const title = Object.values(source.properties ?? {}).find((property) => property.type === "title");
assert.ok(title?.id, "Title property missing");
const query = () => notion(`/data_sources/${sourceId}/query`, "POST", { filter: { property: title.id, title: { equals: email } } });
const request = () => new Request("https://komorebi-verification.example/api/lista-espera", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://komorebi-verification.example" }, body: JSON.stringify({ email, website: "" }) });
try {
  const response = await POST(request());
  assert.equal(response.status, 200, "Real registration route failed");
  assert.deepEqual(await response.json(), { ok: true });
  const result = await query();
  assert.equal(result.results.length, 1, "Expected exactly one created page");
  const saved = result.results[0];
  assert.equal(saved.parent.data_source_id, sourceId);
  const savedTitle = Object.values(saved.properties).find((property) => property.type === "title");
  assert.equal(savedTitle.title.map((part) => part.plain_text).join(""), email);
  const repeated = await POST(request());
  assert.equal(repeated.status, 200);
  assert.equal((await query()).results.length, 1, "Repeated submission created a duplicate");
  console.log("Notion live check passed: route → page title → repeated submission.");
} finally {
  const pages = await query();
  for (const page of pages.results) await notion(`/pages/${page.id}`, "PATCH", { archived: true });
  console.log("Synthetic verification pages archived.");
}
