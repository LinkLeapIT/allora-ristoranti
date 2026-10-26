"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import PageHero from "@/components/PageHero";
import { GoldRule, Reveal } from "@/components/motion";

export type StorySection = { heading?: string; text: string };

type StoryPageProps = {
  title: string;
  heroImage: StaticImageData;
  image: StaticImageData;
  lead?: string;
  sections: StorySection[];
  cta?: { label: string; href: string; external?: boolean };
  children?: React.ReactNode;
};

// Shared layout for the long-form pages: hero, a lead sentence, a photo
// beside the text, and an optional call to action.
export default function StoryPage({ title, heroImage, image, lead, sections, cta, children }: StoryPageProps) {
  return (
    <div className="bg-darkBg">
      <PageHero title={title} image={heroImage} />

      {lead && (
        <section className="mx-auto max-w-3xl px-4 py-12 text-center md:py-20">
          <Reveal>
            <GoldRule className="mx-auto mb-6" />
            <p className="font-heading text-2xl font-medium leading-snug text-darkText md:text-4xl">{lead}</p>
          </Reveal>
        </section>
      )}

      <div className="mx-auto grid max-w-contentContainer items-start gap-8 px-4 pb-12 md:grid-cols-2 md:gap-12 md:pb-20 xl:px-0">
        <Reveal className="md:sticky md:top-28">
          <Image
            src={image}
            alt=""
            sizes="(min-width: 960px) 600px, 100vw"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </Reveal>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <Reveal key={i} delay={0.05 * i}>
              {section.heading && (
                <h2 className="mb-2 font-heading text-3xl font-semibold text-darkText md:text-4xl">
                  {section.heading}
                </h2>
              )}
              <p className="text-base leading-relaxed text-darkText/80 md:text-lg">{section.text}</p>
            </Reveal>
          ))}

          {children}

          {cta && (
            <Reveal>
              {cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-lightText px-8 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-lightText/90 hover:shadow-md"
                >
                  {cta.label}
                </a>
              ) : (
                <Link
                  href={cta.href}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-lightText px-8 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-lightText/90 hover:shadow-md"
                >
                  {cta.label}
                </Link>
              )}
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
