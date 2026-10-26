"use client";

import React, { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import heroImage from "../../../../public/assets/images/allora-wood.jpg";
import { useI18n } from "@/i18n/I18nProvider";
import { PAGES } from "@/i18n/pages";
import { Reveal } from "@/components/motion";

const EMAIL = "alloraristorante2021@gmail.com";
const PHONE_DISPLAY = "+39 349 706 8208";
const PHONE_TEL = "tel:+393497068208";
const WHATSAPP = "https://wa.me/393497068208?text=Salve%20Allora!";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Salita+di+Santa+Maria+di+Castello%2C+32r%2C+16123+Genova+GE%2C+Italia";

const fieldClass =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-darkText placeholder:text-darkText/40 focus:border-lightText focus:outline-none focus:ring-2 focus:ring-lightText/30";

export default function ContactUs() {
  const { locale } = useI18n();
  const c = PAGES[locale].contact;
  const [form, setForm] = useState({ name: "", surname: "", email: "", message: "" });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // There is no mail server behind this site, so the form hands the message
  // to the visitor's own email app, addressed to the restaurant.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n${form.name} ${form.surname}\n${form.email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `${c.subject} – ${form.name} ${form.surname}`.trim()
    )}&body=${encodeURIComponent(body)}`;
  };

  const cardClass = "rounded-2xl border border-line bg-white p-5";
  const iconClass = "mb-3 h-6 w-6 text-lightText";
  const headingClass = "font-heading text-2xl font-semibold text-darkText";

  return (
    <div className="bg-darkBg">
      <PageHero title={c.title} image={heroImage} />

      <div className="mx-auto max-w-contentContainer px-4 py-10 md:py-16 xl:px-0">
        {/* Quick contact */}
        <ul className="grid gap-4 md:grid-cols-3">
          <Reveal as="li" className={cardClass}>
            <Phone className={iconClass} aria-hidden="true" />
            <h2 className={headingClass}>{c.phone}</h2>
            <a href={PHONE_TEL} dir="ltr" className="mt-1 block min-h-[44px] pt-2 text-lg text-darkText hover:text-lightText">
              {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-lightText hover:underline">
              WhatsApp
            </a>
          </Reveal>
          <Reveal as="li" delay={0.1} className={cardClass}>
            <Mail className={iconClass} aria-hidden="true" />
            <h2 className={headingClass}>{c.email}</h2>
            <a href={`mailto:${EMAIL}`} className="mt-1 block min-h-[44px] break-all pt-2 text-lg text-darkText hover:text-lightText">
              {EMAIL}
            </a>
          </Reveal>
          <Reveal as="li" delay={0.2} className={cardClass}>
            <MapPin className={iconClass} aria-hidden="true" />
            <h2 className={headingClass}>{c.address}</h2>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-1 block pt-2 text-lg text-darkText hover:text-lightText">
              Salita di Santa Maria di Castello, 32r
              <br />
              16123 Genova GE, Italia
            </a>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-medium text-lightText hover:underline">
              {c.openMaps}
            </a>
          </Reveal>
        </ul>

        {/* Hours + form */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_2fr]">
          <section className={cardClass} aria-labelledby="hours-heading">
            <Clock className={iconClass} aria-hidden="true" />
            <h2 id="hours-heading" className={headingClass}>
              {c.hours}
            </h2>
            <dl className="mt-4 space-y-3 text-lg">
              <div className="flex flex-wrap justify-between gap-x-4">
                <dt className="text-darkText/80">{c.tueSun}</dt>
                <dd className="whitespace-nowrap font-medium text-lightText" dir="ltr">
                  19:30 – 22:30
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4">
                <dt className="text-darkText/80">{c.mon}</dt>
                <dd className="font-medium text-darkText/50">{c.closed}</dd>
              </div>
            </dl>
          </section>

          <section className={cardClass} aria-labelledby="form-heading">
            <h2 id="form-heading" className={`${headingClass} mb-4`}>
              {c.formTitle}
            </h2>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-darkText">
                    {c.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder={c.namePh}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="surname" className="mb-1 block text-sm font-medium text-darkText">
                    {c.surname}
                  </label>
                  <input
                    id="surname"
                    name="surname"
                    type="text"
                    autoComplete="family-name"
                    value={form.surname}
                    onChange={update("surname")}
                    placeholder={c.surnamePh}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-darkText">
                  {c.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  dir="ltr"
                  value={form.email}
                  onChange={update("email")}
                  placeholder={c.emailPh}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-darkText">
                  {c.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={update("message")}
                  placeholder={c.messagePh}
                  className="w-full rounded-xl border border-line bg-white p-4 text-base text-darkText placeholder:text-darkText/40 focus:border-lightText focus:outline-none focus:ring-2 focus:ring-lightText/30"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-darkText/70">
                <input type="checkbox" name="terms" required className="mt-1 h-5 w-5 shrink-0 accent-lightText" />
                <span>{c.terms}</span>
              </label>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-lightText px-8 text-base font-medium text-white transition-colors hover:bg-lightText/90 focus:outline-none focus:ring-2 focus:ring-lightText focus:ring-offset-2"
                >
                  {c.send}
                </button>
                <p className="text-sm text-darkText/60">{c.mailHint}</p>
              </div>
            </form>
          </section>
        </div>

        {/* Map */}
        <section className="mt-8" aria-labelledby="map-heading">
          <h2 id="map-heading" className={`${headingClass} mb-4`}>
            {c.mapTitle}
          </h2>
          <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-line md:h-96">
            <iframe
              title="Allora Ristorante"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d558.7076052364364!2d8.931967621537141!3d44.40725958375206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d343dce1c02a49%3A0x4fbabdf478d8ce9!2sSalita%20di%20S.%20Maria%20di%20Castello%2C%2032r%2C%2016123%20Genova%20GE%2C%20Italia!5e0!3m2!1sit!2sus!4v1694035826325!5m2!1sit!2sus"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
