"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import logo from "../../../public/assets/images/alloraLogo.png"
import Image from "next/image";
// Variants for page transitions.
const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const pageTransition = { type: "spring", stiffness: 100, damping: 20 };

export default function BookingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Define navigation items.
  const navItems = [
    { href: "/booking", label: "Home" },
    { href: "/booking/available-shifts", label: "Shifts" },
    { href: "/booking/reservation-details", label: "Reservation" },
  ];

  return (
    <div className="min-h-screen bg-darkBg font-sans">
      <header className="p-4 bg-darkText text-darkBg mb-4 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold"
        >
          Restaurant Booking
        </motion.h1>
        <nav className="mt-4 w-full relative">
          <motion.ul
            className="flex justify-center gap-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {navItems.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className="cursor-pointer block relative px-2 py-1"
                >
                  <span
                    className={`${
                      pathname === item.href ? "text-link" : "text-darkBg"
                    }`}
                  >
                    {item.label}
                  </span>
                  {/* Render the animated underline if this item is active */}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-1 bg-link rounded"
                    />
                  )}
                </Link>
              </li>
            ))}
          </motion.ul>
        </nav>
      </header>

      {/* Animated page transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="min-h-[80vh] p-4"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="p-4 bg-darkText text-darkBg flex flex-col items-center">
        <Image src={logo} alt="logo" width="300" height="300" priority />
      </footer>
    </div>
  );
}
