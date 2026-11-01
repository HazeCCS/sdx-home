import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { routes } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

const priorities: Record<string, number> = {
  home: 1,
  snusdex: 0.9,
  driveRadar: 0.7,
  about: 0.6,
  contact: 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(routes).flatMap(([key, path]) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: priorities[key] ?? 0.3,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((code) => [code, `${siteUrl}/${code}${path}`])),
          "x-default": `${siteUrl}/de${path}`,
        },
      },
    })),
  );
}
