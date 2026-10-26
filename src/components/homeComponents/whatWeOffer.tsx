"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import allora_bbq from "../../../public/assets/images/allora-bbq.jpg";
import allora_appetizers from "../../../public/assets/images/allora-appetizers.jpg";
import allora_delivery from "../../../public/assets/images/allora-delivery.jpg";
import allora_live_music from "../../../public/assets/images/allora-live-music.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";
import { Reveal } from "@/components/motion";

const CARDS = [
  { key: "ristorante", href: "/pages/ristorante", image: allora_bbq },
  { key: "cuisine", href: "/pages/cuisine", image: allora_appetizers },
  { key: "delivery", href: "/pages/delivery", image: allora_delivery },
  { key: "evenings", href: "/pages/evenings", image: allora_live_music },
] as const;

export default function WhatWeOffer({ showTitle = true }: { showTitle?: boolean }) {
  const { locale } = useI18n();
  const c = PAGES[locale];

  return (
    <section className="bg-darkBg">
      <div className="mx-auto max-w-contentContainer px-4 py-12 md:py-20 xl:px-0">
        {showTitle && (
          <Reveal className="mb-8 md:mb-12">
            <h2 className="text-center font-heading text-4xl font-semibold text-darkText md:text-5xl">
              {c.home.offerTitle}
            </h2>
          </Reveal>
        )}

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ key, href, image }, index) => (
            <Reveal as="li" key={key} className="flex" delay={index * 0.1}>
              <Link
                href={href}
                className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-lightText/60 hover:shadow-lg"
              >
                <Image
                  src={image}
                  alt=""
                  sizes="(min-width: 960px) 25vw, (min-width: 667px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-2xl font-semibold leading-tight text-darkText">
                    {c.offer[key].title}
                  </h3>
                  <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-darkText/70 md:text-base">
                    {c.offer[key].text}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-lightText">
                    {c.home.learnMore}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
