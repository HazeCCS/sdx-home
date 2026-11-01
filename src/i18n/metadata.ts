import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { routes, type RouteKey } from "@/i18n/routing";
import { snusdexAppStoreId } from "@/lib/site";

const ogImages: Partial<Record<RouteKey, string>> = {
  snusdex: "/og/snusdex.png",
};

const defaultOgImage = "/og/default.png";

export function createPageMetadata(locale: Locale, key: RouteKey): Metadata {
  const dict = getDictionary(locale);
  const path = routes[key];
  const page = dict.meta[key];
  const image = ogImages[key] ?? defaultOgImage;

  const languages: Record<string, string> = {
    ...Object.fromEntries(locales.map((code) => [code, `/${code}${path}`])),
    "x-default": `/de${path}`,
  };

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      siteName: "SDX Solutions",
      locale: dict.meta.ogLocale,
      alternateLocale: locales
        .filter((code) => code !== locale)
        .map((code) => getDictionary(code).meta.ogLocale),
      url: `/${locale}${path}`,
      images: [{ url: image, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
    ...(key === "snusdex" ? { itunes: { appId: snusdexAppStoreId } } : {}),
  };
}
