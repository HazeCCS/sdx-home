export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const fallbackLocale: Locale = "en";

export const localeCookie = "NEXT_LOCALE";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "de" || value === "en";
}
