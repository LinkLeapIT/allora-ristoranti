import type { Metadata } from "next";
import "./css/globals.css";
import AppProviders from "./AppProviders";
import MainLayout from "./MainLayout";

export const metadata: Metadata = {
  title:{ 
    template: "Allora menu",
    default: "Allora menu",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-bodyFont w-full bg-lightBg text-darkText">
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
      </body>
    </html>
  );
}
