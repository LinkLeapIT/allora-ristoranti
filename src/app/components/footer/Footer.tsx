"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { Mail, MapPin, Phone } from "lucide-react";
import alloraLogo from "@/../public/assets/images/logo.png";
import { useI18n } from "@/i18n/I18nProvider";

const WHATSAPP = "https://wa.me/393497068208?text=Salve%20Allora!";
const EMAIL = "alloraristorante2021@gmail.com";
const PHONE_DISPLAY = "+39 349 706 8208";
const PHONE_TEL = "tel:+393497068208";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Salita+di+Santa+Maria+di+Castello+32r+16123+Genova";

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/share/1BjmDh3qXa/", Icon: BsFacebook },
  { label: "Instagram", href: "https://www.instagram.com/alloraris?igsh=OThjYXh5dnpoMTVp", Icon: BsInstagram },
  { label: "WhatsApp", href: WHATSAPP, Icon: BsWhatsapp },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 font-heading text-2xl font-semibold text-darkText">
      {children}
    </h2>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/pages/who-we-are", label: t.nav.about },
    { href: "/pages/services", label: t.nav.services },
    { href: "/pages/contact_us", label: t.nav.contact },
  ];

  const itemClass =
    "flex min-h-[44px] items-center gap-3 text-darkText/80 transition-colors hover:text-lightText md:min-h-0 md:py-1";

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-contentContainer gap-8 px-4 py-8 md:grid-cols-2 md:gap-10 md:py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr] xl:px-0">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-4 md:block">
            <Link href="/" className="inline-block shrink-0" aria-label="Allora Ristorante">
              <Image
                src={alloraLogo}
                alt="Allora Ristorante"
                width={176}
                height={80}
                className="h-auto w-16 md:w-24"
              />
            </Link>
            <p className="max-w-xs text-darkText/70 md:mt-4">{f.tagline}</p>
          </div>
          <div className="mt-4 flex items-center gap-3 md:mt-5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xl text-lightText transition-colors hover:bg-darkBg"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Visit us */}
        <div>
          <Heading>{f.visit}</Heading>
          <address className="not-italic">
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className={itemClass}>
              <MapPin className="h-5 w-5 shrink-0 text-lightText" aria-hidden="true" />
              <span>
                Salita di Santa Maria di Castello, 32r
                <br />
                16123 Genova GE, Italia
              </span>
            </a>
          </address>
          <p className="ms-8 mt-1 text-sm text-lightText">
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {f.openMaps}
            </a>
          </p>

          <h3 className="mb-2 mt-5 font-medium text-darkText">{f.hours}</h3>
          <dl className="space-y-1 text-darkText/80">
            <div className="flex flex-wrap justify-between gap-x-4">
              <dt>{f.openDays}</dt>
              <dd className="whitespace-nowrap font-medium text-lightText" dir="ltr">19:30 – 22:30</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-x-4">
              <dt>{f.closedDay}</dt>
              <dd className="font-medium text-darkText/50">{f.closed}</dd>
            </div>
          </dl>
        </div>

        {/* Contact */}
        <div>
          <Heading>{f.contact}</Heading>
          <ul>
            <li>
              <a href={PHONE_TEL} className={itemClass}>
                <Phone className="h-5 w-5 shrink-0 text-lightText" aria-hidden="true" />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={itemClass}>
                <Mail className="h-5 w-5 shrink-0 text-lightText" aria-hidden="true" />
                <span className="break-all">{EMAIL}</span>
              </a>
            </li>
          </ul>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-lightText px-5 text-sm font-medium text-white transition-colors hover:bg-lightText/90"
          >
            {f.book}
          </a>
        </div>

        {/* Links */}
        <nav aria-label={f.links}>
          <Heading>{f.links}</Heading>
          <ul className="flex flex-wrap gap-x-6 lg:flex-col lg:gap-x-0">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={itemClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-contentContainer flex-col items-center gap-1 px-4 py-5 text-center text-sm text-darkText/60 md:flex-row md:justify-between md:text-start xl:px-0">
          <p>
            &copy; {new Date().getFullYear()} Allora Ristorante · P.IVA 02732810995 · {f.rights}
          </p>
          <p>
            <a
              href="https://www.linkleap.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lightText"
            >
              {f.builtBy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
