import type { Metadata } from "next";
import "./css/globals.css";
import "./css/base.css";
import AppProviders from "./AppProviders";
import MainLayout from "./MainLayout";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading-spinner";
import { Cormorant_Garamond, Inter, Noto_Naskh_Arabic } from "next/font/google";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getLocale } from "@/i18n/server";
import { LOCALE_META } from "@/i18n/config";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading",
  display: "swap",
});
const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

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
        className={`${body.variable} ${heading.variable} ${arabic.variable} font-bodyFont w-full bg-lightBg text-darkText`}
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
