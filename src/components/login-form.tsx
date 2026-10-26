"use client";

import { useMemo } from "react";
import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/context/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useToast from "./use-toast";
import { inputClass, primaryButtonClass } from "@/components/auth/AuthShell";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const auth = useAuth();
  const { locale } = useI18n();
  const a = PAGES[locale].auth;

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.string().email({ message: a.emailInvalid }),
        password: z.string().min(6, { message: a.pwMin }),
      }),
    [a]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await auth?.loginWithEmail(data.email, data.password);
      onSuccess?.();
    } catch (e: any) {
      toast({
        title: a.errorTitle,
        description: e.code === "auth/invalid-credential" ? a.badCredentials : a.generic,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    placeholder={a.email}
                    aria-label={a.email}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    dir="ltr"
                    autoComplete="current-password"
                    placeholder={a.password}
                    aria-label={a.password}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={primaryButtonClass}>
            {a.login}
          </Button>
          <p className="text-center text-sm text-darkText/70">
            {a.forgot}{" "}
            <Link href="/forgot-password" className="font-medium text-lightText underline">
              {a.resetHere}
            </Link>
          </p>
          <div className="flex items-center gap-3 text-sm text-darkText/50" aria-hidden="true">
            <span className="h-px flex-1 bg-line" />
            {a.or}
            <span className="h-px flex-1 bg-line" />
          </div>
        </fieldset>
      </form>
      <ContinueWithGoogleButton />
    </Form>
  );
}
