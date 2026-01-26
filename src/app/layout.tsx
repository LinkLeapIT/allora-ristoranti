import type { Metadata } from "next";
import "./css/globals.css";
import "./css/base.css";
import AppProviders from "./AppProviders";
import MainLayout from "./MainLayout";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading-spinner";
import { Domine } from 'next/font/google'

const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title:{ 
    template: "Allora menu",
    default: "Allora menu",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${domine.className} w-full bg-lightBg text-darkText`} suppressHydrationWarning>
        <AppProviders>
          <Suspense fallback={<div><LoadingSpinner /></div>}>
            <MainLayout>
              {children}
            </MainLayout>
          </Suspense>
        </AppProviders>
      </body>
    </html>
  );
}
