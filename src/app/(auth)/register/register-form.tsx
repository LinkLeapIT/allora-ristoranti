"use client";

import { useMemo } from "react";
import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "./actions";
import { useRouter } from "next/navigation";
import useToast from "@/components/use-toast";
import { inputClass, primaryButtonClass } from "@/components/auth/AuthShell";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { locale } = useI18n();
  const a = PAGES[locale].auth;

  // Messages are built here so they follow the visitor's language.
  const schema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(3, { message: a.nameMin }),
          email: z.string().email({ message: a.emailInvalid }),
          password: z.string().min(6, { message: a.pwMin }),
          passwordConfirm: z.string().min(6, { message: a.pwMin }),
        })
        .refine((data) => data.password === data.passwordConfirm, {
          message: a.noMatch,
          path: ["passwordConfirm"],
        }),
    [a]
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    const response = await registerUser(data);

    if (!!response?.error) {
      toast({
        title: a.errorTitle,
        description: response.message,
        status: "error",
      });
      return;
    }

    toast({
      title: a.successTitle,
      description: a.accountCreated,
      status: "success",
    });

    router.push("/login");
  };

  const labelClass = "text-sm font-medium text-darkText";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{a.name}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{a.email}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" dir="ltr" autoComplete="email" className={inputClass} />
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
                <FormLabel className={labelClass}>{a.password}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    dir="ltr"
                    autoComplete="new-password"
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{a.confirm}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    dir="ltr"
                    autoComplete="new-password"
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={primaryButtonClass}>
            {a.register}
          </Button>
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
