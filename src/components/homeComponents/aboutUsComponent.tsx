"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import allora_window from "../../../public/assets/images/allora-window.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

const AboutUsComponent = () => {
  const { locale } = useI18n();
  const c = PAGES[locale].home;

  return (
    <section id="about-us" className="scroll-mt-20 bg-white">
      <div className="mx-auto grid max-w-contentContainer items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-12 md:py-20 xl:px-0">
        <div className="md:order-last">
          <Image
            src={allora_window}
            alt=""
            sizes="(min-width: 960px) 600px, 100vw"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-lightText rtl:tracking-normal">
            {c.aboutKicker}
          </p>
          <h2 className="mt-1 font-heading text-4xl font-semibold text-darkText md:text-5xl">
            {c.aboutTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-darkText/80 md:text-lg">{c.aboutText}</p>
          <Link
            href="/pages/who-we-are"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-medium text-lightText hover:underline"
          >
            {c.learnMore}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutUsComponent);
