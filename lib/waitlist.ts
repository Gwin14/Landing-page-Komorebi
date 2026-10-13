// Imported only by the server route. Never expose notion_api_token to the client.
export const WAITLIST_DATABASE_ID = "3f738f6e-9296-8094-aa28-d717fd5a10f5";
export const NOTION_VERSION = "2025-09-03";

export class WaitlistServiceError extends Error {
  constructor(public readonly status: number, public readonly code: string) {
    super("Waitlist service unavailable");
  }
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254) return null;
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  if (!local || local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return null;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return null;
  const labels = domain.split(".");
  if (labels.length < 2 || labels.some((label) => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return null;
  return email;
}

type NotionProperty = { id: string; type: string };
type WaitlistOptions = { token: string; databaseId?: string; fetcher?: typeof fetch };

export async function registerWaitlistEmail(email: string, options: WaitlistOptions) {
  const { token, databaseId = WAITLIST_DATABASE_ID, fetcher = fetch } = options;
  const signal = AbortSignal.timeout(20_000);
  async function notionRequest(path: string, method = "GET", body?: unknown) {
    const response = await fetcher(`https://api.notion.com/v1${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      cache: "no-store",
      signal,
    });
    if (!response.ok) {
      // Never include Notion's message, request payload or email in logs/errors.
      throw new WaitlistServiceError(response.status, "notion_request_failed");
    }
    return response.json();
  }

  const database = await notionRequest(`/databases/${databaseId}`);
  // This database has one waitlist table. Do not silently choose another table.
  if (!Array.isArray(database.data_sources) || database.data_sources.length !== 1) {
    throw new WaitlistServiceError(503, "notion_data_source_ambiguous");
  }
  const dataSourceId = database.data_sources[0].id as string;
  const dataSource = await notionRequest(`/data_sources/${dataSourceId}`);
  const title = Object.values(dataSource.properties ?? {}).find(
    (property) => (property as NotionProperty).type === "title",
  ) as NotionProperty | undefined;
  if (!title?.id) throw new WaitlistServiceError(503, "notion_title_missing");

  const existing = await notionRequest(`/data_sources/${dataSourceId}/query`, "POST", {
    filter: { property: title.id, title: { equals: email } },
    page_size: 1,
  });
  if (existing.results?.length) {
    return { pageId: existing.results[0].id as string, created: false };
  }

  const page = await notionRequest("/pages", "POST", {
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      [title.id]: { title: [{ type: "text", text: { content: email } }] },
    },
  });
  if (typeof page.id !== "string") throw new WaitlistServiceError(502, "notion_page_missing");
  return { pageId: page.id, created: true };
}
