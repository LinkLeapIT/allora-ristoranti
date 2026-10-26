'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Loader2, Menu, X, MessageCircle } from 'lucide-react';
import alloraLogo from '@/../public/assets/images/logo.png';
import AuthButtons from '@/components/auth-button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/i18n/I18nProvider';

const WHATSAPP = 'https://wa.me/393497068208?text=Salve%20Allora!';

const Navbar = () => {
  const { t } = useI18n();
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // While the drawer is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/menu', label: t.nav.menu },
    { href: '/pages/who-we-are', label: t.nav.about },
    { href: '/pages/services', label: t.nav.services },
    { href: '/pages/contact_us', label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 w-full border-b border-line bg-darkBg/95 backdrop-blur transition-[padding] duration-300 ${
        scrolled ? 'py-1.5' : 'py-2 md:py-3'
      }`}
    >
      {open && (
        <button
          type="button"
          aria-label={t.nav.closeMenu}
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="absolute inset-x-0 top-full -z-10 h-screen bg-black/30 lg:hidden"
        />
      )}

      <nav
        className="mx-auto flex max-w-[1400px] items-center gap-3 px-4"
        aria-label="Global"
      >
        <Link href="/" className="shrink-0" aria-label="Allora Ristorante">
          <Image
            src={alloraLogo}
            alt=""
            width={96}
            height={85}
            className={`h-auto transition-all duration-300 ${
              scrolled ? 'w-9 md:w-11' : 'w-11 md:w-14'
            }`}
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-3">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors xl:text-base ${
                  isActive(href)
                    ? 'text-lightText'
                    : 'text-darkText hover:text-lightText'
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-lightText" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ms-auto flex items-center gap-2 md:gap-3 lg:ms-0">
          <LanguageSwitcher />
          <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin text-lightText" />}>
            <AuthButtons />
          </Suspense>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-lightText px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lightText/90 lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t.nav.callNow}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-darkText transition-colors hover:bg-white lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] overflow-y-auto border-b border-line bg-darkBg shadow-lg lg:hidden"
        >
          <ul className="mx-auto flex max-w-[1400px] flex-col px-4 py-2">
            {links.map(({ href, label }) => (
              <li key={href} className="border-b border-line last:border-0">
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`flex min-h-[52px] items-center font-heading text-2xl font-semibold ${
                    isActive(href) ? 'text-lightText' : 'text-darkText'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-[1400px] px-4 pb-5 pt-2">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lightText text-base font-medium text-white"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t.nav.callNow}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
