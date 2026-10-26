import Image, { type StaticImageData } from "next/image";
import React from "react";
import { AnimatedTitle } from "@/components/motion";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image: StaticImageData;
  priority?: boolean;
  children?: React.ReactNode;
};

// Compact photo header used at the top of the content pages.
export default function PageHero({ title, subtitle, image, priority = true, children }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[38svh] items-center justify-center overflow-hidden md:min-h-[50vh]">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className="-z-20 object-cover motion-safe:animate-kenburns"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden="true" />
      <div className="px-4 py-12 text-center text-white">
        <AnimatedTitle text={title} className="font-heading text-5xl font-semibold leading-tight md:text-7xl" />
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/85 md:text-2xl">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
