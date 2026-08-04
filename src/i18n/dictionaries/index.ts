import type { Locale } from "@/i18n/config";
import { de, type Dictionary } from "./de";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { de, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
