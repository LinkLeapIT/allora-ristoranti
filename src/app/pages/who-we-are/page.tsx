"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import heroImage from "../../../../public/assets/images/allora-floor.jpg";
import bandImage from "../../../../public/assets/images/allora-wall.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function WhoWeAre() {
  const { locale, t } = useI18n();
  const c = PAGES[locale].about;

  return (
    <div className="bg-darkBg">
      <PageHero title={c.title} image={heroImage} />

      <section className="mx-auto max-w-3xl px-4 py-12 text-center md:py-20">
        <p className="font-heading text-2xl font-medium leading-snug text-darkText md:text-4xl">
          {c.intro}
        </p>
      </section>

      <div className="mx-auto max-w-contentContainer px-4 xl:px-0">
        <Image
          src={bandImage}
          alt=""
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="aspect-[16/9] w-full rounded-2xl object-cover md:aspect-[21/9]"
        />
      </div>

      <section className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-center md:py-16">
        <p className="text-lg font-medium leading-relaxed text-darkText md:text-2xl">{c.lead}</p>
        <p className="text-base leading-relaxed text-darkText/80 md:text-xl">{c.body}</p>
      </section>

      <section className="mx-auto grid max-w-contentContainer gap-8 px-4 pb-12 md:grid-cols-2 md:gap-12 md:pb-20 xl:px-0">
        <p className="text-base leading-relaxed text-darkText/80 md:text-lg">{c.story1}</p>
        <p className="text-base leading-relaxed text-darkText/80 md:text-lg">{c.story2}</p>
      </section>

      <section className="border-t border-line bg-white px-4 py-12 text-center">
        <Link
          href="/menu"
          className="inline-flex h-12 items-center justify-center rounded-full bg-lightText px-8 text-base font-medium text-white transition-colors hover:bg-lightText/90"
        >
          {c.cta}
        </Link>
        <p className="mt-3 text-sm text-darkText/60">{t.menu.subtitle}</p>
      </section>
    </div>
  );
}
