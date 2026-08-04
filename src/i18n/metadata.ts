import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type PageMetaKey = "home" | "about" | "snusdex" | "contact" | "imprint" | "privacy";

const pathForKey: Record<PageMetaKey, string> = {
  home: "",
  about: "/ueber-uns",
  snusdex: "/snusdex",
  contact: "/kontakt",
  imprint: "/impressum",
  privacy: "/datenschutz",
};

export function createPageMetadata(locale: Locale, key: PageMetaKey): Metadata {
  const dict = getDictionary(locale);
  const path = pathForKey[key];
  const page = dict.meta[key];

  const languages: Record<string, string> = {
    de: `/de${path}`,
    en: `/en${path}`,
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
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website",
      locale: dict.meta.ogLocale,
      url: `/${locale}${path}`,
    },
  };
}
