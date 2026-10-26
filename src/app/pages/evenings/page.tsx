"use client";

import React from "react";
import StoryPage from "@/components/StoryPage";
import heroImage from "../../../../public/assets/images/allora-floor.jpg";
import image from "../../../../public/assets/images/allora-live-music.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

const WHATSAPP = "https://wa.me/393497068208?text=Salve%20Allora!";

export default function Evenings() {
  const { locale } = useI18n();
  const c = PAGES[locale].stories.evenings;

  return (
    <StoryPage
      title={c.title}
      lead={c.lead}
      sections={c.sections}
      heroImage={heroImage}
      image={image}
      cta={{ label: c.cta, href: WHATSAPP, external: true }}
    />
  );
}
