"use client";

import React from "react";
import PageHero from "@/components/PageHero";
import WhatWeOffer from "@/components/homeComponents/whatWeOffer";
import heroImage from "../../../../public/assets/images/allora-bbq.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

export default function Services() {
  const { locale } = useI18n();
  const c = PAGES[locale].services;

  return (
    <div>
      <PageHero title={c.title} subtitle={c.intro} image={heroImage} />
      <WhatWeOffer showTitle={false} />
    </div>
  );
}
