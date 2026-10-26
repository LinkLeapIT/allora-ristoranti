"use client";

import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "./register-form";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function Register() {
  const { locale } = useI18n();
  const a = PAGES[locale].auth;

  return (
    <AuthShell
      title={a.registerTitle}
      footer={
        <>
          {a.haveAccount}{" "}
          <Link href="/login" className="font-medium text-lightText underline">
            {a.loginTitle}
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
