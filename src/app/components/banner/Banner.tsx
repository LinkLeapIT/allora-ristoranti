"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BannerData } from "./BannerData";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";
import { AnimatedTitle, Reveal } from "@/components/motion";

const ROTATE_MS = 6000;

// Home hero: photos cross-fade behind the brand name, tagline and two actions.
const Banner: React.FC = () => {
  const { t, locale } = useI18n();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % BannerData.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[72svh] items-center justify-center overflow-hidden md:min-h-[85vh]">
      {BannerData.map((slide, index) => (
        <Image
          key={index}
          src={slide.image}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className={`-z-20 object-cover motion-safe:animate-kenburns transition-opacity duration-1000 motion-reduce:transition-none ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden="true" />

      <div className="px-4 py-16 text-center text-white">
        <AnimatedTitle
          text="Allora Ristorante"
          className="font-heading text-6xl font-semibold leading-none md:text-8xl lg:text-9xl"
        />
        <Reveal delay={0.6} y={12}>
          <p className="mt-4 text-xl text-white/90 md:text-3xl">{t.menu.subtitle}</p>
        </Reveal>

        <Reveal delay={0.85} y={12} className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/menu"
            className="inline-flex h-12 items-center justify-center rounded-full bg-lightText px-8 text-base font-medium text-white transition-colors hover:bg-lightText/90"
          >
            {t.nav.menu}
          </Link>
          <Link
            href="#about-us"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/70 px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            {PAGES[locale].home.learnMore}
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Banner;
