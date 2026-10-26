export const LOCALES = ["it", "en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "it";
export const LOCALE_COOKIE = "locale";

export const LOCALE_META: Record<Locale, { label: string; short: string; dir: "ltr" | "rtl" }> = {
  it: { label: "Italiano", short: "IT", dir: "ltr" },
  en: { label: "English", short: "EN", dir: "ltr" },
  ar: { label: "العربية", short: "AR", dir: "rtl" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
