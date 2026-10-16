import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const moduleUrl = (source) => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText).toString("base64")}`;
const routingUrl = moduleUrl(await read("lib/i18n/routing.ts"));
const { detectLocale, localizedPath, isLocale, locales, languageTag } = await import(routingUrl);
const english = JSON.parse(await read("content/i18n/en.json"));
const catalogs = Object.fromEntries(await Promise.all(locales.filter((locale) => locale !== "pt").map(async (locale) => [locale, JSON.parse(await read(`content/i18n/${locale}.json`))])));
const uiKeys = JSON.parse(await read("content/i18n/ui-keys.json"));
const translateSource = (await read("lib/i18n/translate.ts"))
  .replace(/import (\w+) from "@\/content\/i18n\/(en|ja|de|es|fr)\.json";/g, (_, name, locale) => `const ${name} = ${JSON.stringify(catalogs[locale])};`)
  .replace('import uiKeys from "@/content/i18n/ui-keys.json";', `const uiKeys = ${JSON.stringify(uiKeys)};`);
const translateUrl = moduleUrl(translateSource);
const { getTranslator, translateContent, getUiMessages } = await import(translateUrl);
const docsUrl = moduleUrl(await read("content/docs-pages.ts"));
const navigationUrl = moduleUrl(await read("lib/docs-navigation.ts"));
const { docsPages, getDocsPage } = await import(docsUrl);
const { docsNavigation } = await import(navigationUrl);
const { privacySections, termsSections } = await import(moduleUrl(await read("content/legal.ts")));
const { featureMatrix, statusLabels } = await import(moduleUrl(await read("lib/feature-matrix.ts")));
const searchSource = (await read("lib/i18n/search.ts"))
  .replace('"@/content/docs-pages"', JSON.stringify(docsUrl))
  .replace('"@/lib/docs-navigation"', JSON.stringify(navigationUrl))
  .replace('"./translate"', JSON.stringify(translateUrl));
const { getSearchEntries } = await import(moduleUrl(searchSource));
const { normalizeSearchText } = await import(moduleUrl(await read("lib/i18n/search-text.ts")));

// Load the actual proxy implementation with a minimal NextResponse adapter.
const proxySource = (await read("proxy.ts"))
  .replace('import { NextResponse, type NextRequest } from "next/server";', 'type NextRequest = any; const NextResponse = { next: () => new Response(null, {status: 200}), redirect: (url: URL) => new Response(null, {status: 307, headers: {location: url.toString()}}) };')
  .replace('"@/lib/i18n/routing"', JSON.stringify(routingUrl));
const { proxy } = await import(moduleUrl(proxySource));

test("browser preference supports the six app languages and regional variants", () => {
  for (const header of ["pt", "pt-BR,pt;q=0.9,en;q=0.8", "PT-pt", "en;q=0.5,pt;q=0.9"]) assert.equal(detectLocale(header), "pt", header);
  for (const header of [null, "", "en-US,en;q=0.9", "it-IT,fr;q=0.9", "*", "pt;q=0", "pt;q=invalid", "en;q=1,pt;q=0.5"]) assert.equal(detectLocale(header), "en", header);
  for (const [header, expected] of [["fr-CA,en;q=0.8", "fr"], ["de-AT", "de"], ["es-MX", "es"], ["ja-JP", "ja"], ["en;q=0.2,de;q=0.9", "de"]]) assert.equal(detectLocale(header), expected);
  assert.equal(isLocale("it"), false);
});

test("redirect uses saved choice first, retains query strings and respects explicit URLs", () => {
  function request(path, browser, cookie) {
    const url = new URL(path, "https://komorebi.test");
    return { nextUrl: Object.assign(url, { clone: () => new URL(url) }), headers: new Headers(browser ? { "accept-language": browser } : {}), cookies: { get: () => cookie ? { value: cookie } : undefined } };
  }
  assert.equal(proxy(request("/docs/camera?view=all", "pt-BR")).headers.get("location"), "https://komorebi.test/pt/docs/camera?view=all");
  assert.equal(proxy(request("/", "pt-BR", "en")).headers.get("location"), "https://komorebi.test/en");
  assert.equal(proxy(request("/", "en-US", "pt")).headers.get("location"), "https://komorebi.test/pt");
  assert.equal(proxy(request("/", "pt-PT", "invalid")).headers.get("location"), "https://komorebi.test/pt");
  assert.equal(proxy(request("/en/docs", "pt-BR", "pt")).status, 200);
  for (const locale of locales) {
    assert.equal(proxy(request(`/${locale}/docs`, "en")).status, 200);
    assert.equal(proxy(request("/", "en", locale)).headers.get("location"), `https://komorebi.test/${locale}`);
  }
  assert.equal(proxy(request("/", "fr")).headers.get("cache-control"), "private, no-store");
  assert.equal(proxy(request("/", "fr")).headers.get("vary"), "Accept-Language, Cookie");
});

test("localized paths retain anchors and queries without prefixing assets or APIs", () => {
  assert.equal(localizedPath("/", "en"), "/en");
  assert.equal(localizedPath("/pt/docs/camera?mode=raw#lentes-zoom-foco", "en"), "/en/docs/camera?mode=raw#lentes-zoom-foco");
  assert.equal(localizedPath("/politica-de-privacidade#lista-de-espera", "pt"), "/pt/politica-de-privacidade#lista-de-espera");
  for (const path of ["#cores", "/api/lista-espera", "/images/forest.jpg", "/luts/guarana.cube", "/models/iphone.glb", "https://example.com", "//example.com"]) assert.equal(localizedPath(path, "en"), path);
  for (const from of locales) for (const to of locales) assert.equal(localizedPath(`/${from}/docs/camera?mode=raw#lentes-zoom-foco`, to), `/${to}/docs/camera?mode=raw#lentes-zoom-foco`);
});

test("English covers all guides, legal pages, navigation and compatibility conditions", () => {
  const unchanged = new Set(["Beta", "EXIF Frame", "TopBar", "HEIF+", "Image Stacking", "Focus Bracketing", "Live Photo", "Camera Control", "Site: fotoessencia.fabiosantos.dev.br", "Instagram: @fotoessencia_"]);
  const technical = new Set(["id", "slug", "src", "href", "status", "ios", "android", "sources", "verifiedCommit", "keywords"]);
  function check(value, key = "") {
    if (technical.has(key)) return;
    if (typeof value === "string") assert.ok(english[value] || unchanged.has(value), `Missing English translation: ${value}`);
    else if (Array.isArray(value)) value.forEach((item) => check(item, key));
    else if (value && typeof value === "object") Object.entries(value).forEach(([key, item]) => check(item, key));
  }
  for (const content of [docsPages, privacySections, termsSections, docsNavigation, featureMatrix, Object.values(statusLabels)]) check(content);
});

test("translation preserves route IDs, anchors and original Portuguese data", () => {
  const t = getTranslator("en");
  const translated = translateContent(docsPages, t);
  assert.equal(translated[0].title, "Getting started");
  assert.equal(docsPages[0].title, "Primeiros passos");
  assert.equal(translated[0].slug, docsPages[0].slug);
  for (let i = 0; i < docsPages.length; i++) assert.deepEqual(translated[i].sections.map((section) => [section.id, section.links?.map((link) => link.href), section.images?.map((image) => image.src)]), docsPages[i].sections.map((section) => [section.id, section.links?.map((link) => link.href), section.images?.map((image) => image.src)]));
  assert.deepEqual(translateContent(docsPages, getTranslator("pt")), docsPages);
});

test("search indexes English guide bodies and section names", () => {
  const entries = getSearchEntries("en");
  assert.ok(entries.some((entry) => entry.title === "Focus and white balance" && entry.searchText.includes("lens position")));
  assert.ok(entries.some((entry) => entry.searchText.includes("depth") && entry.href.startsWith("/docs/")));
  assert.equal(getSearchEntries("pt")[0].title, "Primeiros passos");
});

test("hidden app features stay out of public pages, search and shipped dictionaries", () => {
  const hidden = /scanner|\bscan\b|minicpm|intelig[eê]n|intelligent|capturas? duplas?|double capture|sorriso|smil|\bbulb\b|controles na parte inferior|controls below|posi[çc][aã]o invertida|inverted position/i;
  for (const content of [docsPages, docsNavigation, featureMatrix, privacySections, termsSections, ...Object.values(catalogs), uiKeys, ...locales.map(getSearchEntries)]) {
    assert.doesNotMatch(JSON.stringify(content), hidden);
  }
  assert.equal(getDocsPage("scanner-de-composicao"), undefined);
  assert.ok(!docsNavigation.some((item) => item.slug === "scanner-de-composicao"));
  for (const [locale, keyword, anchor] of [
    ["pt", "megapixels", "megapixels"],
    ["en", "megapixels", "megapixels"],
    ["pt", "rastros de luz", "rastros-de-luz"],
    ["en", "light trails", "rastros-de-luz"],
    ["en", "widgets", "widgets-e-atalhos"],
    ["en", "focus peaking", "focus-peaking"],
  ]) {
    assert.ok(getSearchEntries(locale).some((entry) => entry.href.endsWith(`#${anchor}`) && entry.searchText.toLowerCase().includes(keyword)));
  }
});

test("every non-Portuguese locale has complete editorial coverage and intact placeholders", () => {
  const reference = Object.keys(english);
  for (const [locale, catalog] of Object.entries(catalogs)) {
    for (const key of reference) {
      assert.ok(typeof catalog[key] === "string" && catalog[key].trim(), `${locale}: ${key}`);
      const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
      assert.deepEqual(placeholders(catalog[key]), placeholders(english[key]), `${locale}: ${key}`);
    }
    const messages = getUiMessages(locale);
    for (const key of uiKeys) assert.ok(messages[key], `${locale} UI: ${key}`);
    const translated = translateContent(docsPages, getTranslator(locale));
    assert.deepEqual(translated.map((page) => [page.slug, page.sections.map((section) => [section.id, section.links?.map((link) => link.href), section.images?.map((image) => image.src)])]), docsPages.map((page) => [page.slug, page.sections.map((section) => [section.id, section.links?.map((link) => link.href), section.images?.map((image) => image.src)])]));
  }
});

test("documented controls use the app terminology and mobile navigation has localized titles", async () => {
  const terminology = JSON.parse(await read("content/i18n/terminology.json"));
  for (const [locale, terms] of Object.entries(terminology)) {
    const t = getTranslator(locale);
    for (const [source, expected] of Object.entries(terms)) assert.equal(t(source), expected, `${locale}: ${source}`);
    const messages = getUiMessages(locale);
    for (const item of docsNavigation) assert.equal(messages[item.title], t(item.title), `${locale}: mobile ${item.slug}`);
  }
});

test("search finds native-language text and normalizes accents without changing Japanese voicing", () => {
  for (const [locale, query] of [["ja", "ピント"], ["de", "Verschlusszeit"], ["es", "obturación"], ["fr", "obturation"]]) {
    assert.ok(getSearchEntries(locale).some((entry) => normalizeSearchText(entry.searchText, locale).includes(normalizeSearchText(query, locale))), locale);
  }
  assert.equal(normalizeSearchText("ÉCLAIRAGE", "fr"), "eclairage");
  assert.equal(normalizeSearchText("ＩＳＯ", "ja"), "iso");
  assert.equal(normalizeSearchText("プレビュー", "ja"), "プレビュー");
});

test("metadata declares all six language alternatives and distinct Open Graph locales", async () => {
  const source = (await read("lib/i18n/metadata.ts"))
    .replace('import { notFound } from "next/navigation";', 'const notFound = () => { throw new Error("404"); };')
    .replaceAll('from "./routing"', `from ${JSON.stringify(routingUrl)}`);
  const { pageMetadata } = await import(moduleUrl(source));
  for (const locale of locales) {
    const metadata = pageMetadata(locale, "/docs/camera", "title", "description");
    assert.equal(metadata.alternates.canonical, `/${locale}/docs/camera`);
    for (const language of locales) assert.equal(metadata.alternates.languages[languageTag[language]], `/${language}/docs/camera`);
    assert.equal(metadata.openGraph.alternateLocale.length, 5);
    assert.ok(!metadata.openGraph.alternateLocale.includes(metadata.openGraph.locale));
  }
});

test("client dictionaries cover interface strings and keep guide bodies on the server", async () => {
  const messages = getUiMessages("en");
  assert.equal(messages["Idioma do site"], "Site language");
  assert.equal(messages["Gire para explorar"], "Rotate to explore");
  assert.equal(messages[docsPages[0].sections[0].paragraphs[0]], undefined);
  assert.deepEqual(getUiMessages("pt"), {});
  for (const name of ["Landing", "ColorLab", "PhoneScene", "WaitlistForm", "LanguageSwitcher", "docs/DocsHeader", "docs/DocsSearch", "docs/ThemeToggle"]) {
    const source = ts.createSourceFile(name + ".tsx", await read(`components/${name}.tsx`), ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isCallExpression(node) && node.expression.getText(source) === "t" && ts.isStringLiteral(node.arguments[0])) {
        assert.ok(messages[node.arguments[0].text], `${name}: ${node.arguments[0].text}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
});
