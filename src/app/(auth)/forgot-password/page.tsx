"use client";

import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "./forgot-password-form";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function ForgotPassword() {
  const { locale } = useI18n();
  const a = PAGES[locale].auth;

  return (
    <AuthShell
      title={a.forgotTitle}
      description={a.forgotDesc}
      footer={
        <Link href="/login" className="font-medium text-lightText underline">
          {a.loginTitle}
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
