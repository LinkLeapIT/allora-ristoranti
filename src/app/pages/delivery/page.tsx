"use client";

import React from "react";
import Link from "next/link";
import StoryPage from "@/components/StoryPage";
import { Reveal } from "@/components/motion";
import heroImage from "../../../../public/assets/images/allora-floor.jpg";
import image from "../../../../public/assets/images/allora-delivery.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

const WHATSAPP = "https://wa.me/393497068208?text=Salve%20Allora!";

export default function Delivery() {
  const { locale } = useI18n();
  const c = PAGES[locale].stories.delivery;

  return (
    <StoryPage
      title={c.title}
      lead={c.lead}
      sections={c.sections}
      heroImage={heroImage}
      image={image}
      cta={{ label: c.cta, href: WHATSAPP, external: true }}
    >
      <Reveal>
        <Link
          href="/menu"
          className="inline-flex min-h-[44px] items-center font-medium text-lightText hover:underline"
        >
          {c.menu}
        </Link>
      </Reveal>
    </StoryPage>
  );
}
