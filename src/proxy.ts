import { NextRequest, NextResponse } from "next/server";
import { fallbackLocale, isLocale, localeCookie, type Locale } from "@/i18n/config";
import { pathHasLocale } from "@/i18n/routing";

function detectFromAcceptLanguage(header: string | null): Locale {
  if (!header) return fallbackLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), quality: q ? Number.parseFloat(q) : 1 };
    })
    .sort((a, b) => b.quality - a.quality);

  const top = preferred[0]?.tag ?? "";
  return top.startsWith("de") ? "de" : fallbackLocale;
}

function resolveLocale(request: NextRequest): Locale {
  const cookieValue = request.cookies.get(localeCookie)?.value;
  if (isLocale(cookieValue)) return cookieValue;
  return detectFromAcceptLanguage(request.headers.get("accept-language"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathHasLocale(pathname)) {
    return NextResponse.next();
  }

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
