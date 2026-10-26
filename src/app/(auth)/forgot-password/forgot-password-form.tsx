"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { inputClass, primaryButtonClass } from "@/components/auth/AuthShell";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { locale } = useI18n();
  const a = PAGES[locale].auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: a.errorTitle,
        description: a.emailInvalid,
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast({
        title: a.sentTitle,
        description: a.sent.replace("{email}", email),
        variant: "success",
      });
      setEmail("");
    } catch (error: any) {
      console.error("Password Reset Error:", error.message);
      toast({
        title: a.errorTitle,
        description: a.generic,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="email"
        dir="ltr"
        value={email}
        placeholder={a.email}
        aria-label={a.email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
        className={inputClass}
      />
      <Button className={primaryButtonClass} type="submit" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : a.reset}
      </Button>
    </form>
  );
}
