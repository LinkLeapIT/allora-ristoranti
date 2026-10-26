"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/assets/images/logo.png";
import { Reveal } from "@/components/motion";

type AuthShellProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

// Centred card used by the login, register and forgot-password screens.
export default function AuthShell({ title, description, children, footer }: AuthShellProps) {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] items-start justify-center bg-darkBg px-4 py-10 md:items-center md:py-16">
      <Reveal className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
        <Link href="/" aria-label="Allora Ristorante" className="mx-auto mb-4 block w-14">
          <Image src={logo} alt="" width={56} height={50} className="h-auto w-14" />
        </Link>
        <h1 className="text-center font-heading text-3xl font-semibold text-darkText md:text-4xl">{title}</h1>
        {description && <p className="mt-2 text-center text-sm text-darkText/70">{description}</p>}
        <div className="mt-6">{children}</div>
        {footer && <p className="mt-6 text-center text-sm text-darkText/70">{footer}</p>}
      </Reveal>
    </div>
  );
}

export const inputClass =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-darkText shadow-none placeholder:text-darkText/40 focus-visible:border-lightText focus-visible:ring-2 focus-visible:ring-lightText/30 md:text-base";

export const primaryButtonClass =
  "h-12 w-full rounded-full bg-lightText text-base font-medium text-white shadow-none hover:bg-lightText/90";
