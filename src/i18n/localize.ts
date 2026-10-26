import type { Locale } from "./config";

export type ProductTranslations = Partial<
  Record<Locale, { title?: string; description?: string }>
>;

// Falls back to the default text when a language hasn't been filled in.
export function localizeProduct<
  T extends { title: string; description: string; translations?: ProductTranslations }
>(product: T, locale: Locale): { title: string; description: string } {
  const tr = product.translations?.[locale];
  return {
    title: tr?.title?.trim() || product.title,
    description: tr?.description?.trim() || product.description,
  };
}
