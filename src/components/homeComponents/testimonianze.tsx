"use client";

import React from "react";
import { Quote } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";

// Guest reviews are shown exactly as written, in Italian, in every language.
const testimonials = [
  {
    name: "Teresa F",
    text: "Non avevo mai provato la cucina mediorientale. Per un brutto pregiudizio, infatti, pensavo fosse semplicemente cibo affogato nelle spezie e tutto uguale. In un ambiente così rilassante e con la cucina a pochi passi dal nostro posto mi sono resa conto di quanto mi sbagliassi. Ci sono tantissimi gusti da esplorare e tradizioni semplicemente uniche, che da sempre hanno unito i due versanti del Mediterraneo. Un posto consigliatissimo per chi vuol scoprire qualcosa di nuovo.",
  },
  {
    name: "Claudio G",
    text: "Sono venuto qua per la prima volta perché mi ci ha portato un collega che lavora per l'import-export con l'oriente. Ho scoperto un ambiente incredibilmente coinvolgente, dove i profumi e i sapori sono unici e inconfondibili e ho potuto gustare pietanze che fino ad ora avevo sempre ignorato, scoprendo quanto la cucina libanese e quella siriana possono essere al tempo stesso vicinissime e lontanissime dalla nostra. Un locale splendido, tutto da vivere, anche con belle serate di musica etnica dal vivo.",
  },
  {
    name: "Alessandro Verdi",
    text: "Veniamo qua spessissimo, perché è un posto che ci ha sempre coinvolto tanto. Bella gente, ottima cucina e tanta buona musica con ospiti molto interessanti sia tradizionali del Medio Oriente, live acustici e innovatori. Si trova sempre un posto, anche quando è pienissimo. Davvero un locale consigliato.",
  },
];

export default function TestimonianzePage() {
  const { locale } = useI18n();

  return (
    <section className="bg-white" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-contentContainer px-4 py-12 md:py-20 xl:px-0">
        <h2
          id="testimonials-heading"
          className="mb-8 text-center font-heading text-4xl font-semibold text-darkText md:mb-12 md:text-5xl"
        >
          {PAGES[locale].home.testimonialsTitle}
        </h2>

        {/* Swipeable row on phones, three columns from tablet up */}
        <ul className="-mx-4 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {testimonials.map((item) => (
            <li
              key={item.name}
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-darkBg p-6 md:w-[60%] lg:w-auto"
            >
              <Quote className="h-6 w-6 text-lightText/60" aria-hidden="true" />
              <blockquote lang="it" dir="ltr" className="mt-3 flex-1 text-base leading-relaxed text-darkText/80">
                {item.text}
              </blockquote>
              <p className="mt-4 font-heading text-xl font-semibold text-darkText" dir="ltr">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
