'use client';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/context/auth';
import alloraLogo from '@/../public/assets/images/logo.png';
import { MdMenuBook } from 'react-icons/md';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import AuthButtons from '@/components/auth-button';
import { Loader2 } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { href: '/', label: 'Home' },
      { href: '/pages/who-we-are', label: 'Chi Siamo' },
      { href: '/pages/services', label: 'Servizi' },
      { href: '/pages/contact_us', label: 'Contatti' },
      {
        href: 'https://wa.me/393497068208?text=Salve%20Allora!',
        label: 'Chiama-Ora!',
      },
    ],
    []
  );

  return (
    <header className={`sticky inset-x-0 top-0 z-50 w-full bg-darkBg transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-[1400px] mx-auto">
        <nav
          className="flex items-center justify-between px-4 uppercase"
          aria-label="Global"
        >
          <motion.div 
            className="flex items-center flex-shrink-0"
            initial={{ opacity: 1, width: 'auto' }}
            animate={{ opacity: scrolled ? 0 : 1, width: scrolled ? 0 : 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src={alloraLogo}
                alt="Logo"
                width={96}
                height={85}
                className="w-[48px] md:w-[72px] xl:w-[96px]"
                style={{ height: 'auto' }}
                priority
              />
            </Link>
          </motion.div>

          <motion.div
            className="hidden lg:flex flex-grow justify-center lg:gap-x-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {navItems.map(({ href, label }) => {
              // 1) Decide if link is external. For example:
              const isExternal =
                href.startsWith('http') || href.startsWith('//');
              // 2) Render <a> for external, <Link> for internal
              if (isExternal) {
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank" // open in new tab
                    rel="noopener noreferrer" // security & performance
                    className="
                        tracking-widest 
                        leading-6 
                        text-text 
                        text-[12px] 
                        xl:text-[16px] 
                        font-extrabold 
                        hover:scale-110 
                        hover:text-lightText 
                        transition-transform 
                        bg-gradient-to-r 
                        from-darkText 
                        to-lightText 
                        bg-clip-text 
                        text-transparent
                    "
                  >
                    {label}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={href}
                    href={href}
                    className="
                      tracking-widest 
                      leading-6 
                      text-text 
                      text-[12px] 
                      xl:text-[16px] 
                      font-extrabold 
                      hover:scale-110 
                      hover:text-lightText 
                      transition-transform 
                      bg-gradient-to-r 
                      from-darkText 
                      to-lightText 
                      bg-clip-text 
                      text-transparent
                  "
                  >
                    {label}
                  </Link>
                );
              }
            })}
          </motion.div>

          <div className="flex flex-1 justify-end items-center gap-4">
            {/** Services start here */}
            <Link href="/menu">
              <MdMenuBook className="text-3xl text-lightText hover:text-hoverBg duration-300 hover:scale-110 transition-transform" />
            </Link>
            {/** Services End here */}

            <Suspense fallback={<Loader2 className="animate-spin" />}>
              <AuthButtons />
            </Suspense>
          </div>

          <button
            type="button"
            className="inline-flex items-center text-lightText hover:text-hoverBg duration-300 justify-center p-2 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className={`h-9 w-9 transition-transform ${
                mobileMenuOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M3 12h18m-18 6h18"
              />
            </svg>
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-gradient-to-tr from-darkBg via-lightBg to-darkBg p-6 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center justify-center">
                <button
                  className="self-end mb-4 text-2xl text-darkText hover:text-lightText"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ✖
                </button>
                {navItems.map(({ href, label }) => {
                  // 1) Decide if link is external. For example:
                  const isExternal =
                    href.startsWith('http') || href.startsWith('//');
                  // 2) Render <a> for external, <Link> for internal
                  if (isExternal) {
                    return (
                      <a
                        key={href}
                        onClick={() => setMobileMenuOpen(false)}
                        href={href}
                        target="_blank" // open in new tab
                        rel="noopener noreferrer" // security & performance
                        className="
                                        tracking-widest 
                                        leading-6  
                                        text-3xl 
                                        font-extrabold 
                                        hover:scale-110 
                                        hover:text-lightText 
                                        transition-transform 
                                        bg-gradient-to-r 
                                        from-darkText 
                                        to-lightText 
                                        bg-clip-text 
                                        text-transparent
                                        p-4
                                    "
                      >
                        {label}
                      </a>
                    );
                  } else {
                    return (
                      <Link
                        key={href}
                        onClick={() => setMobileMenuOpen(false)}
                        href={href}
                        className="
                                        tracking-widest 
                                        leading-6 
                                        text-3xl
                                        font-extrabold 
                                        hover:scale-110 
                                        hover:text-lightText 
                                        transition-transform 
                                        bg-gradient-to-r 
                                        from-darkText 
                                        to-lightText 
                                        bg-clip-text 
                                        text-transparent
                                        p-4
                                    "
                      >
                        {label}
                      </Link>
                    );
                  }
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
