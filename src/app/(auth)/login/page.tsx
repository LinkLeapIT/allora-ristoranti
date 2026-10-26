"use client";

import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "./login-form";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function Login() {
  const { locale } = useI18n();
  const a = PAGES[locale].auth;

  return (
    <AuthShell
      title={a.loginTitle}
      footer={
        <>
          {a.noAccount}{" "}
          <Link href="/register" className="font-medium text-lightText underline">
            {a.registerTitle}
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
