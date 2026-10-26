import type { Metadata } from "next";
import "./css/globals.css";
import "./css/base.css";
import AppProviders from "./AppProviders";
import MainLayout from "./MainLayout";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading-spinner";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/noto-naskh-arabic/arabic-400.css";
import "@fontsource/noto-naskh-arabic/arabic-500.css";
import "@fontsource/noto-naskh-arabic/arabic-600.css";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getLocale } from "@/i18n/server";
import { LOCALE_META } from "@/i18n/config";

export const metadata: Metadata = {
  title:{
    template: "Allora menu",
    default: "Allora menu",
  }
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={LOCALE_META[locale].dir} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className="font-bodyFont w-full bg-lightBg text-darkText"
        suppressHydrationWarning
      >
        <I18nProvider locale={locale}>
          <AppProviders>
            <Suspense fallback={<div><LoadingSpinner /></div>}>
              <MainLayout>
                {children}
              </MainLayout>
            </Suspense>
          </AppProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
