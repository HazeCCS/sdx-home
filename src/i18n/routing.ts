import { isLocale, locales, type Locale } from "@/i18n/config";

export const routes = {
  home: "",
  about: "/ueber-uns",
  snusdex: "/snusdex",
  contact: "/kontakt",
  imprint: "/impressum",
  privacy: "/datenschutz",
  snusdexPrivacy: "/datenschutz/snusdex",
} as const;

export type RouteKey = keyof typeof routes;

export function localizedPath(locale: Locale, path: string = ""): string {
  const suffix = path === "/" ? "" : path;
  return `/${locale}${suffix}`;
}

export function href(locale: Locale, route: RouteKey, hash?: string): string {
  const base = localizedPath(locale, routes[route]);
  return hash ? `${base}#${hash}` : base;
}

export function swapLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }
  return `/${target}${pathname}`;
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    segments.splice(1, 1);
    const rest = segments.join("/");
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

export function pathHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}
