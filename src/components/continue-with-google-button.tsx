"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/app/context/auth";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function ContinueWithGoogleButton() {
  const auth = useAuth();
  const router = useRouter();
  const { locale } = useI18n();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={async () => {
        try {
          await auth?.loginWithGoogle();
          router.refresh();
        } catch (e) {}
      }}
      className="h-12 w-full rounded-full border-line bg-white text-base font-medium text-darkText hover:bg-darkBg"
    >
      {PAGES[locale].auth.google}
    </Button>
  );
}
