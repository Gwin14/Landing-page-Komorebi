import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const moduleUrl = (source) => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText).toString("base64")}`;
const helperUrl = moduleUrl(await readFile(new URL("../lib/waitlist.ts", import.meta.url), "utf8"));
const { normalizeEmail, registerWaitlistEmail, WaitlistServiceError } = await import(helperUrl);
const routeSource = (await readFile(new URL("../app/api/lista-espera/route.ts", import.meta.url), "utf8")).replace('"@/lib/waitlist"', JSON.stringify(helperUrl));
const { POST } = await import(moduleUrl(routeSource));

const reply = (body, status = 200) => Response.json(body, { status });
const database = { data_sources: [{ id: "source-1" }] };
const schema = { properties: { "Endereço cadastrado": { id: "title-id", type: "title" } } };
function mockNotion(responses) {
  const calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url, ...options, payload: options.body ? JSON.parse(options.body) : undefined });
    assert.ok(responses.length, "unexpected Notion request");
    return responses.shift();
  };
  return { calls, fetcher };
}
function request(body, headers = {}, url = "https://komorebi.test/api/lista-espera") {
  return new Request(url, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
}

test("normaliza e-mails e recusa entradas inválidas", () => {
  assert.equal(normalizeEmail("  Fabio+iphone@Example.COM  "), "fabio+iphone@example.com");
  for (const value of [null, {}, "", "a@", "@example.com", "a@b", "a..b@example.com", "a@-example.com", "a\n@example.com", "a@b@example.com", `${"a".repeat(65)}@example.com`]) assert.equal(normalizeEmail(value), null, String(value));
});

test("cria página com apenas o e-mail como título na fonte correta", async () => {
  const mock = mockNotion([reply(database), reply(schema), reply({ results: [] }), reply({ id: "page-1" })]);
  const result = await registerWaitlistEmail("fabio@example.com", { token: "server-secret", fetcher: mock.fetcher });
  assert.deepEqual(result, { pageId: "page-1", created: true });
  assert.match(mock.calls[0].url, /databases\/3f738f6e-9296-8094-aa28-d717fd5a10f5$/);
  assert.equal(mock.calls[0].headers.Authorization, "Bearer server-secret");
  assert.equal(mock.calls[0].headers["Notion-Version"], "2025-09-03");
  assert.deepEqual(mock.calls[2].payload.filter, { property: "title-id", title: { equals: "fabio@example.com" } });
  assert.deepEqual(mock.calls[3].payload, { parent: { type: "data_source_id", data_source_id: "source-1" }, properties: { "title-id": { title: [{ type: "text", text: { content: "fabio@example.com" } }] } } });
});

test("cadastro já existente não cria outra página", async () => {
  const mock = mockNotion([reply(database), reply(schema), reply({ results: [{ id: "existing-page" }] })]);
  assert.deepEqual(await registerWaitlistEmail("fabio@example.com", { token: "secret", fetcher: mock.fetcher }), { pageId: "existing-page", created: false });
  assert.equal(mock.calls.length, 3);
});

test("não escolhe silenciosamente outra tabela da database", async () => {
  const mock = mockNotion([reply({ data_sources: [{ id: "a" }, { id: "b" }] })]);
  await assert.rejects(registerWaitlistEmail("fabio@example.com", { token: "secret", fetcher: mock.fetcher }), (error) => error instanceof WaitlistServiceError && error.code === "notion_data_source_ambiguous");
  assert.equal(mock.calls.length, 1);
});

test("origem externa, corpo excessivo e e-mail inválido não chegam ao Notion", async (t) => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("Notion must not be called"); };
  t.after(() => { globalThis.fetch = originalFetch; });
  assert.equal((await POST(request({ email: "a@example.com" }, { Origin: "https://other.test" }))).status, 403);
  assert.equal((await POST(request({ email: "a@example.com", padding: "a".repeat(2100) }))).status, 413);
  for (const body of [{ email: "invalid" }, [], null, "{broken"]) assert.equal((await POST(request(body))).status, 400);
  assert.equal((await POST(request({ email: "a@example.com" }, { "Content-Type": "text/plain" }))).status, 415);
});

test("campo anti-spam preenchido é ignorado sem criar cadastro", async () => {
  const response = await POST(request({ email: "bot@example.com", website: "spam" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
});

test("origem do navegador funciona atrás de proxy sem aceitar sites externos", async () => {
  const body = { email: "bot@example.com", website: "spam" };
  const internalUrl = "http://localhost:3000/api/lista-espera";
  const response = await POST(request(body, { Origin: "https://komorebi.test", "Sec-Fetch-Site": "same-origin" }, internalUrl));
  assert.equal(response.status, 200);
  for (const site of ["cross-site", "same-site", "none"]) {
    assert.equal((await POST(request(body, { Origin: "https://other.test", "Sec-Fetch-Site": site }, internalUrl))).status, 403);
  }
  assert.equal((await POST(request(body, { Origin: "https://other.test" }, internalUrl))).status, 403);
});

test("API usa token do servidor e retorna somente confirmação", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.notion_api_token;
  t.after(() => { globalThis.fetch = originalFetch; if (originalToken === undefined) delete process.env.notion_api_token; else process.env.notion_api_token = originalToken; });
  process.env.notion_api_token = "private-server-token";
  const mock = mockNotion([reply(database), reply(schema), reply({ results: [] }), reply({ id: "private-page-id" })]);
  globalThis.fetch = mock.fetcher;
  const response = await POST(request({ email: " Fabio@Example.com " }, { Origin: "https://komorebi.test" }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(mock.calls[3].payload.properties["title-id"].title[0].text.content, "fabio@example.com");
  assert.equal(mock.calls[0].headers.Authorization, "Bearer private-server-token");
});

test("falha e limite do Notion não viram sucesso nem expõem resposta interna", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.notion_api_token;
  const originalLog = console.error;
  console.error = () => {};
  process.env.notion_api_token = "private-token";
  t.after(() => { globalThis.fetch = originalFetch; console.error = originalLog; if (originalToken === undefined) delete process.env.notion_api_token; else process.env.notion_api_token = originalToken; });
  for (const status of [401, 403, 404, 429, 500]) {
    globalThis.fetch = async () => reply({ message: "private-token private-email@example.com" }, status);
    const response = await POST(request({ email: "a@example.com" }));
    assert.equal(response.status, status === 429 ? 429 : 503);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.doesNotMatch(JSON.stringify(body), /private-token|private-email/);
  }
  delete process.env.notion_api_token;
  assert.equal((await POST(request({ email: "a@example.com" }))).status, 503);
});
