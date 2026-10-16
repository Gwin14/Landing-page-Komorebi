import { NextResponse, type NextRequest } from "next/server";
import { detectLocale, isLocale, localeCookie } from "@/lib/i18n/routing";

export function proxy(request: NextRequest) {
  if (isLocale(request.nextUrl.pathname.split("/")[1])) return NextResponse.next();
  const saved = request.cookies.get(localeCookie)?.value;
  const locale = isLocale(saved) ? saved : detectLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|images(?:/|$)|models(?:/|$)|luts(?:/|$)|.*\\.[^/]+$).*)", "/manifest.webmanifest"],
};
