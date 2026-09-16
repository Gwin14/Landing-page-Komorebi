const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_URL = new URL(configuredUrl);

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
