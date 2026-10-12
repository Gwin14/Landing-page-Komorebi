import { normalizeEmail, registerWaitlistEmail, WaitlistServiceError } from "@/lib/waitlist";

export const runtime = "nodejs";
export const maxDuration = 30;

const success = () => Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
const failure = (error: string, status: number) => Response.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return failure("Não foi possível enviar este formulário.", 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return failure("Formato de envio inválido.", 415);
  }

  let body: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return failure("Informe um e-mail válido.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) {
        await reader.cancel();
        return failure("O formulário é muito grande.", 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return failure("Informe um e-mail válido.", 400);
    body = parsed as Record<string, unknown>;
  } catch {
    return failure("Informe um e-mail válido.", 400);
  }

  // Quietly discard submissions that fill the hidden anti-spam field.
  if (body.website) return success();
  const email = normalizeEmail(body.email);
  if (!email) return failure("Informe um e-mail válido.", 400);
  const token = process.env.notion_api_token;
  if (!token) {
    console.error("waitlist: notion_api_token_missing");
    return failure("A lista está temporariamente indisponível. Tente novamente mais tarde.", 503);
  }
  try {
    await registerWaitlistEmail(email, { token });
    // Same response for a new or existing email. No email/page IDs are returned.
    return success();
  } catch (error) {
    const status = error instanceof WaitlistServiceError ? error.status : 503;
    console.error("waitlist:", error instanceof WaitlistServiceError ? error.code : "notion_unavailable", status);
    return failure(
      status === 429 ? "Muitos cadastros neste momento. Aguarde um pouco e tente novamente." : "Não foi possível confirmar seu cadastro. Tente novamente em instantes.",
      status === 429 ? 429 : 503,
    );
  }
}
