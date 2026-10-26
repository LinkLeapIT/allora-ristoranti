"use client";

import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { LOCALES, LOCALE_META } from "@/i18n/config";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="inline-flex overflow-hidden rounded-lg border border-lightText"
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
          className={`h-9 px-2.5 text-xs md:px-3 md:text-sm transition-colors ${
            locale === code
              ? "bg-lightText text-white"
              : "bg-transparent text-darkText hover:bg-lightText/10"
          }`}
        >
          {LOCALE_META[code].short}
        </button>
      ))}
    </div>
  );
}
