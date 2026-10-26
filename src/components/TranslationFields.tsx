"use client";

import React, { useState } from "react";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
import type { ProductTranslations } from "@/i18n/localize";
import { useI18n } from "@/i18n/I18nProvider";

// Per-language name and description. Serialised into a hidden field so the
// server action receives it with the rest of the form.
export default function TranslationFields({
  initial = {},
}: {
  initial?: ProductTranslations;
}) {
  const { t } = useI18n();
  const [active, setActive] = useState<Locale>("it");
  const [values, setValues] = useState<ProductTranslations>(initial);

  const update = (field: "title" | "description", value: string) =>
    setValues((prev) => ({
      ...prev,
      [active]: { ...prev[active], [field]: value },
    }));

  return (
    <fieldset className="rounded border border-gray-300 p-3">
      <div role="tablist" className="mb-3 flex gap-1">
        {LOCALES.map((code) => (
          <button
            key={code}
            type="button"
            role="tab"
            aria-selected={active === code}
            onClick={() => setActive(code)}
            className={`rounded px-3 py-1 text-sm ${
              active === code
                ? "bg-lightText text-white"
                : "bg-darkBg text-darkText"
            }`}
          >
            {LOCALE_META[code].label}
          </button>
        ))}
      </div>

      <div dir={LOCALE_META[active].dir} lang={active} className="grid gap-3">
        <div>
          <label className="mb-1 block font-semibold">{t.admin.name}</label>
          <input
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={values[active]?.title ?? ""}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold">{t.admin.description}</label>
          <textarea
            rows={3}
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={values[active]?.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500">{t.admin.translationsHint}</p>

      <input type="hidden" name="translationsJSON" value={JSON.stringify(values)} />
    </fieldset>
  );
}
