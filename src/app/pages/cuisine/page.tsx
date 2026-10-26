"use client";

import React from "react";
import StoryPage from "@/components/StoryPage";
import heroImage from "../../../../public/assets/images/allora-floor.jpg";
import image from "../../../../public/assets/images/Cucina.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function Cuisine() {
  const { locale } = useI18n();
  const c = PAGES[locale].stories.cuisine;

  return (
    <StoryPage
      title={c.title}
      lead={c.lead}
      sections={c.sections}
      heroImage={heroImage}
      image={image}
      cta={{ label: c.cta, href: "/menu" }}
    />
  );
}
